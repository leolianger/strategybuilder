from __future__ import annotations

import datetime
import io
import json
import os
import re
import tempfile
import threading
import zipfile
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from app.config import get_settings
from app.models import StrategyFileInfo, VersionInfo
from app.registry import TEMPLATES


settings = get_settings()
VERSION_RE = re.compile(r"^(?P<base>.+?)_v(?P<version>\d+)$")
STRATEGY_FILENAME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_]{0,127}\.py$")
_WRITE_LOCK = threading.RLock()
MAX_STRATEGY_SOURCE_BYTES = 2_000_000
MAX_METADATA_BYTES = 2_000_000
MAX_COLLECTION_SOURCE_BYTES = 25_000_000


def _read_text_limited(path: Path, *, max_bytes: int, label: str) -> str:
    """Read a UTF-8 text file without allowing unbounded app-data inputs."""
    with path.open("rb") as handle:
        raw = handle.read(max_bytes + 1)
    if len(raw) > max_bytes:
        raise ValueError(f"{label} exceeds the {max_bytes // 1_000_000} MB safety limit.")
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise ValueError(f"{label} is not valid UTF-8 text.") from exc


def validate_strategy_filename(filename: str) -> str:
    """Validate a user-controlled strategy filename and reject path traversal."""
    name = str(filename or "").strip()
    if not STRATEGY_FILENAME_RE.fullmatch(name):
        raise ValueError("Invalid strategy filename. Use letters, numbers, underscores, and a .py suffix.")
    if Path(name).name != name or "/" in name or "\\" in name:
        raise ValueError("Strategy filename must not contain a path.")
    return name


def _strategy_path(filename: str, output_dir: str, *, must_exist: bool = False) -> Path:
    name = validate_strategy_filename(filename)
    root = Path(output_dir).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    candidate = root / name
    # Existing symlinks are never followed because they could escape the allowed output root.
    if candidate.is_symlink():
        raise ValueError("Symbolic-link strategy files are not supported.")
    resolved = candidate.resolve(strict=False)
    try:
        resolved.relative_to(root)
    except ValueError as exc:
        raise ValueError("Strategy path is outside the selected output directory.") from exc
    if must_exist and not resolved.is_file():
        raise FileNotFoundError(name)
    return resolved


def _atomic_write_text(path: Path, content: str, *, overwrite: bool = True) -> None:
    """Write UTF-8 text durably without exposing a partially written file.

    For no-overwrite writes, the final hard-link creation is atomic and fails
    if another request created the same filename concurrently.
    """
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        if overwrite:
            os.replace(temporary, path)
        else:
            try:
                os.link(temporary, path)
            except FileExistsError as exc:
                raise FileExistsError(f"Strategy file already exists: {path.name}") from exc
            os.unlink(temporary)
    finally:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass


def metadata_dir(output_dir: str) -> Path:
    root = Path(output_dir).expanduser().resolve()
    p = root / settings.metadata_dir_name
    if p.is_symlink():
        raise ValueError("Symbolic-link metadata directories are not supported.")
    p.mkdir(parents=True, exist_ok=True)
    resolved = p.resolve()
    try:
        resolved.relative_to(root)
    except ValueError as exc:
        raise ValueError("Metadata directory is outside the selected output directory.") from exc
    return resolved


def sidecar_path(filename: str, output_dir: str) -> Path:
    name = validate_strategy_filename(filename)
    root = metadata_dir(output_dir)
    path = root / f"{name}.meta.json"
    if path.is_symlink():
        raise ValueError("Symbolic-link metadata files are not supported.")
    return path


def parse_base_and_version(class_name: str) -> Tuple[str, int]:
    m = VERSION_RE.match(class_name)
    if m:
        return m.group("base"), int(m.group("version"))
    return class_name, 1


def next_version(base_name: str, output_dir: str) -> int:
    out = Path(output_dir).resolve()
    max_v = 0
    for py in out.glob("*.py"):
        if py.is_symlink() or not py.is_file():
            continue
        cls = py.stem
        base, v = parse_base_and_version(cls)
        if base == base_name:
            max_v = max(max_v, v)
    return max_v + 1 if max_v > 0 else 2


def write_strategy(
    filename: str,
    content: str,
    *,
    output_dir: str,
    overwrite: bool = False,
    metadata: Optional[Dict[str, Any]] = None,
) -> Tuple[Path, Optional[Path]]:
    """Persist a strategy and its sidecar under one process-level write lock.

    Kubernetes is configured with one application replica, so this lock also
    prevents two concurrent requests in the FastAPI process from interleaving
    strategy and metadata writes. No-overwrite writes remain filesystem-atomic.
    """
    with _WRITE_LOCK:
        path = _strategy_path(filename, output_dir)
        meta_path = sidecar_path(filename, output_dir) if metadata is not None else None
        # Preflight both members of the logical pair before creating either one.
        # This prevents a pre-existing sidecar from being mistaken for a file
        # created by the current request during rollback.
        if not overwrite:
            conflicts = [target.name for target in (path, meta_path) if target is not None and target.exists()]
            if conflicts:
                raise FileExistsError(
                    "Strategy or metadata file already exists: " + ", ".join(conflicts)
                )
        old_code = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Existing strategy") if path.exists() else None
        _atomic_write_text(path, content, overwrite=overwrite)
        try:
            if meta_path is not None:
                _atomic_write_text(
                    meta_path,
                    json.dumps(metadata, ensure_ascii=False, indent=2),
                    overwrite=overwrite,
                )
        except Exception:
            # The metadata helper either commits atomically or leaves its prior
            # target untouched. Roll back only the code member we committed;
            # never unlink a sidecar that may belong to another writer.
            try:
                if old_code is None:
                    path.unlink(missing_ok=True)
                else:
                    _atomic_write_text(path, old_code, overwrite=True)
            except Exception as rollback_exc:
                raise RuntimeError(
                    f"Strategy metadata write failed and code rollback was incomplete: {rollback_exc}"
                ) from rollback_exc
            raise
        return path, meta_path


def write_strategy_batch(
    entries: List[Tuple[str, str, Dict[str, Any]]],
    *,
    output_dir: str,
    overwrite: bool = False,
) -> List[Tuple[Path, Path]]:
    """Commit a batch of code/metadata pairs as one in-process transaction.

    The deployment uses one replica, so the process lock serializes all normal
    Strategy Builder writes. Filesystem-atomic writes still protect against an
    unexpected external writer. Any failure rolls every touched target back to
    its state before the batch began.
    """
    if not entries:
        return []
    with _WRITE_LOCK:
        targets: List[Tuple[Path, Path, str, Dict[str, Any]]] = []
        for filename, content, metadata in entries:
            path = _strategy_path(filename, output_dir)
            meta_path = sidecar_path(filename, output_dir)
            targets.append((path, meta_path, content, metadata))
        if not overwrite:
            conflicts = [path.name for path, meta_path, _, _ in targets if path.exists() or meta_path.exists()]
            if conflicts:
                shown = ", ".join(conflicts[:8])
                suffix = " ..." if len(conflicts) > 8 else ""
                raise FileExistsError(f"Batch contains existing strategy or metadata file(s): {shown}{suffix}")

        backups: Dict[Path, Optional[str]] = {}
        for path, meta_path, _, _ in targets:
            backups[path] = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Existing strategy") if path.exists() else None
            backups[meta_path] = _read_text_limited(meta_path, max_bytes=MAX_METADATA_BYTES, label="Existing metadata") if meta_path.exists() else None

        committed: List[Tuple[Path, Path]] = []
        try:
            for path, meta_path, content, metadata in targets:
                _atomic_write_text(path, content, overwrite=overwrite)
                _atomic_write_text(
                    meta_path, json.dumps(metadata, ensure_ascii=False, indent=2),
                    overwrite=overwrite,
                )
                committed.append((path, meta_path))
        except Exception:
            rollback_errors: List[str] = []
            for target, previous in backups.items():
                try:
                    if previous is None:
                        target.unlink(missing_ok=True)
                    else:
                        _atomic_write_text(target, previous, overwrite=True)
                except Exception as rollback_exc:
                    rollback_errors.append(f"{target.name}: {rollback_exc}")
            if rollback_errors:
                raise RuntimeError("Batch write failed and rollback was incomplete: " + "; ".join(rollback_errors))
            raise
        return committed


