from __future__ import annotations

import datetime as _dt
import hashlib
import ipaddress
import json
import math
import os
import re
import socket
import textwrap
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
from typing import Any, Dict, List, Mapping, Tuple

from app.config import get_settings
from app.services.file_manager import next_version, parse_base_and_version, write_strategy
from app.services.fs_browser import validate_output_dir

settings = get_settings()

_ALLOWED_EXTENSIONS = {".pdf", ".txt", ".md", ".markdown"}
_ALLOWED_FAMILIES = {"trend", "momentum", "reversal", "breakout", "volatility", "pairs", "carry", "microstructure", "hybrid"}
_TIMEFRAME_RE = re.compile(r"^[1-9][0-9]{0,3}[mhdwM]$")
_MODEL_RE = re.compile(r"^[A-Za-z0-9._~:/-]{1,160}$")
_GEMINI_MODEL_RE = re.compile(r"^[A-Za-z0-9._-]{1,100}$")


@dataclass(frozen=True)
class ProviderSpec:
    provider_id: str
    label: str
    protocol: str
    default_model: str
    endpoint: str
    description: str
    custom_base_url: bool = False


_PROVIDER_SPECS: Dict[str, ProviderSpec] = {
    "openai": ProviderSpec(
        "openai", "OpenAI", "openai_chat", "gpt-4o-mini",
        "https://api.openai.com/v1/chat/completions",
        "OpenAI Chat Completions with compact JSON output.",
    ),
    "deepseek": ProviderSpec(
        "deepseek", "DeepSeek", "openai_chat", "deepseek-v4-flash",
        "https://api.deepseek.com/chat/completions",
        "DeepSeek's OpenAI-compatible chat endpoint.",
    ),
    "kimi": ProviderSpec(
        "kimi", "Kimi (Moonshot)", "openai_chat", "kimi-k2.6",
        "https://api.moonshot.cn/v1/chat/completions",
        "Kimi API through Moonshot's OpenAI-compatible endpoint.",
    ),
    "anthropic": ProviderSpec(
        "anthropic", "Claude (Anthropic)", "anthropic_messages", "claude-sonnet-5",
        "https://api.anthropic.com/v1/messages",
        "Claude Messages API with Anthropic authentication headers.",
    ),
    "gemini": ProviderSpec(
        "gemini", "Gemini (Google)", "gemini_generate_content", "gemini-3.5-flash-lite",
        "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        "Google Gemini generateContent API with JSON response mode.",
    ),
    "openrouter": ProviderSpec(
        "openrouter", "OpenRouter", "openai_chat", "openrouter/auto-beta",
        "https://openrouter.ai/api/v1/chat/completions",
        "OpenRouter's unified OpenAI-compatible endpoint for many model families.",
    ),
    "custom": ProviderSpec(
        "custom", "Custom OpenAI-compatible", "openai_chat", "gpt-4o-mini", "",
        "A public HTTPS OpenAI-compatible chat-completions endpoint supplied by the user.",
        custom_base_url=True,
    ),
}
_PROVIDER_ALIASES = {
    "claude": "anthropic",
    "moonshot": "kimi",
    "google": "gemini",
    "open-router": "openrouter",
}
_ALLOWED_PROVIDERS = set(_PROVIDER_SPECS)


class AIProviderError(RuntimeError):
    """A safe, user-facing error returned when an external AI provider fails."""


class UnsafeEndpointError(ValueError):
    """Raised when a custom API endpoint could access private/internal infrastructure."""


def provider_catalog() -> List[Dict[str, Any]]:
    """Return non-secret provider metadata for the frontend and diagnostics."""
    return [
        {
            "id": spec.provider_id,
            "label": spec.label,
            "protocol": spec.protocol,
            "default_model": spec.default_model,
            "description": spec.description,
            "custom_base_url": spec.custom_base_url,
        }
        for spec in _PROVIDER_SPECS.values()
    ]


def _normalize_provider(provider: str) -> str:
    value = (provider or "openai").strip().lower()
    value = _PROVIDER_ALIASES.get(value, value)
    if value not in _ALLOWED_PROVIDERS:
        raise ValueError("Unsupported AI provider. Choose OpenAI, DeepSeek, Kimi, Claude, Gemini, OpenRouter, or Custom.")
    return value


