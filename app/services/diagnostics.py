from __future__ import annotations

import importlib.util
import os
import tempfile
from collections import Counter
from pathlib import Path
from typing import Any, Dict, Iterable, List

from app.config import get_settings
from app.registry import TEMPLATES
from app.services.validator import preview_strategy
from app.services.ai_paper import build_provider_request, provider_catalog

settings = get_settings()


def _check(checks: List[Dict[str, Any]], key: str, ok: bool, detail: str, *, level: str = "error") -> None:
    checks.append({"key": key, "ok": bool(ok), "level": "ok" if ok else level, "detail": detail})


def _write_test(directory: Path) -> tuple[bool, str]:
    try:
        directory.mkdir(parents=True, exist_ok=True)
        fd, name = tempfile.mkstemp(prefix=".strategybuilder-health-", dir=str(directory))
        os.close(fd)
        Path(name).unlink(missing_ok=True)
        return True, f"Writable: {directory}"
    except Exception as exc:
        return False, f"Not writable: {directory} ({type(exc).__name__})"


def _template_paths() -> tuple[Path, Path]:
    app_dir = Path(__file__).resolve().parents[1]
    return app_dir / "templates" / "strategies", app_dir / "static" / "strategy_icons"


def run_system_diagnostics(*, deep: bool = False) -> Dict[str, Any]:
    checks: List[Dict[str, Any]] = []
    strategy_dir, icon_dir = _template_paths()

    writable, writable_detail = _write_test(settings.default_output_dir)
    _check(checks, "output_writable", writable, writable_detail)
    _check(checks, "strategy_template_directory", strategy_dir.is_dir(), f"Strategy template directory: {strategy_dir}")
    _check(checks, "static_icon_directory", icon_dir.is_dir(), f"Strategy icon directory: {icon_dir}", level="warning")
    _check(checks, "multipart_runtime", importlib.util.find_spec("multipart") is not None, "Multipart upload runtime is available.")
    _check(checks, "pdf_runtime", importlib.util.find_spec("pypdf") is not None, "PDF text extraction runtime is available.")
    providers = provider_catalog()
    provider_ids = {item.get("id") for item in providers}
    expected_provider_ids = {"openai", "deepseek", "kimi", "anthropic", "gemini", "openrouter", "custom"}
    _check(
        checks,
        "ai_provider_catalog",
        provider_ids == expected_provider_ids,
        f"AI Paper Lab providers: {', '.join(sorted(str(item) for item in provider_ids))}",
    )

    missing_templates: List[str] = []
    missing_icons: List[str] = []
    for key, template in TEMPLATES.items():
        if not (strategy_dir / template.template_file).is_file():
            missing_templates.append(key)
        if not (icon_dir / f"{key}.svg").is_file():
            missing_icons.append(key)
    _check(checks, "registry_template_files", not missing_templates, f"Missing strategy template files: {', '.join(missing_templates) if missing_templates else 'none'}")
    _check(checks, "registry_icons", not missing_icons, f"Missing optional icons: {', '.join(missing_icons) if missing_icons else 'none'}", level="warning")

    render_failures: List[Dict[str, str]] = []
    if deep:
        with tempfile.TemporaryDirectory(prefix=".strategybuilder-audit-", dir=str(settings.default_output_dir)) as temp_dir:
            for key, template in TEMPLATES.items():
                values = {field.name: field.default for field in template.fields}
                if "strategy_name" in values:
                    values["strategy_name"] = "Audit" + "".join(part.title() for part in key.split("_"))[:52]
                try:
                    validated, code, _ = preview_strategy(key, values, output_dir=temp_dir)
                    compile(code, validated.filename, "exec")
                except Exception as exc:
                    render_failures.append({"template_key": key, "error": f"{type(exc).__name__}: {exc}"})
        _check(checks, "all_templates_render_and_compile", not render_failures, f"Rendered and compiled {len(TEMPLATES) - len(render_failures)}/{len(TEMPLATES)} templates.")
        adapter_errors: List[str] = []
        for provider_id in ("openai", "deepseek", "kimi", "anthropic", "gemini", "openrouter"):
            try:
                endpoint, headers, payload, protocol, normalized, model = build_provider_request(
                    provider=provider_id,
                    api_key="diagnostic-placeholder",
                    model="",
                    base_url=None,
                    compact_text="strategy signal risk return " * 30,
                    max_output_tokens=500,
                    temperature=0.2,
                )
                if not endpoint.startswith("https://") or normalized != provider_id or not protocol or not model:
                    raise ValueError("incomplete provider request")
                if "diagnostic-placeholder" in str(payload):
                    raise ValueError("API key appeared in request payload")
            except Exception as exc:
                adapter_errors.append(f"{provider_id}: {type(exc).__name__}: {exc}")
        _check(
            checks,
            "ai_provider_request_builders",
            not adapter_errors,
            "All six fixed provider request builders passed." if not adapter_errors else "; ".join(adapter_errors),
        )

    mode_counts = Counter(str(template.strategy_mode or "unknown") for template in TEMPLATES.values())
    literature_count = sum(1 for template in TEMPLATES.values() if template.strategy_mode == "literature")
    required_failures = [item for item in checks if not item["ok"] and item["level"] == "error"]
    warnings = [item for item in checks if not item["ok"] and item["level"] == "warning"]
    return {
        "ok": not required_failures,
        "deep": deep,
        "app_version": settings.app_version,
        "template_count": len(TEMPLATES),
        "literature_template_count": literature_count,
        "strategy_mode_counts": dict(sorted(mode_counts.items())),
        "output_dir": str(settings.default_output_dir),
        "checks": checks,
        "required_failure_count": len(required_failures),
        "warning_count": len(warnings),
        "render_failures": render_failures,
        "scope_note": "This is an application self-check. It does not run Freqtrade backtests, contact exchanges, or validate external API credentials.",
    }