def read_strategy(filename: str, output_dir: str) -> str:
    path = _strategy_path(filename, output_dir, must_exist=True)
    return _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Strategy source")


def _read_meta(filename: str, output_dir: str) -> Dict[str, Any]:
    p = sidecar_path(filename, output_dir)
    if not p.exists():
        return {}
    try:
        return json.loads(_read_text_limited(p, max_bytes=MAX_METADATA_BYTES, label="Strategy metadata"))
    except Exception:
        return {}


def _read_meta_strict(filename: str, output_dir: str) -> Dict[str, Any]:
    p = sidecar_path(filename, output_dir)
    if not p.exists():
        return {}
    try:
        parsed = json.loads(_read_text_limited(p, max_bytes=MAX_METADATA_BYTES, label="Strategy metadata"))
    except json.JSONDecodeError as exc:
        raise ValueError(f"Strategy metadata is not valid JSON: {p.name}") from exc
    if not isinstance(parsed, dict):
        raise ValueError(f"Strategy metadata must contain a JSON object: {p.name}")
    return parsed


def read_metadata(filename: str, output_dir: str) -> Dict[str, Any]:
    _strategy_path(filename, output_dir, must_exist=True)
    return _read_meta_strict(filename, output_dir)


def _design_impact_for_change(field: str, left: Any, right: Any) -> str:
    name = field.lower()
    if name in {"strategy_name", "class_name"}:
        return "Renames the generated class/file only; strategy logic is unchanged."
    if "stoploss" in name:
        return "Changes the hard downside boundary used by the generated strategy."
    if "roi" in name:
        return "Changes the basic ROI exit target used by the generated strategy."
    if "timeframe" in name:
        return "Changes the candle timeframe assumption; review all lookback windows together."
    if any(k in name for k in ["fast", "slow", "ema", "sma", "window", "period"]):
        return "Changes signal smoothness or reaction speed."
    if "rsi" in name:
        return "Changes momentum or pullback filtering strictness."
    if "adx" in name:
        return "Changes trend-strength confirmation strictness."
    if "volume" in name:
        return "Changes participation / volume confirmation behavior."
    if any(k in name for k in ["atr", "volatility", "bandwidth"]):
        return "Changes volatility filtering or volatility-based exit behavior."
    if any(k in name for k in ["score", "weight", "confirmations"]):
        return "Changes how strict the combined signal voting logic is."
    if isinstance(left, bool) or isinstance(right, bool) or name.startswith("use_"):
        return "Turns a design module on/off or changes whether a filter is required."
    return "Changes the generated strategy design; inspect the preview before external testing."


def diff_strategy_metadata(left_filename: str, right_filename: str, output_dir: str) -> Dict[str, Any]:
    left_meta = read_metadata(left_filename, output_dir)
    right_meta = read_metadata(right_filename, output_dir)
    left_values = left_meta.get("values", {})
    right_values = right_meta.get("values", {})
    all_fields = sorted(set(left_values) | set(right_values))
    changes = []
    for field in all_fields:
        lv = left_values.get(field)
        rv = right_values.get(field)
        if lv != rv:
            changes.append({
                "field": field,
                "left": lv,
                "right": rv,
                "design_impact": _design_impact_for_change(field, lv, rv),
            })
    template_changed = left_meta.get("template_key") != right_meta.get("template_key")
    if changes:
        top_impacts = "; ".join(f"{c['field']}: {c['design_impact']}" for c in changes[:4])
    else:
        top_impacts = "No saved parameter changes were found."
    summary = {
        "zh": f"发现 {len(changes)} 个参数变化" + ("；模板也发生变化。" if template_changed else "。"),
        "en": f"Found {len(changes)} parameter change(s)" + ("; the template also changed." if template_changed else "."),
    }
    impact_summary = {
        "zh": "这是一份设计层面的差异摘要，不包含任何回测或绩效判断。",
        "en": f"Design-level impact summary: {top_impacts} This does not include any backtest or performance judgment.",
    }
    return {
        "left_filename": left_filename,
        "right_filename": right_filename,
        "output_dir": str(Path(output_dir).resolve()),
        "template_changed": template_changed,
        "changed_parameters": changes,
        "summary": summary,
        "impact_summary": impact_summary,
    }


def clone_payload(filename: str, output_dir: str) -> Dict[str, Any]:
    meta = read_metadata(filename, output_dir)
    template_key = meta.get("template_key")
    values = dict(meta.get("values", {}))
    if not template_key:
        raise ValueError("This strategy does not have enough metadata to clone.")
    values["strategy_name"] = (meta.get("base_name") or Path(filename).stem)
    return {
        "filename": filename,
        "output_dir": str(Path(output_dir).resolve()),
        "template_key": template_key,
        "values": values,
        "notes": meta.get("notes") or "",
    }





FREQTRADE_TARGETS = {
    "generic": {
        "label": "Generic Freqtrade import",
        "folder": "Data / freqtrade-xx / user_data / strategies",
        "app": "the relevant Freqtrade app",
        "suffix": "freqtrade",
        "profile": "generic",
        "note": "Use the Freqtrade app that matches your external workflow.",
    },
    "backtest": {
        "label": "Freqtrade Backtest",
        "folder": "Data / freqtrade-backtest / user_data / strategies",
        "app": "freqtrade-backtest",
        "suffix": "freqtrade-backtest",
        "profile": "backtest",
        "note": "Designed for external Freqtrade backtesting; no backtest is run inside Strategy Builder.",
    },
    "spot": {
        "label": "Freqtrade Spot",
        "folder": "Data / freqtrade-spot / user_data / strategies",
        "app": "freqtrade-spot",
        "suffix": "freqtrade-spot",
        "profile": "spot",
        "note": "Designed for spot-compatible manual import; review any short logic before use.",
    },
    "future": {
        "label": "Freqtrade Future",
        "folder": "Data / freqtrade-future / user_data / strategies",
        "app": "freqtrade-future",
        "suffix": "freqtrade-future",
        "profile": "future",
        "note": "Designed for futures-oriented manual import; leverage and exchange settings remain in Freqtrade.",
    },
}


def _export_target(export_target: str | None) -> Dict[str, str]:
    key = str(export_target or "generic").strip().lower().replace("futures", "future")
    return FREQTRADE_TARGETS.get(key, FREQTRADE_TARGETS["generic"])


def _freqtrade_import_checklist(target: Dict[str, str]) -> str:
    return "\n".join([
        "Freqtrade Import Checklist",
        "===========================",
        "",
        f"Target: {target['label']}",
        f"Upload folder: {target['folder']}",
        "",
        "1. Download or extract the generated `.py` strategy file.",
        "2. Open the Olares file manager.",
        f"3. Go to `{target['folder']}`.",
        "4. Upload the `.py` file into that `strategies` folder.",
        f"5. Open `{target['app']}` in Olares.",
        "6. Refresh or restart the Freqtrade app if the strategy does not appear.",
        "7. Select or load the strategy inside Freqtrade.",
        "",
        "Scope reminder: Strategy Builder only generates strategy files. Backtesting, execution, and bot operation happen inside Freqtrade.",
        "",
    ])


def _freqtrade_compatibility_notes(target: Dict[str, str]) -> str:
    return "\n".join([
        "# Freqtrade Compatibility Notes",
        "",
        f"Target export mode: **{target['label']}**",
        "",
        "This package contains a Freqtrade-compatible Python strategy file generated by Strategy Builder.",
        "Place the `.py` strategy file under:",
        "",
        f"`{target['folder']}`",
        "",
        "Important notes:",
        "",
        "- Strategy Builder does not run backtests.",
        "- Strategy Builder does not execute trades.",
        "- Strategy Builder does not connect to exchanges or manage API keys.",
        "- Any backtest, dry run, or live usage should be handled inside the target Freqtrade app.",
        "- Review the generated class name and strategy logic before using it externally.",
        "",
    ])