def _normalize_model(provider: str, model: str | None) -> str:
    spec = _PROVIDER_SPECS[provider]
    value = (model or "").strip() or spec.default_model
    if provider == "gemini":
        if value.startswith("models/"):
            value = value[len("models/"):]
        if not _GEMINI_MODEL_RE.fullmatch(value):
            raise ValueError("Gemini model names may contain only letters, numbers, dots, underscores, and hyphens.")
    elif not _MODEL_RE.fullmatch(value):
        raise ValueError("The model name contains unsupported characters.")
    return value


def sanitize_identifier(value: str, fallback: str = "AIPaperStrategy") -> str:
    value = str(value or "").strip()
    parts = [p for p in re.split(r"[^0-9A-Za-z_]+", value) if p]
    raw = "".join(p[:1].upper() + p[1:] for p in parts) if len(parts) > 1 else re.sub(r"[^0-9A-Za-z_]", "", value)
    raw = raw or fallback
    if raw[0].isdigit():
        raw = f"AI{raw}"
    return raw[:72]


def _decode_text_bytes(data: bytes) -> str:
    for encoding in ("utf-8", "utf-8-sig", "utf-16", "latin-1"):
        try:
            return data.decode(encoding)
        except (UnicodeDecodeError, LookupError):
            continue
    return data.decode("utf-8", errors="ignore")


def _extract_text_from_pdf(data: bytes, *, max_pages: int = 120, max_chars: int = 1_500_000) -> str:
    """Extract born-digital PDF text with the vendored pypdf package.

    OCR is intentionally not performed. Page and character limits keep memory bounded.
    """
    try:
        from pypdf import PdfReader
    except ImportError as exc:  # pragma: no cover - diagnostics catches this at runtime
        raise ValueError("PDF support is unavailable in this installation. Upload a .txt or .md copy instead.") from exc

    try:
        reader = PdfReader(BytesIO(data), strict=False)
        if reader.is_encrypted:
            try:
                unlocked = reader.decrypt("")
            except Exception as exc:
                raise ValueError("Password-protected PDFs are not supported. Upload an unlocked PDF or text copy.") from exc
            if not unlocked:
                raise ValueError("Password-protected PDFs are not supported. Upload an unlocked PDF or text copy.")
        page_count = min(len(reader.pages), max_pages)
    except ValueError:
        raise
    except Exception as exc:
        raise ValueError("The PDF could not be read. Upload a valid born-digital PDF or a TXT/Markdown copy.") from exc

    chunks: List[str] = []
    total = 0
    for index in range(page_count):
        try:
            page_text = reader.pages[index].extract_text() or ""
        except Exception:
            page_text = ""
        if page_text:
            chunks.append(page_text)
            total += len(page_text)
        if total >= max_chars:
            break
    return "\n".join(chunks)[:max_chars].strip()


def extract_paper_text(filename: str, content: bytes) -> Tuple[str, List[str]]:
    warnings: List[str] = []
    suffix = Path(filename or "").suffix.lower()
    if suffix not in _ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported paper type. Upload a PDF, TXT, MD, or MARKDOWN file.")
    if suffix == ".pdf":
        text = _extract_text_from_pdf(content)
        if len(text) < 1500:
            warnings.append("PDF text extraction was limited. The PDF may be scanned or heavily encoded; a text/Markdown copy will work better.")
        return text, warnings
    return _decode_text_bytes(content), warnings


def compact_paper_text(text: str, max_chars: int) -> str:
    """Select strategy-relevant text locally so the provider receives fewer tokens."""
    max_chars = int(max(2500, min(max_chars or 10000, 22000)))
    clean = re.sub(r"\r", "\n", text or "")
    lines = [re.sub(r"\s+", " ", line).strip() for line in clean.splitlines()]
    lines = [line for line in lines if len(line) >= 18]
    joined = "\n".join(lines)
    reference = re.search(r"\n\s*(References|Bibliography)\s*\n", joined, flags=re.I)
    if reference and reference.start() > 1000:
        joined = joined[: reference.start()]

    keywords = (
        "abstract", "strategy", "trading", "backtest", "portfolio", "signal", "predict", "return",
        "method", "model", "data", "risk", "transaction cost", "entry", "exit", "momentum", "reversal",
        "spread", "volatility", "liquidity", "factor", "threshold", "position", "weight", "result",
        "摘要", "策略", "交易", "回测", "投资组合", "信号", "预测", "收益", "方法", "模型", "数据",
        "风险", "交易成本", "入场", "退出", "动量", "反转", "价差", "波动", "流动性", "因子",
        "阈值", "仓位", "权重", "结果", "止损", "持仓", "样本外", "实证", "结论",
    )
    selected: List[str] = []
    selected_chars = 0
    for line in lines:
        if any(keyword in line.lower() for keyword in keywords):
            selected.append(line)
            selected_chars += len(line) + 1
        if selected_chars >= max_chars * 0.72:
            break
    if selected_chars < min(max_chars * 0.35, 2500):
        compact = joined
    else:
        compact = joined[: min(2600, max_chars // 4)] + "\n\n" + "\n".join(selected)
    return compact[:max_chars]


def _is_public_ip(value: str) -> bool:
    ip = ipaddress.ip_address(value)
    return not (
        ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_multicast
        or ip.is_reserved or ip.is_unspecified
    )


def _validate_custom_endpoint(base_url: str) -> str:
    url = str(base_url or "").strip().rstrip("/")
    if not url or len(url) > 2048:
        raise UnsafeEndpointError("The custom API endpoint is invalid or too long.")
    parsed = urllib.parse.urlparse(url)
    if parsed.query or parsed.fragment:
        raise UnsafeEndpointError("Custom API endpoints must not contain query strings or URL fragments.")
    allow_insecure = os.getenv("ALLOW_INSECURE_AI_ENDPOINTS", "false").lower() in {"1", "true", "yes"}
    if parsed.scheme not in ({"https", "http"} if allow_insecure else {"https"}):
        raise UnsafeEndpointError("Custom API endpoints must use HTTPS. Insecure HTTP endpoints are disabled by default.")
    if not parsed.hostname or parsed.username or parsed.password:
        raise UnsafeEndpointError("The custom API endpoint is invalid.")
    try:
        addresses = {
            item[4][0]
            for item in socket.getaddrinfo(
                parsed.hostname,
                parsed.port or (443 if parsed.scheme == "https" else 80),
                type=socket.SOCK_STREAM,
            )
        }
    except socket.gaierror as exc:
        raise UnsafeEndpointError("The custom API hostname could not be resolved.") from exc
    if not addresses or any(not _is_public_ip(address) for address in addresses):
        raise UnsafeEndpointError("Private, loopback, link-local, and reserved custom API endpoints are blocked.")
    if url.endswith("/chat/completions"):
        return url
    if url.endswith("/v1"):
        return f"{url}/chat/completions"
    return f"{url}/v1/chat/completions"


def _build_prompt(compact_text: str) -> Tuple[str, str]:
    system_prompt = (
        "You extract compact trading-strategy blueprints. Return one JSON object only, without Markdown. "
        "Do not claim performance. When exact paper data is unavailable to Freqtrade, describe a conservative OHLCV proxy and state the limitation."
    )
    user_prompt = (
        "Extract one practical strategy blueprint from this paper excerpt. Use exactly these keys: "
        "strategy_name, class_name, family, short_description, paper_idea, data_required, timeframe, "
        "indicators, entry_rules, exit_rules, risk_rules, freqtrade_proxy_warning, parameters. "
        "family must be trend, momentum, reversal, breakout, volatility, pairs, carry, microstructure, or hybrid. "
        "parameters may contain fast_window, slow_window, rsi_buy, rsi_sell, breakout_window, atr_window, stoploss, roi. "
        "Keep every field short and return valid JSON only.\n\nPAPER_EXCERPT:\n" + compact_text
    )
    return system_prompt, user_prompt


def build_provider_request(
    *, provider: str, api_key: str, model: str, base_url: str | None,
    compact_text: str, max_output_tokens: int, temperature: float,
) -> Tuple[str, Dict[str, str], Dict[str, Any], str, str, str]:
    """Build a provider-specific request without sending it.

    Returns endpoint, headers, JSON payload, response protocol, normalized provider, normalized model.
    Keeping this pure makes every adapter testable without live API credentials.
    """
    key = (api_key or "").strip()
    if not key:
        raise ValueError("API key is required. It is used only for this request and is not saved.")
    if len(key) > 4096 or "\r" in key or "\n" in key:
        raise ValueError("The API key is invalid or too long.")
    provider_id = _normalize_provider(provider)
    spec = _PROVIDER_SPECS[provider_id]
    model_id = _normalize_model(provider_id, model)
    max_tokens = int(max(300, min(int(max_output_tokens), 1600)))
    raw_temp = float(temperature)
    temp = float(max(0.0, min(raw_temp, 1.0))) if math.isfinite(raw_temp) else 0.2
    system_prompt, user_prompt = _build_prompt(compact_text)

    if provider_id == "custom":
        if not base_url:
            raise ValueError("A base URL is required for a custom OpenAI-compatible provider.")
        endpoint = _validate_custom_endpoint(base_url)
    elif provider_id == "gemini":
        endpoint = spec.endpoint.format(model=urllib.parse.quote(model_id, safe="-._"))
    else:
        endpoint = spec.endpoint

    if spec.protocol == "anthropic_messages":
        headers = {
            "Content-Type": "application/json",
            "x-api-key": key,
            "anthropic-version": "2023-06-01",
        }
        payload = {
            "model": model_id,
            "max_tokens": max_tokens,
            "system": system_prompt,
            "messages": [{"role": "user", "content": user_prompt}],
        }
        # Claude Sonnet 5 enables adaptive thinking by default. AI Paper Lab
        # needs only a compact JSON extraction, so disable thinking to reduce
        # latency and output-token usage for the current default model.
        if model_id.lower().startswith("claude-sonnet-5"):
            payload["thinking"] = {"type": "disabled"}
    elif spec.protocol == "gemini_generate_content":
        headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
        }
        payload = {
            "systemInstruction": {"parts": [{"text": system_prompt}]},
            "contents": [{"role": "user", "parts": [{"text": user_prompt}]}],
            "generationConfig": {
                "maxOutputTokens": max_tokens,
                "responseMimeType": "application/json",
                # Gemini 3.x supports thinkingLevel. Minimal is sufficient for
                # extracting a compact schema and reduces unnecessary tokens.
                "thinkingConfig": {"thinkingLevel": "minimal"},
            },
        }
    else:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {key}",
        }
        if provider_id == "openrouter":
            headers["X-OpenRouter-Title"] = "Strategy Builder AI Paper Lab"
        payload = {
            "model": model_id,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": temp,
            "max_tokens": max_tokens,
        }
        # Current reasoning-model APIs do not all accept sampling parameters.
        # Omit them for known model families and use the provider-specific token key.
        if provider_id == "openai" and model_id.lower().startswith(("gpt-5", "o1", "o3", "o4")):
            payload.pop("temperature", None)
            payload["max_completion_tokens"] = payload.pop("max_tokens")
        if provider_id == "deepseek" and model_id.lower().startswith("deepseek-v4-"):
            # DeepSeek V4 defaults to thinking mode. This task only needs a
            # compact extraction, so explicitly disable it to save tokens.
            payload["thinking"] = {"type": "disabled"}
        if provider_id == "kimi" and model_id.lower() in {"kimi-k2.5", "kimi-k2.6"}:
            payload.pop("temperature", None)
            payload["thinking"] = {"type": "disabled"}
        if provider_id == "openai":
            payload["response_format"] = {"type": "json_object"}

    return endpoint, headers, payload, spec.protocol, provider_id, model_id