def _short_capability_notes(source: str, target: Dict[str, str]) -> str:
    has_short = "can_short = True" in source or "enter_short" in source or "exit_short" in source
    lines = [
        "# Long / Short Capability Notes",
        "",
        f"Export target: **{target['label']}**",
        "",
        "This note describes the static long/short structure detected in the generated strategy file. It does not run the strategy or evaluate performance.",
        "",
        f"- Short-side logic detected: {'yes' if has_short else 'no'}",
        f"- Target profile: {target.get('profile', 'generic')}",
        "",
    ]
    if has_short:
        lines.extend([
            "## Important Futures Reminder",
            "",
            "The strategy file contains short-side fields such as `can_short`, `enter_short`, or `exit_short`.",
            "Use this only with a Freqtrade setup that supports the intended futures or margin workflow.",
            "Leverage, margin mode, exchange configuration, and risk controls must be configured inside Freqtrade, not Strategy Builder.",
            "",
        ])
        if target.get("profile") == "spot":
            lines.extend([
                "## Spot Export Warning",
                "",
                "The selected export target is spot, but short-side logic was detected. Review the generated file before importing it into a spot-only Freqtrade app.",
                "",
            ])
    else:
        lines.extend([
            "## Long-Only Structure",
            "",
            "No short-side entry or exit fields were detected. This looks like a long-only strategy file from a static code perspective.",
            "",
        ])
    return "\n".join(lines)

def freqtrade_import_guide_markdown(export_target: str | None = "generic") -> str:
    """Return the stable Olares-to-Freqtrade manual import guide."""
    target = _export_target(export_target)
    return f"""# Freqtrade Import Guide for Strategy Builder v{settings.app_version}

Strategy Builder generates Freqtrade-compatible strategy files only. It does not run backtests, execute trades, connect to exchanges, or write directly into another Olares application's data area.

## Selected export target

- Target: **{target['label']}**
- Upload folder: `{target['folder']}`
- Open app after upload: `{target['app']}`

## Recommended workflow

1. Generate the strategy in Strategy Builder.
2. Download the generated `.py` strategy file or export the strategy package.
3. Open the Olares file manager.
4. Upload the `.py` file into the correct Freqtrade application folder.
5. Open the corresponding Freqtrade app and select or load the strategy there.

## Target folders

Use the folder that matches your intended Freqtrade workflow:

- Backtesting: `Data / freqtrade-backtest / user_data / strategies`
- Spot trading: `Data / freqtrade-spot / user_data / strategies`
- Futures trading: `Data / freqtrade-future / user_data / strategies`

## Notes

- If the strategy does not appear immediately in Freqtrade, refresh or restart the corresponding Freqtrade app.
- Always review and test generated strategies inside Freqtrade before any real use.
- This guide is included to keep the Olares workflow clear and compatible with app isolation.
"""


def _contains_hardcoded_secret(source: str) -> bool:
    """Detect obvious hardcoded secret-like assignments without inspecting external files."""
    patterns = [
        r"api[_-]?key\s*=\s*['\"][A-Za-z0-9_\-]{16,}['\"]",
        r"secret\s*=\s*['\"][A-Za-z0-9_\-]{16,}['\"]",
        r"password\s*=\s*['\"][^'\"]{8,}['\"]",
    ]
    return any(re.search(pat, source, re.IGNORECASE) for pat in patterns)


def _code_quality_report_markdown(report: Dict[str, Any]) -> str:
    lines = [
        f"# Code Quality Report: {report.get('filename', '-')}",
        "",
        "This is a static code-quality review for Freqtrade import readiness. It does not run a backtest, execute trades, or evaluate profitability.",
        "",
        f"Overall status: **{report.get('status', 'review')}**",
        f"Score: **{report.get('score', 0)}/{report.get('max_score', 0)}**",
        "",
        "## Checks",
        "",
    ]
    for check in report.get("checks", []):
        mark = "PASS" if check.get("ok") else "REVIEW"
        lines.append(f"- **[{mark}] {check.get('label')}** — {check.get('detail')}")
    notes = report.get("notes", []) or []
    if notes:
        lines.extend(["", "## Notes", ""])
        for note in notes:
            lines.append(f"- {note}")
    lines.extend([
        "",
        "## Scope Reminder",
        "",
        "This report only checks whether the generated file looks safe and import-ready. It does not determine whether the strategy is profitable or suitable for live trading.",
        "",
    ])
    return "\n".join(lines)