def _provider_request(
    endpoint: str,
    headers: Mapping[str, str],
    payload: Dict[str, Any],
    *,
    validate_public_endpoint: bool = False,
) -> Dict[str, Any]:
    """Send one bounded, non-redirecting provider request.

    Redirects are deliberately blocked. For a custom endpoint, DNS/public-IP
    validation is repeated immediately before connection to reduce TOCTOU and
    DNS-rebinding exposure. API keys are held only in the in-memory request.
    """
    if validate_public_endpoint:
        endpoint = _validate_custom_endpoint(endpoint)

    request = urllib.request.Request(
        endpoint,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        method="POST",
        headers=dict(headers),
    )

    class _NoRedirectHandler(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, hdrs, newurl):  # noqa: ANN001
            return None

    opener = urllib.request.build_opener(_NoRedirectHandler())
    max_response_bytes = 2_000_000
    try:
        with opener.open(request, timeout=90) as response:
            raw = response.read(max_response_bytes + 1)
            if len(raw) > max_response_bytes:
                raise AIProviderError("The AI provider response exceeded the 2 MB safety limit.")
            body = raw.decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        if 300 <= exc.code < 400:
            raise AIProviderError("The AI provider attempted an HTTP redirect, which is blocked for safety.") from exc
        raise AIProviderError(
            f"The AI provider rejected the request (HTTP {exc.code}). "
            "Check the API key, model, endpoint, and account limits."
        ) from exc
    except urllib.error.URLError as exc:
        raise AIProviderError("The AI provider could not be reached. Check DNS, network access, and the endpoint URL.") from exc
    except (TimeoutError, socket.timeout) as exc:
        raise AIProviderError("The AI provider request timed out.") from exc
    try:
        parsed = json.loads(body)
    except json.JSONDecodeError as exc:
        raise AIProviderError("The AI provider returned a non-JSON response.") from exc
    if not isinstance(parsed, dict):
        raise AIProviderError("The AI provider returned an unexpected response format.")
    return parsed


def _normalize_usage(usage: Any) -> Dict[str, int | float]:
    """Persist token counters only, never arbitrary provider response metadata."""
    if not isinstance(usage, dict):
        return {}
    normalized: Dict[str, int | float] = {}
    for raw_key, raw_value in usage.items():
        key = str(raw_key)
        if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_]{0,63}", key):
            continue
        if "token" not in key.lower():
            continue
        if isinstance(raw_value, bool) or not isinstance(raw_value, (int, float)):
            continue
        value = float(raw_value)
        if not math.isfinite(value) or value < 0 or value > 1_000_000_000_000:
            continue
        normalized[key] = int(value) if value.is_integer() else value
        if len(normalized) >= 24:
            break
    return normalized


def _extract_provider_content(response: Dict[str, Any], protocol: str) -> Tuple[str, Dict[str, Any]]:
    try:
        if protocol == "anthropic_messages":
            blocks = response.get("content", [])
            content = "".join(str(block.get("text", "")) for block in blocks if isinstance(block, dict) and block.get("type") == "text")
            usage = response.get("usage", {})
        elif protocol == "gemini_generate_content":
            candidates = response.get("candidates", [])
            parts = candidates[0].get("content", {}).get("parts", [])
            content = "".join(str(part.get("text", "")) for part in parts if isinstance(part, dict))
            usage = response.get("usageMetadata", {})
        else:
            content = response.get("choices", [{}])[0].get("message", {}).get("content", "")
            usage = response.get("usage", {})
    except (AttributeError, IndexError, TypeError) as exc:
        raise AIProviderError("The AI provider returned an unexpected response format.") from exc
    if not isinstance(content, str) or not content.strip():
        raise AIProviderError("The AI provider returned no usable text content.")
    return content, _normalize_usage(usage)


def call_ai_provider(
    *, provider: str, api_key: str, model: str, base_url: str | None,
    compact_text: str, max_output_tokens: int, temperature: float = 0.2,
) -> Tuple[Dict[str, Any], Dict[str, Any], str, str]:
    endpoint, headers, payload, protocol, provider_id, model_id = build_provider_request(
        provider=provider, api_key=api_key, model=model, base_url=base_url,
        compact_text=compact_text, max_output_tokens=max_output_tokens, temperature=temperature,
    )
    response = _provider_request(endpoint, headers, payload, validate_public_endpoint=(provider_id == "custom"))
    content, usage = _extract_provider_content(response, protocol)
    return parse_blueprint(content), usage, provider_id, model_id


def call_openai_compatible_api(
    *, provider: str, api_key: str, model: str, base_url: str | None,
    compact_text: str, max_output_tokens: int, temperature: float = 0.2,
) -> Dict[str, Any]:
    """Backward-compatible wrapper retained for integrations using the old helper."""
    blueprint, _, _, _ = call_ai_provider(
        provider=provider, api_key=api_key, model=model, base_url=base_url,
        compact_text=compact_text, max_output_tokens=max_output_tokens, temperature=temperature,
    )
    return blueprint


def parse_blueprint(content: str) -> Dict[str, Any]:
    raw = re.sub(r"^```(?:json)?\s*", "", (content or "").strip(), flags=re.I)
    raw = re.sub(r"\s*```$", "", raw).strip()
    decoder = json.JSONDecoder()
    candidates = [0] + [index for index, char in enumerate(raw) if char == "{"]
    seen = set()
    for start in candidates:
        if start in seen:
            continue
        seen.add(start)
        try:
            obj, _ = decoder.raw_decode(raw[start:])
        except json.JSONDecodeError:
            continue
        if isinstance(obj, dict):
            return normalize_blueprint(obj)
    raise ValueError("The AI response was not a valid JSON object. Try a shorter excerpt or another model.")


def _safe_text(value: Any, limit: int, default: str = "") -> str:
    if isinstance(value, list):
        value = "; ".join(str(item) for item in value[:6])
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", " ", str(value or default))
    text = text.replace("\u2028", " ").replace("\u2029", " ")
    return re.sub(r"\s+", " ", text).strip()[:limit]


def _safe_docstring(value: Any, limit: int) -> str:
    # AI-supplied text is embedded inside generated Python docstrings. Escape
    # backslashes first so sequences such as ``\xZZ`` or ``\uZZZZ`` remain
    # literal text instead of becoming invalid Python string escapes.
    return _safe_text(value, limit).replace("\\", "\\\\").replace('"""', "'''")