def code_quality_check(filename: str, output_dir: str, export_target: str | None = "generic") -> Dict[str, Any]:
    """Run a static code-quality check on a generated strategy file."""
    path = _strategy_path(filename, output_dir, must_exist=True)
    source = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Strategy source")
    target = _export_target(export_target)
    class_name = Path(filename).stem
    checks: List[Dict[str, Any]] = []

    def add(key: str, label: str, ok: bool, detail: str, severity: str = "standard"):
        checks.append({"key": key, "label": label, "ok": bool(ok), "detail": detail, "severity": severity})

    add("python_extension", "Python strategy file", path.suffix == ".py", filename, "required")
    add("class_name", "Valid importable class name", bool(re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", class_name)), class_name, "required")
    try:
        compile(source, filename, "exec")
        syntax_ok = True
        syntax_detail = "Python syntax compiles successfully."
    except SyntaxError as exc:
        syntax_ok = False
        syntax_detail = f"Syntax error: {exc}"
    add("python_syntax", "Python syntax check", syntax_ok, syntax_detail, "required")
    add("istrategy", "Freqtrade IStrategy reference", "IStrategy" in source, "IStrategy reference found" if "IStrategy" in source else "No IStrategy reference found", "required")
    add("indicators", "Indicator method exists", "populate_indicators" in source, "populate_indicators found" if "populate_indicators" in source else "Missing populate_indicators", "required")
    add("entry", "Entry method exists", "populate_entry_trend" in source, "populate_entry_trend found" if "populate_entry_trend" in source else "Missing populate_entry_trend", "required")
    add("exit", "Exit method exists", "populate_exit_trend" in source, "populate_exit_trend found" if "populate_exit_trend" in source else "Missing populate_exit_trend", "required")
    lookahead_patterns = ["shift(-", ".iloc[-1]", "lookahead"]
    has_lookahead = any(pattern in source for pattern in lookahead_patterns)
    add("no_lookahead", "No obvious lookahead pattern", not has_lookahead, "No common lookahead pattern found" if not has_lookahead else "Review possible future-looking reference", "required")
    forbidden_patterns = ["Backtesting(", "freqtrade backtesting", "exchange.create_order", "create_order(", "wallets", "ccxt."]
    has_execution = any(pattern in source for pattern in forbidden_patterns)
    add("no_execution", "No obvious execution/backtest calls", not has_execution, "No execution or backtest call found" if not has_execution else "Review source for execution/backtest logic", "required")
    has_secret = _contains_hardcoded_secret(source)
    add("no_secrets", "No obvious hardcoded credentials", not has_secret, "No obvious credential pattern found" if not has_secret else "Review possible hardcoded credential", "required")
    short_enabled = "can_short = True" in source or "enter_short" in source or "exit_short" in source
    if target.get("profile") == "spot":
        add("spot_profile", "Spot profile compatibility", not short_enabled, "No short-side futures pattern detected" if not short_enabled else "Spot export selected but short logic may be present", "profile")
    elif target.get("profile") == "future":
        add("future_profile", "Futures profile note", True, "Futures leverage, margin, and exchange settings must be configured inside Freqtrade, not Strategy Builder.", "profile")
        add("short_structure", "Long/short structure documented", True, "Short-side logic detected" if short_enabled else "Long-only strategy exported for futures profile", "profile")
    elif target.get("profile") == "backtest":
        add("backtest_profile", "Backtest profile note", True, "This file is import-ready for external Freqtrade backtesting; no backtest is run here.", "profile")
    else:
        add("generic_profile", "Generic profile note", True, "Use the target Freqtrade app that matches your workflow.", "profile")

    required = [c for c in checks if c.get("severity") == "required"]
    passed = sum(1 for c in required if c.get("ok"))
    max_score = len(required)
    status = "passed" if passed == max_score else "review_needed"
    notes = []
    if status != "passed":
        notes.append("Review failed required checks before importing this strategy into Freqtrade.")
    if target.get("profile") == "future":
        notes.append("Futures export does not configure leverage or exchange settings; handle those inside Freqtrade.")
    if target.get("profile") == "spot":
        notes.append("Spot export should generally remain long-only unless your Freqtrade setup explicitly supports other behavior.")
    return {
        "filename": filename,
        "output_dir": str(Path(output_dir).resolve()),
        "export_target": target,
        "status": status,
        "score": passed,
        "max_score": max_score,
        "checks": checks,
        "notes": notes,
        "markdown": "",  # filled below
    } | {"markdown": _code_quality_report_markdown({
        "filename": filename,
        "status": status,
        "score": passed,
        "max_score": max_score,
        "checks": checks,
        "notes": notes,
    })}


def _strategy_readiness_report_markdown(report: Dict[str, Any]) -> str:
    lines = [
        f"# Strategy Readiness Report: {report.get('filename', '-')}",
        "",
        "This report checks whether the generated strategy file is ready for manual import into Freqtrade. It does not run a backtest or make any performance claim.",
        "",
        f"Target: **{(report.get('export_target') or {}).get('label', '-')}**",
        f"Upload folder: `{(report.get('export_target') or {}).get('folder', '-')}`",
        "",
        "## Readiness Summary",
        "",
    ]
    scores = report.get("readiness_scores", {}) or {}
    for key, value in scores.items():
        lines.append(f"- **{key.replace('_', ' ').title()}**: {value}")
    lines.extend(["", "## Checklist", ""])
    for check in report.get("checks", []):
        mark = "PASS" if check.get("ok") else "REVIEW"
        lines.append(f"- **[{mark}] {check.get('label')}** — {check.get('detail')}")
    warnings = report.get("warnings", []) or []
    if warnings:
        lines.extend(["", "## Notes", ""])
        for warning in warnings:
            lines.append(f"- {warning}")
    lines.extend(["", "## Scope Reminder", "", "Import readiness is not strategy performance. Use Freqtrade for any backtest, dry run, or live workflow.", ""])
    return "\n".join(lines)


def strategy_readiness_check(filename: str, output_dir: str, export_target: str | None = "generic") -> Dict[str, Any]:
    """Run a file-level readiness check before manual import into Freqtrade."""
    path = _strategy_path(filename, output_dir, must_exist=True)
    source = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Strategy source")
    meta = _read_meta_strict(filename, output_dir)
    values = meta.get("values", {}) or {}
    target = _export_target(export_target)
    quality = code_quality_check(filename, output_dir, export_target=export_target)
    class_name = Path(filename).stem
    checks = []

    def add(key: str, label: str, ok: bool, detail: str):
        checks.append({"key": key, "label": label, "ok": bool(ok), "detail": detail})

    add("python_file", "Strategy file is a Python file", path.suffix == ".py", filename)
    add("class_name", "Class name looks importable", bool(re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", class_name)), class_name)
    add("istrategy", "Strategy extends or imports Freqtrade strategy base", "IStrategy" in source, "IStrategy reference found" if "IStrategy" in source else "No IStrategy reference found")
    add("entry_logic", "Entry logic exists", "populate_entry_trend" in source, "populate_entry_trend found" if "populate_entry_trend" in source else "Missing populate_entry_trend")
    add("exit_logic", "Exit logic exists", "populate_exit_trend" in source, "populate_exit_trend found" if "populate_exit_trend" in source else "Missing populate_exit_trend")
    add("stoploss", "Stoploss is valid", isinstance(values.get("stoploss"), (int, float)) and float(values.get("stoploss")) < 0, f"stoploss={values.get('stoploss')}")
    add("roi", "ROI setting is present", "minimal_roi" in values or "minimal_roi" in source, "minimal_roi found")
    add("code_quality", "Static code quality passed", quality.get("status") == "passed", f"{quality.get('score')}/{quality.get('max_score')} required checks passed")
    add("target_folder", "Manual import target is documented", True, target["folder"])

    ready = all(c["ok"] for c in checks)
    warnings = []
    for w in meta.get("warnings", [])[:5]:
        warnings.append(str(w))
    if not ready:
        warnings.append("Review failed checks before importing this strategy into Freqtrade.")
    if target.get("profile") == "future":
        warnings.append("Futures profile selected: leverage, margin, and exchange settings still belong in Freqtrade.")
    if target.get("profile") == "spot" and ("can_short = True" in source or "enter_short" in source):
        warnings.append("Spot profile selected, but possible short logic was detected. Review before import.")
    design_clarity = (meta.get("template_quality_audit") or {}).get("design_clarity") or "moderate"
    readiness_scores = {
        "freqtrade_readiness": "Ready" if ready else "Review needed",
        "code_safety": "Passed" if quality.get("status") == "passed" else "Review needed",
        "design_clarity": str(design_clarity).title(),
        "import_readiness": "Ready" if ready else "Review needed",
        "review_needed": "No" if ready and not warnings else "Yes",
    }
    result = {
        "filename": filename,
        "output_dir": str(Path(output_dir).resolve()),
        "export_target": target,
        "ready": ready,
        "checks": checks,
        "warnings": warnings,
        "readiness_scores": readiness_scores,
        "code_quality": {k: v for k, v in quality.items() if k != "markdown"},
        "summary": "Ready for manual Freqtrade import." if ready else "Review the failed readiness checks before importing.",
    }
    result["markdown"] = _strategy_readiness_report_markdown(result)
    return result



def _strategy_handoff_report_markdown(filename: str, meta: Dict[str, Any], readiness: Dict[str, Any], quality: Dict[str, Any], target: Dict[str, str]) -> str:
    """Build a compact handoff report for moving a generated strategy into Freqtrade."""
    summary = meta.get("design_summary", {}) or {}
    guided = summary.get("guided_card", {}) or {}
    checks = readiness.get("readiness_scores", {}) or {}
    lines = [
        f"# Strategy Handoff Report: {filename}",
        "",
        "This report is generated by Strategy Builder to help users hand off the strategy file into Freqtrade. It does not contain backtest results or performance claims.",
        "",
        "## Target",
        "",
        f"- Export target: **{target.get('label', '-')}**",
        f"- Manual upload folder: `{target.get('folder', '-')}`",
        "",
        "## Strategy Identity",
        "",
        f"- Template: `{meta.get('template_key', '-')}`",
        f"- Builder version: `{meta.get('builder_version', '-')}`",
        f"- Strategy family: `{meta.get('strategy_family', '-')}`",
        f"- Market regime: `{meta.get('market_regime', '-')}`",
        f"- Risk level: `{meta.get('risk_level', '-')}`",
        "",
        "## Design Snapshot",
        "",
        f"- Best for: {(guided.get('best_for') or {}).get('en') or '-'}",
        f"- Entry idea: {(guided.get('entry_idea') or {}).get('en') or '-'}",
        f"- Exit idea: {(guided.get('exit_idea') or {}).get('en') or '-'}",
        f"- Things to watch: {(guided.get('things_to_watch') or {}).get('en') or '-'}",
        "",
        "## Readiness Summary",
        "",
        f"- Freqtrade readiness: {checks.get('freqtrade_readiness', '-')}",
        f"- Code safety: {checks.get('code_safety', '-')}",
        f"- Import readiness: {checks.get('import_readiness', '-')}",
        f"- Review needed: {checks.get('review_needed', '-')}",
        f"- Code quality status: {quality.get('status', '-')}",
        "",
        "## Recommended Next Step",
        "",
        "Download or extract the `.py` file, upload it into the target Freqtrade `user_data/strategies` folder, then review and test it inside Freqtrade.",
        "",
    ]
    return "\n".join(lines)


def _field_values_from_meta(meta: Dict[str, Any]) -> Dict[str, Any]:
    values = meta.get("values") or {}
    return values if isinstance(values, dict) else {}


def _parameter_tuning_guide_markdown(filename: str, meta: Dict[str, Any]) -> str:
    """Create a non-performance parameter guidance note for generated strategy packages."""
    tpl = _metadata_template(meta)
    values = _field_values_from_meta(meta)
    lines = [
        f"# Parameter Tuning Guide: {filename}",
        "",
        "This guide is generated from the strategy design metadata. It is not an optimization result and does not contain backtest performance.",
        "",
        "## Main Parameters to Review",
        "",
    ]
    if tpl:
        for field in tpl.fields:
            if field.name in {"strategy_name", "export_plot_config"}:
                continue
            value = values.get(field.name, field.default)
            explanation = _parameter_review_explanation(field.name)
            lines.extend([
                f"### `{field.name}`",
                "",
                f"- Current value: `{value}`",
                f"- What it controls: {explanation.get('controls', '-')}",
                f"- Lower/smaller value: {explanation.get('smaller', '-')}",
                f"- Higher/larger value: {explanation.get('larger', '-')}",
                f"- Common mistake: {explanation.get('mistake', '-')}",
                "",
            ])
    else:
        lines.append("No template metadata was found for this strategy. Review the Python source manually.")
    lines.extend([
        "## Suggested Iteration Discipline",
        "",
        "1. Change only one design dimension at a time.",
        "2. Clone the previous version before changing thresholds.",
        "3. Keep a short note explaining why the change was made.",
        "4. Test externally inside Freqtrade; Strategy Builder does not run backtests.",
        "",
    ])
    return "\n".join(lines)


def build_parameter_tuning_guide(filename: str, output_dir: str) -> Dict[str, Any]:
    path = _strategy_path(filename, output_dir, must_exist=True)
    meta = _read_meta_strict(filename, output_dir)
    markdown = _parameter_tuning_guide_markdown(filename, meta)
    return {"filename": filename, "markdown": markdown, "template_key": meta.get("template_key", "")}


def _scenario_plan_markdown(filename: str, meta: Dict[str, Any], export_target: str | None = "generic") -> str:
    """Create a design-level scenario plan. This is not a market prediction or backtest."""
    target = _export_target(export_target)
    tpl = _metadata_template(meta)
    guided = meta.get("guided_summary") or {}
    values = _field_values_from_meta(meta)
    scenario_mode = values.get("scenario_mode") or values.get("router_mode") or values.get("preset_pack") or "base_case"
    lines = [
        f"# Strategy Scenario Plan: {filename}",
        "",
        f"Export target: **{target['label']}**",
        "",
        "This plan describes how to review the strategy under different design scenarios. It does not run a backtest and does not claim profitability.",
        "",
        "## Strategy Context",
        "",
        f"- Template: `{meta.get('template_key', '-')}`",
        f"- Market regime: `{meta.get('market_regime', '-')}`",
        f"- Risk level: `{meta.get('risk_level', '-')}`",
        f"- Scenario or preset mode: `{scenario_mode}`",
        f"- Best for: {(guided.get('best_for') or {}).get('en') or (tpl.suitable_market.en if tpl else '-')}",
        f"- Entry idea: {(guided.get('entry_idea') or {}).get('en') or (tpl.entry_logic.en if tpl else '-')}",
        f"- Exit idea: {(guided.get('exit_idea') or {}).get('en') or (tpl.exit_logic.en if tpl else '-')}",
        "",
        "## Design Scenarios to Review Externally",
        "",
        "### 1. Base Case",
        "- Confirm the primary entry signal is easy to explain.",
        "- Confirm the exit condition matches the same market hypothesis as the entry.",
        "- Avoid changing many thresholds before this version has been reviewed in Freqtrade.",
        "",
        "### 2. High-Volatility Case",
        "- Review ATR-related parameters such as `max_entry_atr_pct`, `hard_atr_pct`, and `atr_period` when present.",
        "- Check whether the strategy blocks entries during unstable volatility or only exits after volatility is already high.",
        "",
        "### 3. Low-Participation Case",
        "- Review volume filters such as `volume_period`, `volume_multiplier`, and volume-related score weights when present.",
        "- If volume confirmation is too strict, the strategy may become very selective.",
        "",
        "### 4. Conflicting-Signal Case",
        "- Check whether trend, momentum, volatility, and overheat conditions point in different directions.",
        "- For score-based builders, review whether entry and exit score boundaries are clearly separated.",
        "",
        "## Handoff Reminder",
        "",
        f"Upload the generated `.py` file manually into `{target['folder']}` and review/test it inside Freqtrade.",
        "",
    ]
    return "\n".join(lines)


def build_strategy_scenario_plan(filename: str, output_dir: str, export_target: str | None = "generic") -> Dict[str, Any]:
    path = _strategy_path(filename, output_dir, must_exist=True)
    meta = _read_meta_strict(filename, output_dir)
    markdown = _scenario_plan_markdown(filename, meta, export_target=export_target)
    return {"filename": filename, "markdown": markdown, "template_key": meta.get("template_key", ""), "export_target": _export_target(export_target)}


def export_strategy_package(filename: str, output_dir: str, export_target: str | None = "generic") -> Tuple[str, bytes]:
    path = _strategy_path(filename, output_dir, must_exist=True)
    meta = _read_meta_strict(filename, output_dir)
    source = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Strategy source")
    review_bundle = build_strategy_review_report(filename, output_dir)
    readiness = strategy_readiness_check(filename, output_dir, export_target=export_target)
    quality = code_quality_check(filename, output_dir, export_target=export_target)
    target = readiness["export_target"]
    documentation = meta.get("documentation_notes", {}) or {}
    readiness_lines = ["Strategy readiness check:"]
    for check in readiness["checks"]:
        mark = "OK" if check.get("ok") else "CHECK"
        readiness_lines.append(f"- [{mark}] {check.get('label')}: {check.get('detail')}")
    note_lines = [
        f"Generated strategy package: {filename}",
        "",
        f"Export target: {target['label']}",
        f"Manual upload folder: {target['folder']}",
        "",
        f"Builder version: {meta.get('builder_version', '-')}",
        f"Template: {meta.get('template_key', '-')}",
        f"Base name: {meta.get('base_name', '-')}",
        f"Version: {meta.get('version', '-')}",
        f"User notes: {meta.get('notes') or '-'}",
        "",
        "Strategy draft note:",
        (meta.get('strategy_draft_notes') or {}).get('en', '-'),
        "",
        "Documentation notes:",
        f"Research note: {documentation.get('research_note') or '-'}",
        f"Change note: {documentation.get('change_note') or '-'}",
        f"External testing note: {documentation.get('external_testing_note') or '-'}",
        "",
        *readiness_lines,
        "",
        "Library curation:",
        f"Status: {(meta.get('curation') or {}).get('curation_status', 'draft')}",
        f"Review status: {(meta.get('curation') or {}).get('review_status', 'not_reviewed')}",
        f"Tags: {', '.join((meta.get('curation') or {}).get('library_tags', []) or []) or '-'}",
        f"Archived: {(meta.get('curation') or {}).get('archived', False)}",
        f"Curation note: {(meta.get('curation') or {}).get('curation_note') or '-'}",
        "",
        "Important:",
        "This package contains only generated strategy-development files and documentation.",
        "It does not include backtest results, trading signals, exchange credentials, or execution logic.",
        "Review and test externally before any use.",
    ]
    zip_buffer = io.BytesIO()
    package_name = f"{Path(filename).stem}_{target['suffix']}_strategy_package.zip"
    with zipfile.ZipFile(zip_buffer, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(filename, source)
        zf.writestr(f"{filename}.meta.json", json.dumps(meta, ensure_ascii=False, indent=2))
        zf.writestr("README_strategy_note.txt", "\n".join(note_lines) + "\n")
        zf.writestr("strategy_review_report.md", review_bundle["markdown"])
        zf.writestr("strategy_readiness_check.json", json.dumps(readiness, ensure_ascii=False, indent=2))
        zf.writestr("STRATEGY_READINESS_REPORT.md", readiness.get("markdown", ""))
        zf.writestr("code_quality_report.json", json.dumps({k: v for k, v in quality.items() if k != "markdown"}, ensure_ascii=False, indent=2))
        zf.writestr("CODE_QUALITY_REPORT.md", quality.get("markdown", ""))
        zf.writestr("IMPORT_CHECKLIST.txt", _freqtrade_import_checklist(target))
        zf.writestr("FREQTRADE_COMPATIBILITY_NOTES.md", _freqtrade_compatibility_notes(target))
        zf.writestr("FREQTRADE_IMPORT_GUIDE.md", freqtrade_import_guide_markdown(export_target))
        zf.writestr("LONG_SHORT_CAPABILITY_NOTES.md", _short_capability_notes(source, target))
        zf.writestr("STRATEGY_HANDOFF_REPORT.md", _strategy_handoff_report_markdown(filename, meta, readiness, quality, target))
        zf.writestr("PARAMETER_TUNING_GUIDE.md", _parameter_tuning_guide_markdown(filename, meta))
        zf.writestr("STRATEGY_SCENARIO_PLAN.md", _scenario_plan_markdown(filename, meta, export_target=export_target))
    return package_name, zip_buffer.getvalue()


def export_strategy_collection(filenames: List[str], output_dir: str, export_target: str | None = "generic") -> Tuple[str, bytes]:
    """Export a selected set of generated strategies as a documentation-first collection zip."""
    out = Path(output_dir).resolve()
    if not filenames:
        raise ValueError("No strategy filenames were selected.")
    filenames = list(dict.fromkeys(filenames))
    if len(filenames) > 100:
        raise ValueError("A collection export is limited to 100 unique strategies.")
    target = _export_target(export_target)
    zip_buffer = io.BytesIO()
    index_rows = [
        "# Strategy Collection Export",
        "",
        f"Export target: **{target['label']}**",
        f"Manual upload folder: `{target['folder']}`",
        "",
        "This export contains generated strategy files and their documentation only.",
        "It does not include backtest results, exchange credentials, trading signals, or execution logic.",
        "",
        "| Strategy | Template | Version | Ready | Status | Review | Tags | Archived |",
        "|---|---|---:|---|---|---|---|---|",
    ]
    collection_has_short = False
    total_source_bytes = 0
    with zipfile.ZipFile(zip_buffer, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for filename in filenames:
            safe = validate_strategy_filename(filename)
            path = _strategy_path(safe, output_dir, must_exist=True)
            meta = _read_meta_strict(safe, output_dir)
            curation = _default_curation(meta.get("curation") if isinstance(meta.get("curation"), dict) else meta)
            if isinstance(meta.get("curation"), dict):
                curation = meta["curation"]
            folder = Path(safe).stem
            total_source_bytes += path.stat().st_size
            if total_source_bytes > MAX_COLLECTION_SOURCE_BYTES:
                raise ValueError("The selected strategy collection exceeds the 25 MB source limit.")
            source = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Strategy source")
            if "can_short = True" in source or "enter_short" in source or "exit_short" in source:
                collection_has_short = True
            review_bundle = build_strategy_review_report(safe, output_dir)
            readiness = strategy_readiness_check(safe, output_dir, export_target=export_target)
            quality = code_quality_check(safe, output_dir, export_target=export_target)
            zf.writestr(f"{folder}/{safe}", source)
            zf.writestr(f"{folder}/{safe}.meta.json", json.dumps(meta, ensure_ascii=False, indent=2))
            zf.writestr(f"{folder}/strategy_review_report.md", review_bundle["markdown"])
            zf.writestr(f"{folder}/strategy_readiness_check.json", json.dumps(readiness, ensure_ascii=False, indent=2))
            zf.writestr(f"{folder}/STRATEGY_READINESS_REPORT.md", readiness.get("markdown", ""))
            zf.writestr(f"{folder}/code_quality_report.json", json.dumps({k: v for k, v in quality.items() if k != "markdown"}, ensure_ascii=False, indent=2))
            zf.writestr(f"{folder}/CODE_QUALITY_REPORT.md", quality.get("markdown", ""))
            zf.writestr(f"{folder}/LONG_SHORT_CAPABILITY_NOTES.md", _short_capability_notes(source, target))
            zf.writestr(f"{folder}/STRATEGY_HANDOFF_REPORT.md", _strategy_handoff_report_markdown(safe, meta, readiness, quality, target))
            zf.writestr(f"{folder}/PARAMETER_TUNING_GUIDE.md", _parameter_tuning_guide_markdown(safe, meta))
            zf.writestr(f"{folder}/STRATEGY_SCENARIO_PLAN.md", _scenario_plan_markdown(safe, meta, export_target=export_target))
            index_rows.append(
                "| {strategy} | {template} | {version} | {ready} | {status} | {review} | {tags} | {archived} |".format(
                    strategy=safe,
                    template=meta.get("template_key", "-"),
                    version=meta.get("version", "-"),
                    ready="yes" if readiness.get("ready") else "review",
                    status=curation.get("curation_status", "draft"),
                    review=curation.get("review_status", "not_reviewed"),
                    tags=", ".join(curation.get("library_tags", []) or []) or "-",
                    archived=curation.get("archived", False),
                )
            )
        zf.writestr("COLLECTION_INDEX.md", "\n".join(index_rows) + "\n")
        zf.writestr("IMPORT_CHECKLIST.txt", _freqtrade_import_checklist(target))
        zf.writestr("FREQTRADE_COMPATIBILITY_NOTES.md", _freqtrade_compatibility_notes(target))
        zf.writestr("FREQTRADE_IMPORT_GUIDE.md", freqtrade_import_guide_markdown(export_target))
        zf.writestr("LONG_SHORT_CAPABILITY_NOTES.md", _short_capability_notes("enter_short" if collection_has_short else "", target))
    return f"strategy_collection_{target['suffix']}_export.zip", zip_buffer.getvalue()


def _normalize_tags(tags: Any) -> List[str]:
    """Normalize library tags for lightweight strategy curation."""
    if isinstance(tags, str):
        raw = re.split(r"[,;\s]+", tags)
    elif isinstance(tags, list):
        raw = tags
    else:
        raw = []
    cleaned: List[str] = []
    seen = set()
    for tag in raw:
        t = str(tag or "").strip().lower().replace(" ", "_")
        if not t:
            continue
        if not re.match(r"^[a-z0-9_\-]{1,32}$", t):
            continue
        if t in seen:
            continue
        seen.add(t)
        cleaned.append(t)
    return cleaned[:12]


def _default_curation(meta: Dict[str, Any]) -> Dict[str, Any]:
    """Return a safe curation block for older metadata files."""
    return {
        "curation_status": meta.get("curation_status") or "draft",
        "review_status": meta.get("review_status") or "not_reviewed",
        "library_tags": _normalize_tags(meta.get("library_tags") or []),
        "curation_note": str(meta.get("curation_note") or "").strip(),
        "archived": bool(meta.get("archived", False)),
        "updated_at": meta.get("curation_updated_at") or "",
    }


def update_strategy_curation(filename: str, output_dir: str, curation: Dict[str, Any]) -> Dict[str, Any]:
    """Save library-level status, review status, tags, and archive flag into metadata only."""
    with _WRITE_LOCK:
        _strategy_path(filename, output_dir, must_exist=True)
        meta = _read_meta_strict(filename, output_dir)
        existing = _default_curation(meta)
        allowed_status = {"draft", "review", "ready", "parked"}
        allowed_review = {"not_reviewed", "needs_review", "reviewed"}
        status = str(curation.get("curation_status", existing["curation_status"]) or "draft").strip()
        review_status = str(curation.get("review_status", existing["review_status"]) or "not_reviewed").strip()
        if status not in allowed_status:
            status = "draft"
        if review_status not in allowed_review:
            review_status = "not_reviewed"
        updated = {
            "curation_status": status,
            "review_status": review_status,
            "library_tags": _normalize_tags(curation.get("library_tags", existing["library_tags"])),
            "curation_note": str(curation.get("curation_note", existing["curation_note"]) or "").strip()[:4000],
            "archived": bool(curation.get("archived", existing["archived"])),
            "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        }
        meta["curation"] = updated
        meta_path = sidecar_path(filename, output_dir)
        _atomic_write_text(meta_path, json.dumps(meta, ensure_ascii=False, indent=2))
        return {"metadata": meta, "curation": updated}


def _local_text(value: Any, lang: str = "en", default: str = "-") -> str:
    """Read a localized dict or plain value safely."""
    if isinstance(value, dict):
        return str(value.get(lang) or value.get("en") or value.get("zh") or default)
    if value is None or value == "":
        return default
    return str(value)


def _metadata_template(meta: Dict[str, Any]) -> Any:
    template_key = meta.get("template_key")
    if template_key and template_key in TEMPLATES:
        return TEMPLATES[template_key]
    return None


def _main_parameter_rows(meta: Dict[str, Any], limit: int = 10) -> List[Dict[str, Any]]:
    values = meta.get("values", {}) or {}
    design_summary = meta.get("design_summary", {}) or {}
    labels = design_summary.get("field_labels", {}) or {}
    skip = {"strategy_name", "class_name", "export_plot_config"}
    priority = ["timeframe", "minimal_roi", "stoploss"]
    ordered = []
    for key in priority:
        if key in values:
            ordered.append(key)
    for key in values:
        if key not in skip and key not in ordered:
            ordered.append(key)
    rows: List[Dict[str, Any]] = []
    for key in ordered[:limit]:
        label = labels.get(key, {})
        rows.append({
            "name": key,
            "label": label or {"en": key, "zh": key},
            "value": values.get(key),
            "explanation": _parameter_review_explanation(key),
        })
    return rows


def _parameter_review_explanation(name: str) -> Dict[str, str]:
    n = name.lower()
    if n == "timeframe":
        return {"zh": "定义策略使用的 K 线周期；更短周期通常更敏感但更嘈杂。", "en": "Defines the candle timeframe; shorter timeframes are usually more reactive and noisier."}
    if "stoploss" in n:
        return {"zh": "控制基础下行保护边界；过紧可能提前退出，过宽会增加单次风险暴露。", "en": "Controls the basic downside boundary; tighter values may exit early, wider values increase single-trade exposure."}
    if "roi" in n:
        return {"zh": "控制基础收益退出目标；过高可能让退出更难触发。", "en": "Controls the basic profit-taking target; very high values may make exits harder to trigger."}
    if any(k in n for k in ["fast", "short", "entry_fast"]):
        return {"zh": "通常控制信号反应速度；数值越小越敏感，但噪声更多。", "en": "Usually controls reaction speed; smaller values react faster but add more noise."}
    if any(k in n for k in ["slow", "long", "trend", "macro"]):
        return {"zh": "通常控制趋势平滑程度；数值越大越稳定，但反应更慢。", "en": "Usually controls trend smoothness; larger values are steadier but slower."}
    if "rsi" in n:
        return {"zh": "控制动量或回调过滤严格程度；阈值过窄容易让信号过度选择。", "en": "Controls momentum or pullback strictness; overly narrow thresholds can make signals too selective."}
    if "adx" in n:
        return {"zh": "控制趋势强度确认；阈值越高，入场通常越严格。", "en": "Controls trend-strength confirmation; higher thresholds usually make entries stricter."}
    if "volume" in n:
        return {"zh": "控制成交量/参与度确认；过高阈值可能显著减少入场。", "en": "Controls volume/participation confirmation; high thresholds may greatly reduce entries."}
    if any(k in n for k in ["atr", "volatility", "bandwidth"]):
        return {"zh": "控制波动率过滤或保护性退出；需要和 timeframe 一起审阅。", "en": "Controls volatility filtering or protective exits; review together with timeframe."}
    if any(k in n for k in ["score", "weight", "confirmations"]):
        return {"zh": "控制多条件组合的严格程度；条件越多，策略越可能变得选择性很强。", "en": "Controls strictness of combined conditions; more filters can make the strategy highly selective."}
    return {"zh": "这是生成策略逻辑的一部分；修改后建议重新审阅入场和退出说明。", "en": "Part of the generated strategy logic; review entry and exit explanations after changing it."}


def _review_markdown(filename: str, review: Dict[str, Any]) -> str:
    lines = [
        f"# Strategy Review Report: {filename}",
        "",
        "This report is a design-level review only. It does not contain backtest results, trading advice, execution logic, or performance claims.",
        "",
        "## 1. Strategy Purpose",
        review.get("strategy_purpose", {}).get("en", "-"),
        "",
        "## 2. Market Assumption",
        review.get("market_assumption", {}).get("en", "-"),
        "",
        "## 3. Entry Logic",
        review.get("entry_logic", {}).get("en", "-"),
        "",
        "## 4. Exit Logic",
        review.get("exit_logic", {}).get("en", "-"),
        "",
        "## 5. Risk Logic",
        review.get("risk_logic", {}).get("en", "-"),
        "",
        "## 6. Main Parameters",
    ]
    for row in review.get("main_parameters", []):
        label = _local_text(row.get("label"), "en", row.get("name", "-"))
        explanation = _local_text(row.get("explanation"), "en", "-")
        lines.append(f"- **{row.get('name')}** ({label}) = `{row.get('value')}` — {explanation}")
    lines.extend(["", "## 7. Design Strengths"])
    for item in review.get("design_strengths", []):
        lines.append(f"- {item.get('en', item)}")
    lines.extend(["", "## 8. Design Risks / Things to Watch"])
    for item in review.get("design_risks", []):
        lines.append(f"- {item.get('en', item)}")
    if review.get("literature_references"):
        lines.extend(["", "## 9. Literature References"])
        for ref in review.get("literature_references", []):
            title = ref.get("title", "-")
            authors = ref.get("authors", "")
            year = ref.get("year", "")
            venue = ref.get("venue", "")
            url = ref.get("url", "")
            lines.append(f"- **{title}** — {authors} ({year}), {venue}. {url}".strip())
        if review.get("literature_explanation"):
            lines.extend(["", "Research-inspired explanation:", review.get("literature_explanation", {}).get("en", "-")])
        if review.get("literature_implementation_note"):
            lines.extend(["", "Implementation note:", review.get("literature_implementation_note", {}).get("en", "-")])
    lines.extend(["", "## 10. Documentation Notes"])
    notes = review.get("documentation_notes", {}) or {}
    lines.append(f"- Research note: {notes.get('research_note') or '-'}")
    lines.append(f"- Change note: {notes.get('change_note') or '-'}")
    lines.append(f"- External testing note: {notes.get('external_testing_note') or '-'}")
    lines.extend(["", "## 11. Suggested Review Before External Testing"])
    for item in review.get("external_review_checklist", []):
        lines.append(f"- {item.get('en', item)}")
    lines.extend(["", "## Scope Reminder", "Generated by Strategy Builder for strategy-file development only. Use a separate application for any backtest, simulation, or trading workflow."])
    return "\n".join(lines).strip() + "\n"


def build_strategy_review_report(filename: str, output_dir: str) -> Dict[str, Any]:
    """Build a design-level review report from saved metadata without running a backtest."""
    path = _strategy_path(filename, output_dir, must_exist=True)
    meta = _read_meta_strict(filename, output_dir)
    if not meta:
        review = {
            "strategy_purpose": {"zh": "该文件没有 Strategy Builder metadata，无法生成完整设计审阅。", "en": "This file has no Strategy Builder metadata, so a full design review cannot be built."},
            "market_assumption": {"zh": "未知", "en": "Unknown"},
            "entry_logic": {"zh": "请直接审阅代码。", "en": "Review the source code directly."},
            "exit_logic": {"zh": "请直接审阅代码。", "en": "Review the source code directly."},
            "risk_logic": {"zh": "请直接审阅代码。", "en": "Review the source code directly."},
            "main_parameters": [],
            "design_strengths": [],
            "design_risks": [{"zh": "缺少 metadata。", "en": "Missing metadata."}],
            "documentation_notes": {},
            "external_review_checklist": [{"zh": "在外部系统测试前，先确认代码来源和策略逻辑。", "en": "Confirm source and logic before external testing."}],
        }
        return {"review": review, "markdown": _review_markdown(filename, review)}

    summary = meta.get("design_summary", {}) or {}
    template_label = _local_text(meta.get("template_label"), "en", meta.get("template_key", "strategy"))
    entry_logic = summary.get("entry_logic") or (summary.get("guided_card", {}) or {}).get("entry_idea") or meta.get("strategy_draft_notes")
    exit_logic = summary.get("exit_logic") or (summary.get("guided_card", {}) or {}).get("exit_idea")
    risk_logic = summary.get("risk_logic") or {"zh": f"使用 stoploss={meta.get('values', {}).get('stoploss')} 与 minimal_roi={meta.get('values', {}).get('minimal_roi')}。", "en": f"Uses stoploss={meta.get('values', {}).get('stoploss')} and minimal_roi={meta.get('values', {}).get('minimal_roi')}."}
    market_assumption = summary.get("suitable_market") or summary.get("market_assumption") or {"zh": meta.get("market_regime", "-"), "en": meta.get("market_regime", "-")}
    weaknesses = summary.get("weakness") or summary.get("overfit_notes") or {"zh": "生成文件仍需外部审阅。", "en": "The generated file still needs external review."}
    warnings = meta.get("warnings", []) or []
    strengths = [
        {"zh": "策略文件包含明确的模板来源、参数和版本 metadata。", "en": "The strategy file includes clear template, parameter, and version metadata."},
        {"zh": "入场、退出与风险层说明可用于外部测试前的设计审阅。", "en": "Entry, exit, and risk notes can guide design review before external testing."},
    ]
    if summary.get("confirmation_layers"):
        strengths.append({"zh": "该策略包含可解释的确认层。", "en": "The strategy includes explicit confirmation layers."})
    risks = [weaknesses if isinstance(weaknesses, dict) else {"zh": str(weaknesses), "en": str(weaknesses)}]
    for w in warnings[:6]:
        risks.append({"zh": str(w), "en": str(w)})
    review = {
        "strategy_purpose": {
            "zh": f"{template_label} 生成的策略草稿，用于策略开发与外部测试前准备。",
            "en": f"A strategy-development draft generated from {template_label}, intended for preparation before external testing.",
        },
        "market_assumption": market_assumption,
        "entry_logic": entry_logic,
        "exit_logic": exit_logic,
        "risk_logic": risk_logic,
        "main_parameters": _main_parameter_rows(meta),
        "design_strengths": strengths,
        "design_risks": risks,
        "documentation_notes": meta.get("documentation_notes", {}) or {},
        "literature_references": summary.get("literature_references", []) or [],
        "literature_explanation": summary.get("literature_explanation", {}) or {},
        "literature_implementation_note": summary.get("literature_implementation_note", {}) or {},
        "design_checklist": meta.get("design_checklist", []) or [],
        "external_review_checklist": [
            {"zh": "确认入场逻辑可以用一句话解释。", "en": "Confirm the entry logic can be explained in one sentence."},
            {"zh": "确认退出逻辑和风险边界没有互相冲突。", "en": "Confirm exit logic and risk boundaries do not conflict."},
            {"zh": "一次只改少数几个参数，避免无法解释版本差异。", "en": "Change only a few parameters at a time so version differences remain explainable."},
            {"zh": "在单独的外部应用中进行回测或使用；本包不执行这些步骤。", "en": "Use a separate external application for backtesting or usage; this package does not perform those steps."},
        ],
        "scope": {
            "zh": "仅设计审阅；不包含收益、夏普、回撤、信号表现或交易建议。",
            "en": "Design review only; no return, Sharpe, drawdown, signal performance, or trading advice is included.",
        },
    }
    return {"review": review, "markdown": _review_markdown(filename, review)}


def update_strategy_documentation(filename: str, output_dir: str, documentation_notes: Dict[str, str]) -> Dict[str, Any]:
    """Save user-editable documentation notes into the sidecar metadata file."""
    with _WRITE_LOCK:
        _strategy_path(filename, output_dir, must_exist=True)
        meta = _read_meta_strict(filename, output_dir)
        existing = dict(meta.get("documentation_notes", {}) or {})
        for key in ["research_note", "change_note", "external_testing_note"]:
            existing[key] = str(documentation_notes.get(key, existing.get(key, "")) or "").strip()[:12000]
        existing["updated_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        meta["documentation_notes"] = existing
        meta_path = sidecar_path(filename, output_dir)
        _atomic_write_text(meta_path, json.dumps(meta, ensure_ascii=False, indent=2))
        return {"metadata": meta, "documentation_notes": existing}


def list_strategies(output_dir: str) -> List[StrategyFileInfo]:
    out = Path(output_dir).resolve()
    out.mkdir(parents=True, exist_ok=True)
    rows: List[StrategyFileInfo] = []
    for path in sorted(out.glob("*.py"), key=lambda p: p.name.lower()):
        if path.is_symlink() or not path.is_file():
            continue
        meta = _read_meta(path.name, output_dir)
        template_key = meta.get("template_key")
        template_label = None
        if template_key and template_key in TEMPLATES:
            template_label = TEMPLATES[template_key].label
        base_name, version = parse_base_and_version(path.stem)
        audit = meta.get("template_quality_audit", {}) or {}
        curation = meta.get("curation", {}) if isinstance(meta.get("curation", {}), dict) else {}
        curation = {**_default_curation(meta), **curation}
        rows.append(
            StrategyFileInfo(
                filename=path.name,
                class_name=path.stem,
                size_bytes=path.stat().st_size,
                updated_at=path.stat().st_mtime,
                base_name=meta.get("base_name") or base_name,
                version=meta.get("version") or version,
                template_key=template_key,
                template_label=template_label,
                notes=meta.get("notes"),
                builder_version=meta.get("builder_version"),
                market_regime=meta.get("market_regime"),
                risk_level=meta.get("risk_level"),
                strategy_mode=meta.get("strategy_mode"),
                design_clarity=audit.get("design_clarity"),
                recommended_user_level=audit.get("recommended_user_level"),
                draft_note=meta.get("strategy_draft_notes"),
                documentation_notes=meta.get("documentation_notes"),
                curation_status=curation.get("curation_status"),
                review_status=curation.get("review_status"),
                library_tags=curation.get("library_tags") or [],
                curation_note=curation.get("curation_note"),
                archived=bool(curation.get("archived")),
            )
        )
    rows.sort(key=lambda x: x.updated_at, reverse=True)
    return rows


def versions_for(base_name: str, output_dir: str) -> List[VersionInfo]:
    out = Path(output_dir).resolve()
    items: List[VersionInfo] = []
    for py in out.glob("*.py"):
        if py.is_symlink() or not py.is_file():
            continue
        stem = py.stem
        b, v = parse_base_and_version(stem)
        meta = _read_meta(py.name, output_dir)
        if (meta.get("base_name") or b) != base_name:
            continue
        template_key = meta.get("template_key")
        template_label = None
        if template_key and template_key in TEMPLATES:
            template_label = TEMPLATES[template_key].label
        items.append(
            VersionInfo(
                base_name=base_name,
                version=meta.get("version") or v,
                filename=py.name,
                template_key=template_key,
                template_label=template_label,
                notes=meta.get("notes"),
                updated_at=py.stat().st_mtime,
                metadata_path=str(sidecar_path(py.name, output_dir)),
            )
        )
    items.sort(key=lambda x: x.version)
    return items


def delete_strategy(filename: str, output_dir: str) -> bool:
    with _WRITE_LOCK:
        path = _strategy_path(filename, output_dir)
        if not path.exists():
            return False
        # Resolve and validate the sidecar before deleting the source. This
        # prevents a malicious metadata symlink from causing a half-delete.
        meta_path = sidecar_path(filename, output_dir)
        old_code = _read_text_limited(path, max_bytes=MAX_STRATEGY_SOURCE_BYTES, label="Strategy source")
        old_meta = _read_text_limited(meta_path, max_bytes=MAX_METADATA_BYTES, label="Strategy metadata") if meta_path.exists() else None
        source_deleted = False
        metadata_deleted = False
        try:
            path.unlink()
            source_deleted = True
            if meta_path.exists():
                meta_path.unlink()
                metadata_deleted = True
        except Exception:
            rollback_errors: List[str] = []
            try:
                if source_deleted and not path.exists():
                    _atomic_write_text(path, old_code, overwrite=False)
            except Exception as exc:
                rollback_errors.append(f"source: {exc}")
            try:
                if metadata_deleted and old_meta is not None and not meta_path.exists():
                    _atomic_write_text(meta_path, old_meta, overwrite=False)
            except Exception as exc:
                rollback_errors.append(f"metadata: {exc}")
            if rollback_errors:
                raise RuntimeError("Delete failed and rollback was incomplete: " + "; ".join(rollback_errors))
            raise
        return True