def normalize_blueprint(obj: Dict[str, Any]) -> Dict[str, Any]:
    family = _safe_text(obj.get("family"), 30, "hybrid").lower()
    if family not in _ALLOWED_FAMILIES:
        family = "hybrid"
    name = _safe_text(obj.get("strategy_name") or obj.get("class_name"), 90, "AI Paper Strategy")
    class_name = sanitize_identifier(obj.get("class_name") or name, "AIPaperStrategy")
    if not class_name.lower().endswith("strategy"):
        class_name += "Strategy"
    parameters = obj.get("parameters") if isinstance(obj.get("parameters"), dict) else {}

    def number(key: str, default: float) -> float:
        try:
            value = float(parameters.get(key, default))
        except (TypeError, ValueError, OverflowError):
            return default
        return value if math.isfinite(value) else default

    def list_text(key: str) -> List[str]:
        value = obj.get(key, [])
        items = value if isinstance(value, list) else [value] if isinstance(value, str) else []
        return [_safe_text(item, 180) for item in items if _safe_text(item, 180)][:8]

    timeframe = _safe_text(obj.get("timeframe"), 12, "15m")
    if not _TIMEFRAME_RE.fullmatch(timeframe):
        timeframe = "15m"
    normalized = {
        "strategy_name": name,
        "class_name": class_name,
        "family": family,
        "short_description": _safe_text(obj.get("short_description"), 500, "AI-generated strategy blueprint from an uploaded paper."),
        "paper_idea": _safe_text(obj.get("paper_idea"), 800, "Extracted from the uploaded paper."),
        "data_required": _safe_text(obj.get("data_required"), 500, "OHLCV candles unless the paper requires specialized data."),
        "timeframe": timeframe,
        "indicators": list_text("indicators") or ["EMA", "RSI", "ATR", "Volume"],
        "entry_rules": list_text("entry_rules") or ["Use the locally generated proxy entry condition for the detected family."],
        "exit_rules": list_text("exit_rules") or ["Exit on signal reversal, overextension, or a risk rule."],
        "risk_rules": list_text("risk_rules") or ["Use a stop loss and avoid illiquid candles."],
        "freqtrade_proxy_warning": _safe_text(obj.get("freqtrade_proxy_warning"), 700, "This is a Freqtrade-compatible proxy, not a performance replication of the paper."),
        "parameters": {
            "fast_window": int(max(3, min(number("fast_window", 21), 100))),
            "slow_window": int(max(10, min(number("slow_window", 89), 300))),
            "rsi_buy": int(max(5, min(number("rsi_buy", 35), 60))),
            "rsi_sell": int(max(45, min(number("rsi_sell", 65), 95))),
            "breakout_window": int(max(10, min(number("breakout_window", 40), 200))),
            "atr_window": int(max(5, min(number("atr_window", 14), 60))),
            "stoploss": float(max(-0.35, min(number("stoploss", -0.08), -0.01))),
            "roi": float(max(0.005, min(number("roi", 0.03), 0.25))),
        },
    }
    if normalized["parameters"]["slow_window"] <= normalized["parameters"]["fast_window"]:
        normalized["parameters"]["slow_window"] = min(300, normalized["parameters"]["fast_window"] + 5)
    return normalized


def _list_comment(items: List[str]) -> str:
    return "\n".join(f"# - {_safe_text(item, 180)}" for item in (items or ["Not specified"])[:8])


def build_strategy_code(blueprint: Dict[str, Any]) -> str:
    blueprint = normalize_blueprint(blueprint)
    cls = blueprint["class_name"]
    parameters = blueprint["parameters"]
    fast = parameters["fast_window"]
    slow = parameters["slow_window"]
    rsi_buy = parameters["rsi_buy"]
    rsi_sell = parameters["rsi_sell"]
    breakout = parameters["breakout_window"]
    atr = parameters["atr_window"]
    stoploss = parameters["stoploss"]
    roi = parameters["roi"]
    timeframe = blueprint["timeframe"]
    family = blueprint["family"]

    if family in {"reversal", "pairs"}:
        entry_condition = f"(dataframe['close'] < dataframe['bb_lower']) & (dataframe['rsi'] < {rsi_buy}) & (dataframe['volume'] > 0)"
        exit_condition = f"(dataframe['close'] > dataframe['bb_mid']) | (dataframe['rsi'] > {rsi_sell}) | (dataframe['ema_fast'] < dataframe['ema_slow'])"
    elif family == "breakout":
        entry_condition = "(dataframe['close'] > dataframe['breakout_high']) & (dataframe['volume'] > dataframe['volume_ma']) & (dataframe['ema_fast'] > dataframe['ema_slow'])"
        exit_condition = f"(dataframe['close'] < dataframe['ema_fast']) | (dataframe['rsi'] > {min(rsi_sell + 5, 95)})"
    elif family == "volatility":
        entry_condition = "(dataframe['bb_width'] < dataframe['bb_width_ma']) & (dataframe['close'] > dataframe['bb_mid']) & (dataframe['volume'] > dataframe['volume_ma'])"
        exit_condition = "(dataframe['close'] < dataframe['bb_mid']) | (dataframe['ema_fast'] < dataframe['ema_slow'])"
    else:
        entry_condition = "(dataframe['ema_fast'] > dataframe['ema_slow']) & (dataframe['rsi'] > 50) & (dataframe['volume'] > dataframe['volume_ma'])"
        exit_condition = f"(dataframe['ema_fast'] < dataframe['ema_slow']) | (dataframe['rsi'] > {rsi_sell})"

    description = _safe_docstring(blueprint["short_description"], 700)
    idea = _safe_docstring(blueprint["paper_idea"], 900)
    data_required = _safe_docstring(blueprint["data_required"], 500)
    warning = _safe_docstring(blueprint["freqtrade_proxy_warning"], 800)

    return f'''from freqtrade.strategy import IStrategy
from pandas import DataFrame
import pandas as pd


class {cls}(IStrategy):
    """
    {textwrap.fill(description, width=88)}

    Paper idea:
    {textwrap.fill(idea, width=88)}

    Data requirement noted by AI:
    {textwrap.fill(data_required, width=88)}

    Important limitation:
    {textwrap.fill(warning, width=88)}

    Entry rules from the compact AI blueprint:
{textwrap.indent(_list_comment(blueprint['entry_rules']), '    ')}

    Exit and risk rules from the compact AI blueprint:
{textwrap.indent(_list_comment(blueprint['exit_rules'] + blueprint['risk_rules']), '    ')}
    """

    INTERFACE_VERSION = 3
    timeframe = "{timeframe}"
    can_short = False
    startup_candle_count = {max(slow, breakout, atr) + 30}
    stoploss = {stoploss:.4f}
    minimal_roi = {{"0": {roi:.4f}, "120": {max(roi / 2, 0.005):.4f}, "360": 0}}

    def populate_indicators(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        close = dataframe["close"]
        high = dataframe["high"]
        low = dataframe["low"]
        dataframe["ema_fast"] = close.ewm(span={fast}, adjust=False).mean()
        dataframe["ema_slow"] = close.ewm(span={slow}, adjust=False).mean()
        delta = close.diff()
        gain = delta.clip(lower=0).rolling(14).mean()
        loss = (-delta.clip(upper=0)).rolling(14).mean()
        rs = gain / loss.replace(0, pd.NA)
        dataframe["rsi"] = (100 - (100 / (1 + rs))).fillna(50)
        dataframe["volume_ma"] = dataframe["volume"].rolling(30).mean()
        dataframe["breakout_high"] = high.rolling({breakout}).max().shift(1)
        dataframe["breakout_low"] = low.rolling({breakout}).min().shift(1)
        dataframe["bb_mid"] = close.rolling(20).mean()
        dataframe["bb_std"] = close.rolling(20).std()
        dataframe["bb_upper"] = dataframe["bb_mid"] + 2 * dataframe["bb_std"]
        dataframe["bb_lower"] = dataframe["bb_mid"] - 2 * dataframe["bb_std"]
        dataframe["bb_width"] = (dataframe["bb_upper"] - dataframe["bb_lower"]) / dataframe["bb_mid"].replace(0, pd.NA)
        dataframe["bb_width_ma"] = dataframe["bb_width"].rolling(60).mean()
        previous_close = close.shift(1)
        true_range = pd.concat([(high - low).abs(), (high - previous_close).abs(), (low - previous_close).abs()], axis=1).max(axis=1)
        dataframe["atr"] = true_range.rolling({atr}).mean()
        return dataframe

    def populate_entry_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        condition = {entry_condition}
        dataframe.loc[condition, "enter_long"] = 1
        return dataframe

    def populate_exit_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        condition = {exit_condition}
        dataframe.loc[condition, "exit_long"] = 1
        return dataframe
'''


def save_ai_paper_strategy(
    *, blueprint: Dict[str, Any], output_dir: str | None, paper_filename: str,
    provider: str, model: str, compact_chars: int, input_digest: str,
    provider_usage: Dict[str, Any] | None = None,
) -> Dict[str, Any]:
    resolved = validate_output_dir(output_dir)
    normalized = normalize_blueprint(blueprint)
    root_class, _ = parse_base_and_version(normalized["class_name"])

    # Concurrent imports can choose the same next version. Filesystem-atomic
    # no-overwrite writes are the final authority, so retry with a fresh
    # version instead of overwriting or returning an intermittent conflict.
    for _attempt in range(50):
        version = 1
        class_name = root_class
        filename = f"{class_name}.py"
        if (Path(resolved) / filename).exists():
            version = next_version(root_class, str(resolved))
            class_name = f"{root_class}_v{version}"
            filename = f"{class_name}.py"

        candidate = dict(normalized)
        candidate["class_name"] = class_name
        code = build_strategy_code(candidate)
        compile(code, filename, "exec")
        metadata = {
            "template_key": "ai_paper_import",
            "template_label": {"en": "AI Paper Import", "zh": "AI 论文导入"},
            "base_name": root_class,
            "version": version,
            "builder_version": settings.app_version,
            "strategy_mode": "ai_paper",
            "market_regime": candidate.get("family", "hybrid"),
            "risk_level": "medium",
            "values": candidate,
            "ai_paper": {
                "paper_filename": _safe_text(Path(paper_filename).name, 240, "uploaded_paper"),
                "provider": provider,
                "provider_label": _PROVIDER_SPECS.get(provider, _PROVIDER_SPECS["custom"]).label,
                "model": model,
                "provider_usage": _normalize_usage(provider_usage),
                "compact_chars_sent": compact_chars,
                "paper_digest": input_digest,
                "created_at": _dt.datetime.now(_dt.timezone.utc).isoformat(),
                "api_key_saved": False,
                "token_saving_method": "Local text extraction and keyword compression; compact JSON blueprint; Python generated locally.",
            },
            "strategy_draft_notes": {
                "en": "Generated from an uploaded paper with the user's own API key. Review and backtest externally before use.",
                "zh": "使用用户自己的 API key 根据上传论文生成。使用前请在外部检查并回测。",
            },
        }
        try:
            saved_to, metadata_path = write_strategy(
                filename, code, overwrite=False, output_dir=str(resolved), metadata=metadata
            )
        except FileExistsError:
            continue
        return {
            "filename": filename, "class_name": class_name, "saved_to": str(saved_to),
            "metadata_path": str(metadata_path) if metadata_path else "", "output_dir": str(resolved),
            "code": code, "blueprint": candidate,
        }
    raise RuntimeError("Could not allocate a unique strategy version after repeated concurrent writes.")


def generate_strategy_from_paper(
    *, filename: str, content: bytes, provider: str, api_key: str, model: str,
    base_url: str | None, output_dir: str | None, max_input_chars: int,
    max_output_tokens: int, temperature: float,
) -> Dict[str, Any]:
    if len(content) > 12 * 1024 * 1024:
        raise ValueError("Uploaded paper exceeds the 12 MB limit.")
    text, warnings = extract_paper_text(filename, content)
    if len(text.strip()) < 500:
        raise ValueError("Could not extract enough text. Upload a born-digital PDF or a TXT/Markdown copy.")
    compact = compact_paper_text(text, max_input_chars)
    digest = hashlib.sha256(compact.encode("utf-8", errors="ignore")).hexdigest()[:16]
    # Validate the destination before spending the user's provider tokens.
    resolved_output = validate_output_dir(output_dir)
    blueprint, provider_usage, provider_id, model_id = call_ai_provider(
        provider=provider, api_key=api_key, model=model, base_url=base_url,
        compact_text=compact, max_output_tokens=max_output_tokens, temperature=temperature,
    )
    result = save_ai_paper_strategy(
        blueprint=blueprint, output_dir=str(resolved_output), paper_filename=filename,
        provider=provider_id, model=model_id, compact_chars=len(compact), input_digest=digest,
        provider_usage=provider_usage,
    )
    result.update({
        "warnings": warnings,
        "paper_chars_extracted": len(text),
        "compact_chars_sent": len(compact),
        "api_key_saved": False,
        "provider": provider_id,
        "provider_label": _PROVIDER_SPECS[provider_id].label,
        "model": model_id,
        "provider_usage": provider_usage,
        "token_saving": {
            "input": "Paper text is extracted and compressed locally before the request.",
            "output": "The API returns a compact JSON blueprint; Strategy Builder generates Python locally.",
        },
    })
    return result
