from __future__ import annotations

import ast
import itertools
import math
import py_compile
import re
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Tuple

from app.config import get_settings
from app.models import DisclaimerResponse, LocalizedText, SweepDefinition, ValidatedStrategy
from app.registry import TEMPLATES
from app.services.file_manager import next_version, parse_base_and_version
from app.services.fs_browser import validate_output_dir
from app.services.renderer import render_strategy


settings = get_settings()
BAD_PATTERNS = {
    r"shift\s*\(\s*-": "Possible lookahead usage detected: shift(-n).",
    r"iloc\s*\[\s*-1\s*\]": "Potential future reference pattern: iloc[-1].",
    r"\b(run_backtest|backtest\s*\(|backtesting\s*\()": "Generated code should remain strategy-development only and must not invoke backtesting.",
    r"\bFreqtradeBot\b|\bExchange\b|create_order|cancel_order|wallets": "Generated code should not include live-trading or exchange-execution calls.",
}
TIMEFRAME_ORDER = ["1m", "3m", "5m", "15m", "30m", "1h", "4h", "1d"]
TA_FUNC_MAP = {
    "SMA": "SMA",
    "EMA": "EMA",
    "WMA": "WMA",
    "TEMA": "TEMA",
    "DEMA": "DEMA",
}
SOURCE_EXPR_MAP = {
    "close": 'dataframe["close"]',
    "open": 'dataframe["open"]',
    "high": 'dataframe["high"]',
    "low": 'dataframe["low"]',
    "hl2": '(dataframe["high"] + dataframe["low"]) / 2.0',
    "ohlc4": '(dataframe["open"] + dataframe["high"] + dataframe["low"] + dataframe["close"]) / 4.0',
}

DISCLAIMER = DisclaimerResponse(
    title=LocalizedText(
        zh="免责声明",
        en="Disclaimer",
    ),
    body=LocalizedText(
        zh="本应用仅用于研究、教学和策略文件生成，不提供投资建议，也不负责回测执行、交易执行、收益承诺或与第三方软件的自动联动。生成的策略文件仍需用户自行在 Freqtrade 或其他系统中刷新、检查、回测并承担全部使用风险。",
        en="This app is for research, education, and strategy-file generation only. It does not provide investment advice and is not responsible for backtest execution, live execution, profit claims, or automatic integration with third-party software. Generated strategy files must still be reviewed, refreshed, and backtested by the user inside Freqtrade or other systems, and all usage risk remains with the user.",
    ),
)


def _friendly_warning(message: str) -> str:
    """Convert technical validation warnings into calmer design notes."""
    if message.startswith("Design note:"):
        return message
    replacements = {
        "may never enter": "may become too selective and rarely enter",
        "overlap": "overlap in ways that make the strategy harder to reason about",
        "ignored because": "will be ignored because",
        "unusually high": "quite high",
        "very tight": "quite tight",
        "very wide": "quite wide",
        "unstable": "over-sensitive",
        "noisy": "noisy or reactive",
        "over-filtered": "too selective",
    }
    text = message
    for old, new in replacements.items():
        text = text.replace(old, new)
    return f"Design note: {text}"


def _normalize_numeric(field_type: str, value: Any) -> Any:
    if field_type == "int":
        if isinstance(value, bool):
            raise ValueError("Boolean values are not valid integers")
        number = float(value)
        if not math.isfinite(number) or not number.is_integer():
            raise ValueError("Integer fields require a finite whole number")
        return int(number)
    if field_type == "float":
        if isinstance(value, bool):
            raise ValueError("Boolean values are not valid numbers")
        number = float(value)
        if not math.isfinite(number):
            raise ValueError("Numeric fields require a finite value")
        return number
    if field_type == "bool":
        if isinstance(value, bool):
            return value
        normalized = str(value).strip().lower()
        if normalized in {"1", "true", "yes", "y", "on"}:
            return True
        if normalized in {"0", "false", "no", "n", "off"}:
            return False
        raise ValueError("Boolean fields require true or false")
    return value


def _class_name_ok(name: str) -> bool:
    return bool(re.fullmatch(r"[A-Za-z][A-Za-z0-9_]{0,71}", name or ""))


def _strategy_draft_notes(template_key: str, values: Dict[str, Any]) -> Dict[str, str]:
    tpl = TEMPLATES[template_key]
    market_zh = tpl.suitable_market.zh or tpl.market_regime
    market_en = tpl.suitable_market.en or tpl.market_regime
    entry_zh = tpl.entry_logic.zh or tpl.signal_structure.zh or tpl.description.zh
    entry_en = tpl.entry_logic.en or tpl.signal_structure.en or tpl.description.en
    knobs = [
        field.name
        for field in tpl.fields
        if field.name not in {"strategy_name", "timeframe", "export_plot_config"}
    ][:6]
    knob_text = ", ".join(knobs) if knobs else "minimal_roi, stoploss"
    return {
        "zh": (
            f"市场假设：{market_zh} 主要入场想法：{entry_zh} "
            f"优先检查这些参数：{knob_text}。该说明不是回测结果，只是帮助你记录生成时的设计意图。"
        ),
        "en": (
            f"Market assumption: {market_en} Main entry idea: {entry_en} "
            f"Primary knobs to review: {knob_text}. This note is not a backtest result; it only records the design intent at generation time."
        ),
    }


def _safe_comment_text(value: str, *, limit: int = 4000) -> str:
    """Collapse user text into a single Python-comment line.

    This prevents a note containing newlines from escaping the generated header
    and becoming executable strategy code.
    """
    text = str(value or "").replace("\x00", " ")[:limit]
    text = re.sub(r"[\r\n\u2028\u2029]+", " | ", text)
    return re.sub(r"\s+", " ", text).strip()


def _header_comment(template_key: str, values: Dict[str, Any], base_name: str, version: int, notes: str) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    tpl = TEMPLATES[template_key]
    draft = _strategy_draft_notes(template_key, values)
    lines = [
        "# ============================================================",
        f"# Generated by {settings.app_name} v{settings.app_version}",
        f"# Template: {template_key} / {tpl.label.en}",
        f"# Base Name: {base_name}",
        f"# Version: {version}",
        f"# Generated At (UTC): {generated_at}",
        f"# Notes: {_safe_comment_text(notes) or '-'}",
        "#",
        "# Strategy Draft Note:",
        f"# - {draft['en']}",
        "#",
    ]
    if getattr(tpl, "strategy_mode", "") == "literature" and getattr(tpl, "literature_references", []):
        lines.extend([
            "# Literature References:",
            *[f"# - {getattr(ref, 'authors', '')} ({getattr(ref, 'year', '')}), {getattr(ref, 'title', '')}" for ref in tpl.literature_references[:4]],
            "# - Note: these are research inspirations, not paper replications or performance claims.",
            "#",
        ])
    lines.extend([
        "# IMPORTANT:",
        "# - This file was generated for research and strategy-file preparation only.",
        "# - It does not contain any backtest result or performance claim.",
        "# - It does not connect to exchanges or place/cancel orders.",
        "# - Review, test, and validate externally before any real use.",
        "# ============================================================",
    ])
    return "\n".join(lines)


def _common_class_block(values: Dict[str, Any]) -> str:
    if not values.get("export_plot_config", False):
        return ""
    return """plot_config = {
    \"main_plot\": {
        \"close\": {\"color\": \"#3498db\"}
    }
}"""


def _validate_template_values(template_key: str, raw_values: Dict[str, Any]) -> Dict[str, Any]:
    if template_key not in TEMPLATES:
        raise ValueError(f"Unknown template_key: {template_key}")

    tpl = TEMPLATES[template_key]
    values: Dict[str, Any] = {}
    for field in tpl.fields:
        raw = raw_values.get(field.name, field.default)
        if field.type in {"int", "float", "bool"}:
            raw = _normalize_numeric(field.type, raw)
        if field.type == "select" and field.options and str(raw) not in field.options:
            raise ValueError(f"{field.name} must be one of: {', '.join(field.options)}")
        if field.type in {"int", "float"}:
            if field.min is not None and raw < field.min:
                raise ValueError(f"{field.name} must be >= {field.min}")
            if field.max is not None and raw > field.max:
                raise ValueError(f"{field.name} must be <= {field.max}")
        values[field.name] = raw

    strategy_name = str(values["strategy_name"]).strip()
    if not _class_name_ok(strategy_name):
        raise ValueError("strategy_name must start with a letter and contain only letters, digits, or underscores")
    values["strategy_name"] = strategy_name
    return values


def _basic_rule_checks(template_key: str, values: Dict[str, Any]) -> List[str]:
    warnings: List[str] = []

    if values.get("stoploss", 0) >= 0:
        raise ValueError("stoploss must be negative")
    if values.get("minimal_roi", 0) < 0:
        raise ValueError("minimal_roi must be non-negative")
    if values.get("timeframe") not in TIMEFRAME_ORDER:
        warnings.append("Uncommon timeframe selected.")

    roi = float(values.get("minimal_roi", 0) or 0)
    stoploss = float(values.get("stoploss", 0) or 0)
    if roi > 0.15:
        warnings.append("minimal_roi is unusually high for a generated strategy scaffold; review whether exits may become too restrictive.")
    if 0 > stoploss > -0.02:
        warnings.append("stoploss is very tight; the generated strategy may be highly sensitive to normal price noise.")
    if stoploss < -0.35:
        warnings.append("stoploss is very wide; make sure this reflects a deliberate risk-layer choice.")

    numeric_windows = [
        int(v) for k, v in values.items()
        if isinstance(v, (int, float)) and ("window" in k or "period" in k or "ema" in k or "sma" in k) and v > 0
    ]
    if values.get("timeframe") in {"1m", "3m"} and numeric_windows and max(numeric_windows) >= 500:
        warnings.append("Very long windows on very short timeframes can make signals slow and heavy; verify the intended lookback span.")

    if values.get("use_volume_confirmation") and int(values.get("volume_period", 20) or 20) < 5:
        warnings.append("volume_period is very short; volume confirmation may become noisy and over-sensitive.")
    if int(values.get("atr_period", 14) or 14) < 5:
        warnings.append("atr_period is very short; volatility and ATR-based exits may become unstable.")
    if int(values.get("rsi_period", 14) or 14) < 5:
        warnings.append("rsi_period is very short; RSI signals may become noisy.")
    for low_name, high_name in [("rsi_buy", "rsi_sell"), ("rsi_entry", "rsi_exit_ceiling"), ("range_rsi_buy", "range_rsi_sell")]:
        if low_name in values and high_name in values and values.get(low_name) >= values.get(high_name):
            raise ValueError(f"{low_name} must be smaller than {high_name}")

    if template_key in {"double_sma_trend", "ema_crossover"}:
        if values["fast_window"] >= values["slow_window"]:
            raise ValueError("fast_window must be smaller than slow_window")

    if template_key == "triple_ema_trend":
        if not (values["fast_window"] < values["mid_window"] < values["slow_window"]):
            raise ValueError("fast_window < mid_window < slow_window is required")

    if template_key == "rsi_mean_reversion" and values["buy_rsi"] >= values["sell_rsi"]:
        raise ValueError("buy_rsi must be smaller than sell_rsi")

    if template_key in {"stoch_rsi_reversal", "mfi_reversal"} and values["buy_threshold"] >= values["sell_threshold"]:
        raise ValueError("buy_threshold must be smaller than sell_threshold")

    if template_key == "donchian_breakout" and values["exit_window"] > values["entry_window"]:
        warnings.append("exit_window is larger than entry_window; this is allowed but uncommon.")

    if template_key == "grid_simple":
        if values["grid_lower"] >= 1.0:
            raise ValueError("grid_lower must be below 1.0")
        if values["grid_upper"] <= 1.0:
            raise ValueError("grid_upper must be above 1.0")

    if template_key == "bollinger_mean_reversion" and values["bb_stddev"] <= 0:
        raise ValueError("bb_stddev must be positive")

    if template_key in {"atr_breakout", "supertrend_follower", "keltner_breakout"} and values["atr_mult"] <= 0:
        raise ValueError("atr_mult must be positive")

    if template_key == "vwap_mean_reversion" and values["deviation_pct"] <= 0:
        raise ValueError("deviation_pct must be positive")

    if template_key == "roc_momentum" and values["entry_threshold"] <= values["exit_threshold"]:
        warnings.append("entry_threshold is not above exit_threshold; this can make entries and exits overlap.")

    if template_key == "ichimoku_trend":
        if not (values["conversion_period"] < values["base_period"] < values["span_b_period"]):
            warnings.append("Typical Ichimoku settings use conversion < base < span B.")

    if template_key == "adx_trend_filter" and values["adx_threshold"] < 15:
        warnings.append("ADX threshold below 15 may admit weak trends.")

    if template_key in {"flex_crossover_builder", "classic_golden_cross_builder"}:
        if values["entry_fast_window"] >= values["entry_slow_window"]:
            raise ValueError("entry_fast_window must be smaller than entry_slow_window")
        if values["exit_fast_window"] >= values["exit_slow_window"]:
            raise ValueError("exit_fast_window must be smaller than exit_slow_window")
        if values["use_rsi_filter"] and values["rsi_entry_max"] <= 1:
            raise ValueError("rsi_entry_max must be greater than 1 when RSI filter is enabled")
        if values["trend_filter"] == "off" and values["trend_filter_window"] != 100:
            warnings.append("trend_filter_window is ignored because trend_filter is off.")



    if template_key in {"cci_mean_reversion", "williams_r_reversal"} and values["buy_threshold"] >= values["sell_threshold"]:
        warnings.append("buy_threshold is not below sell_threshold; verify the intended mean-reversion direction.")

    if template_key == "vwma_trend" and values["fast_window"] >= values["slow_window"]:
        raise ValueError("fast_window must be smaller than slow_window")

    if template_key in {"multi_signal_momentum_builder", "score_based_builder", "regime_filtered_builder"}:
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")

    if template_key == "score_based_builder":
        total_score = values.get("ema_weight", 0) + values.get("rsi_weight", 0) + values.get("volume_weight", 0) + values.get("macd_weight", 0)
        if values.get("min_entry_score", 1) > total_score:
            warnings.append("min_entry_score is above the maximum possible score; this strategy may never enter.")
        if values.get("exit_score", 0) >= values.get("min_entry_score", 1):
            warnings.append("exit_score is not below min_entry_score; entries and exits may overlap.")

    if template_key == "weighted_score_builder":
        if values.get("trend_fast_window", 1) >= values.get("trend_slow_window", 2):
            raise ValueError("trend_fast_window must be smaller than trend_slow_window")
        total_score = values.get("trend_weight", 0) + values.get("momentum_weight", 0)
        if values.get("volume_method") != "off":
            total_score += values.get("volume_weight", 0)
        if values.get("volatility_method") != "off":
            total_score += values.get("volatility_weight", 0)
        if values.get("regime_method") != "off":
            total_score += values.get("regime_weight", 0)
        if values.get("min_entry_score", 1) > total_score:
            warnings.append("min_entry_score is above the maximum possible score; this strategy may never enter.")
        if values.get("exit_score", 0) >= values.get("min_entry_score", 1):
            warnings.append("exit_score is not below min_entry_score; entries and exits may overlap.")
        if values.get("volume_method") == "off" and values.get("volume_weight", 0) > 0:
            warnings.append("volume_weight is ignored because volume_method is off.")
        if values.get("volatility_method") == "off" and values.get("volatility_weight", 0) > 0:
            warnings.append("volatility_weight is ignored because volatility_method is off.")
        if values.get("regime_method") == "off" and values.get("regime_weight", 0) > 0:
            warnings.append("regime_weight is ignored because regime_method is off.")



    if template_key == "regime_switch_builder":
        if values.get("trend_ema_fast", 1) >= values.get("trend_ema_slow", 2):
            raise ValueError("trend_ema_fast must be smaller than trend_ema_slow")
        if values.get("range_rsi_buy", 30) >= values.get("range_rsi_sell", 55):
            raise ValueError("range_rsi_buy must be smaller than range_rsi_sell")
        if values.get("breakout_exit_window", 10) > values.get("breakout_window", 40):
            warnings.append("breakout_exit_window is larger than breakout_window; verify the intended breakout exit behavior.")

    if template_key == "volatility_adaptive_builder":
        if values.get("low_vol_atr_pct", 1) >= values.get("high_vol_atr_pct", 5):
            raise ValueError("low_vol_atr_pct must be smaller than high_vol_atr_pct")
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")

    if template_key == "dual_timeframe_proxy":
        if values.get("fast_ema", 1) >= values.get("slow_ema", 2):
            raise ValueError("fast_ema must be smaller than slow_ema")
        if values.get("slow_ema", 2) >= values.get("macro_ema", 200):
            warnings.append("macro_ema is usually larger than slow_ema to approximate a higher-timeframe trend.")


    if template_key == "kama_adaptive_trend":
        if values.get("fast_kama_period", 1) >= values.get("slow_kama_period", 2):
            raise ValueError("fast_kama_period must be smaller than slow_kama_period")

    if template_key == "ultimate_oscillator_reversal":
        if not (values.get("period1", 7) < values.get("period2", 14) < values.get("period3", 28)):
            warnings.append("Typical Ultimate Oscillator settings use period1 < period2 < period3.")
        if values.get("buy_threshold", 35) >= values.get("sell_threshold", 55):
            raise ValueError("buy_threshold must be smaller than sell_threshold")

    if template_key == "trix_momentum":
        if values.get("entry_threshold", 0) < values.get("exit_threshold", 0):
            warnings.append("entry_threshold is below exit_threshold; verify the intended momentum direction.")

    if template_key == "aroon_trend":
        if values.get("entry_threshold", 65) <= values.get("exit_threshold", 45):
            warnings.append("entry_threshold is usually higher than exit_threshold for Aroon trend logic.")

    if template_key == "pullback_continuation_builder":
        if values.get("pullback_ema_window", 21) >= values.get("trend_ema_window", 100):
            warnings.append("pullback_ema_window is usually smaller than trend_ema_window.")
        if values.get("rsi_exit_min", 42) >= values.get("rsi_recovery_min", 48):
            warnings.append("rsi_exit_min is usually below rsi_recovery_min.")

    if template_key == "squeeze_breakout_builder":
        if values.get("bb_stddev", 2.0) <= 0:
            raise ValueError("bb_stddev must be positive")
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; verify the intended breakout exit behavior.")

    if template_key == "risk_layer_composer":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_buy", 32) >= values.get("rsi_sell", 55):
            raise ValueError("rsi_buy must be smaller than rsi_sell")

    if template_key == "ema_rsi_pullback":
        if values.get("pullback_ema_window", 21) >= values.get("trend_ema_window", 100):
            warnings.append("pullback_ema_window is usually smaller than trend_ema_window for a pullback setup.")
        if values.get("rsi_entry_min", 45) >= values.get("rsi_entry_max", 65):
            raise ValueError("rsi_entry_min must be smaller than rsi_entry_max")
        if values.get("rsi_exit_min", 40) >= values.get("rsi_entry_min", 45):
            warnings.append("rsi_exit_min is usually below rsi_entry_min so exits represent failed recovery.")

    if template_key == "macd_adx_confirmation":
        if values.get("macd_fast", 12) >= values.get("macd_slow", 26):
            raise ValueError("macd_fast must be smaller than macd_slow")
        if values.get("adx_exit_threshold", 16) >= values.get("adx_entry_threshold", 22):
            warnings.append("adx_exit_threshold is usually below adx_entry_threshold to avoid immediate exit overlap.")

    if template_key == "confirmation_layer_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_buy", 32) >= values.get("rsi_sell", 55):
            raise ValueError("rsi_buy must be smaller than rsi_sell")
        if values.get("rsi_confirm_min", 45) >= values.get("rsi_confirm_max", 72) and values.get("use_rsi_confirmation"):
            raise ValueError("rsi_confirm_min must be smaller than rsi_confirm_max when RSI band confirmation is enabled")
        if values.get("adx_exit_threshold", 15) >= values.get("adx_threshold", 22) and values.get("use_adx_confirmation"):
            warnings.append("adx_exit_threshold is at or above adx_threshold; ADX entry and exit rules may overlap.")
        if values.get("max_bandwidth_pct", 8.0) <= 0 and values.get("use_squeeze_confirmation"):
            raise ValueError("max_bandwidth_pct must be positive when squeeze confirmation is enabled")
        if values.get("hard_atr_pct", 12) <= values.get("max_atr_pct", 6) and values.get("use_volatility_filter"):
            warnings.append("hard_atr_pct is at or below max_atr_pct; volatility entry and exit rules may overlap.")
        active_layers = sum(bool(values.get(flag)) for flag in [
            "use_trend_guard", "use_momentum_confirmation", "use_rsi_confirmation",
            "use_adx_confirmation", "use_volume_confirmation", "use_volatility_filter", "use_squeeze_confirmation"
        ])
        if active_layers >= 6:
            warnings.append("Many confirmation layers are enabled; the generated strategy may rarely enter and may be over-filtered.")

    if template_key == "exit_logic_composer":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_entry", 32) >= values.get("rsi_exit_ceiling", 58):
            raise ValueError("rsi_entry must be smaller than rsi_exit_ceiling")
        if values.get("momentum_floor", 45) >= values.get("rsi_exit_ceiling", 58):
            warnings.append("momentum_floor is close to or above rsi_exit_ceiling; momentum and RSI-reversion exits may overlap.")
        if values.get("hard_atr_pct", 12.0) <= 0:
            raise ValueError("hard_atr_pct must be positive")
        if values.get("exit_window", 18) > values.get("channel_window", 40):
            warnings.append("exit_window is larger than channel_window; verify the intended channel-exit behavior.")

    if template_key == "regime_aware_strategy_builder":
        if values.get("trend_fast_window", 1) >= values.get("trend_slow_window", 2):
            raise ValueError("trend_fast_window must be smaller than trend_slow_window")
        if values.get("range_rsi_buy", 32) >= values.get("range_rsi_sell", 55):
            raise ValueError("range_rsi_buy must be smaller than range_rsi_sell")
        if values.get("low_vol_atr_pct", 2.0) >= values.get("high_vol_atr_pct", 8.0):
            raise ValueError("low_vol_atr_pct must be smaller than high_vol_atr_pct")
        if values.get("range_adx_max", 18) >= values.get("trend_adx_threshold", 22):
            warnings.append("range_adx_max is at or above trend_adx_threshold; range and trend regime definitions may overlap.")
        if values.get("hard_atr_pct", 14.0) <= values.get("high_vol_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below high_vol_atr_pct; high-volatility entries and exits may overlap.")
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; verify the intended channel-exit behavior.")

    if template_key == "signal_stack_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        active_votes = 3
        if values.get("use_volume_confirmation"):
            active_votes += 1
        if values.get("use_regime_filter"):
            active_votes += 1
        if values.get("use_low_volatility_filter"):
            active_votes += 1
        if values.get("min_confirmations", 4) > active_votes:
            warnings.append("min_confirmations is above the number of active votes; this strategy may never enter.")
        if values.get("exit_confirmations", 2) >= values.get("min_confirmations", 4):
            warnings.append("exit_confirmations is not below min_confirmations; entries and exits may overlap.")


    if template_key == "boolean_logic_composer_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_min", 40) >= values.get("rsi_max", 70):
            raise ValueError("rsi_min must be smaller than rsi_max")
        if values.get("rsi_exit_floor", 38) >= values.get("rsi_min", 42):
            warnings.append("rsi_exit_floor is close to or above rsi_min; RSI entry and exit behavior may overlap.")
        if values.get("hard_atr_pct", 14.0) <= values.get("max_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below max_atr_pct; volatility entry and exit rules may overlap.")
        if values.get("combination_mode") == "weighted_score":
            total_score = sum(values.get(k, 0) for k in ["trend_weight", "momentum_weight", "strength_weight", "volume_weight", "volatility_weight"])
            if values.get("min_weighted_score", 5) > total_score:
                warnings.append("min_weighted_score is above the maximum possible score; this strategy may never enter.")
        if values.get("combination_mode") == "all_required":
            warnings.append("all_required mode is intentionally strict; entries may be rare if all five conditions must pass.")


    if template_key.startswith("literature_"):
        if values.get("ema_fast", 1) >= values.get("ema_slow", 9999) and "ema_slow" in values:
            raise ValueError("ema_fast must be smaller than ema_slow")
        if "rsi_min" in values and "rsi_max" in values and values.get("rsi_min") >= values.get("rsi_max"):
            raise ValueError("rsi_min must be smaller than rsi_max")
        if "rsi_buy" in values and "rsi_sell" in values and values.get("rsi_buy") >= values.get("rsi_sell"):
            raise ValueError("rsi_buy must be smaller than rsi_sell")
        if "range_rsi_buy" in values and "range_rsi_sell" in values and values.get("range_rsi_buy") >= values.get("range_rsi_sell"):
            raise ValueError("range_rsi_buy must be smaller than range_rsi_sell")
        if "max_atr_pct" in values and "hard_atr_pct" in values and values.get("max_atr_pct") >= values.get("hard_atr_pct"):
            warnings.append("The entry ATR ceiling is close to or above the hard ATR exit; entry and exit volatility rules may overlap.")
        if "breakout_window" in values and "exit_window" in values and values.get("exit_window") > values.get("breakout_window"):
            warnings.append("exit_window is larger than breakout_window; review the intended channel-exit behavior.")
        if template_key == "literature_adaptive_regime_mix" and values.get("range_adx_max", 18) >= values.get("trend_adx_min", 22):
            warnings.append("range_adx_max is close to or above trend_adx_min; range and trend states may overlap.")
        if template_key == "literature_short_term_reversal":
            warnings.append("Short-term reversal drafts can fail during strong trends; review carefully before external testing.")
        if template_key == "literature_breakout_volume_confirmation" and values.get("volume_multiplier", 1.0) > 2.5:
            warnings.append("The volume requirement is quite strict; breakout entries may become rare.")

    if template_key == "risk_aware_entry_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("max_entry_rsi", 72) <= values.get("rsi_recovery_min", 48):
            raise ValueError("max_entry_rsi must be larger than rsi_recovery_min")
        if values.get("hard_atr_pct", 13.0) <= values.get("max_atr_pct", 7.5):
            warnings.append("hard_atr_pct is at or below max_atr_pct; volatility entry and exit rules may overlap.")
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; verify the intended channel-exit behavior.")
        if values.get("max_distance_from_ema_pct", 6.0) < 1.0:
            warnings.append("max_distance_from_ema_pct is very tight; many otherwise valid entries may be filtered out.")
        if values.get("min_volume_ratio", 0.8) > 2.0:
            warnings.append("min_volume_ratio is high; entries may require unusually strong participation.")


    if template_key == "guided_signal_blender_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("macd_fast", 12) >= values.get("macd_slow", 26):
            raise ValueError("macd_fast must be smaller than macd_slow")
        if values.get("rsi_recovery_min", 45) >= values.get("rsi_overheat_max", 72):
            raise ValueError("rsi_recovery_min must be smaller than rsi_overheat_max")
        if values.get("hard_atr_pct", 14.0) <= values.get("max_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below max_atr_pct; entry volatility and exit-volatility rules may overlap.")
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; verify the intended channel exit behavior.")
        if values.get("confirmation_bundle") == "strict":
            warnings.append("Strict confirmation can make entries rare. Consider starting with balanced before tightening filters.")

    if template_key == "component_matrix_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_min", 42) >= values.get("rsi_max", 72):
            raise ValueError("rsi_min must be smaller than rsi_max")
        active_score = 0
        for enabled_name, weight_name in [
            ("use_trend_component", "trend_weight"),
            ("use_momentum_component", "momentum_weight"),
            ("use_strength_component", "strength_weight"),
            ("use_volume_component", "volume_weight"),
            ("use_volatility_component", "volatility_weight"),
            ("use_breakout_component", "breakout_weight"),
        ]:
            if values.get(enabled_name):
                active_score += int(values.get(weight_name, 0) or 0)
        if active_score <= 0:
            raise ValueError("At least one enabled component must have positive weight")
        if values.get("min_component_score", 1) > active_score:
            warnings.append("min_component_score is above the maximum active component score; this strategy may never enter.")
        if values.get("exit_score", 0) >= values.get("min_component_score", 1):
            warnings.append("exit_score is not below min_component_score; entry and exit score rules may overlap.")

    if template_key == "entry_exit_workflow_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("exit_ema_fast", 21) >= values.get("exit_ema_slow", 55):
            warnings.append("exit_ema_fast is usually smaller than exit_ema_slow so exit-priority modes remain distinct.")
        if values.get("rsi_recovery_min", 45) >= values.get("rsi_overheat_max", 72):
            raise ValueError("rsi_recovery_min must be smaller than rsi_overheat_max")
        if values.get("hard_atr_pct", 13.0) <= values.get("max_entry_atr_pct", 7.0):
            warnings.append("hard_atr_pct is at or below max_entry_atr_pct; entry-volatility and exit-volatility rules may overlap.")
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; verify channel-exit behavior.")



    if template_key == "strategy_recipe_wizard_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("macd_fast", 12) >= values.get("macd_slow", 26):
            raise ValueError("macd_fast must be smaller than macd_slow")
        if values.get("rsi_recovery_min", 45) >= values.get("rsi_overheat_max", 72):
            raise ValueError("rsi_recovery_min must be smaller than rsi_overheat_max")
        if values.get("max_entry_atr_pct", 8.0) >= values.get("hard_atr_pct", 14.0):
            warnings.append("max_entry_atr_pct is close to or above hard_atr_pct; entry volatility filter and hard exit may overlap.")
        if values.get("strategy_recipe") == "starter" and values.get("confirmation_profile") == "strict":
            warnings.append("Starter recipe with strict confirmation may be too selective for a first draft.")

    if template_key == "adaptive_confirmation_router_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("ema_slow", 2) >= values.get("macro_ema", 200):
            warnings.append("macro_ema is usually larger than ema_slow for regime routing.")
        if values.get("low_vol_atr_pct", 2.0) >= values.get("high_vol_atr_pct", 8.0):
            raise ValueError("low_vol_atr_pct must be smaller than high_vol_atr_pct")
        if values.get("high_vol_atr_pct", 8.0) >= values.get("hard_atr_pct", 14.0):
            warnings.append("high_vol_atr_pct is close to or above hard_atr_pct; high-vol regime and hard exit may overlap.")
        if values.get("router_strictness") == "strict" and values.get("volume_multiplier", 1.0) > values.get("high_vol_volume_multiplier", 1.3):
            warnings.append("Strict router uses volume confirmation; high_vol_volume_multiplier is usually at least as high as volume_multiplier.")

    if template_key == "signal_quality_gate_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_recovery_min", 45) >= values.get("rsi_overheat_max", 72):
            raise ValueError("rsi_recovery_min must be smaller than rsi_overheat_max")
        active_gates = sum(bool(values.get(flag)) for flag in ["use_volume_gate", "use_volatility_gate", "use_distance_gate", "use_candle_gate", "use_strength_gate"])
        if values.get("min_quality_score", 0) > active_gates:
            warnings.append("min_quality_score is above the number of enabled quality gates; the strategy may rarely enter.")
        if values.get("min_quality_score", 0) == 0:
            warnings.append("min_quality_score is zero, so quality gates do not restrict entries.")
        if values.get("max_atr_pct", 8.0) >= values.get("hard_atr_pct", 14.0):
            warnings.append("max_atr_pct is close to or above hard_atr_pct; entry gate and hard exit may overlap.")

    if template_key == "self_build_playbook_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        total_score = values.get("trend_weight", 0) + values.get("momentum_weight", 0) + values.get("strength_weight", 0) + values.get("volume_weight", 0) + values.get("volatility_weight", 0) + values.get("breakout_weight", 0)
        if values.get("min_entry_score", 1) > total_score:
            warnings.append("min_entry_score is above the maximum possible playbook score; the strategy may rarely enter.")
        if values.get("exit_score", 0) >= values.get("min_entry_score", 1):
            warnings.append("exit_score is not below min_entry_score; entry and exit score boundaries may overlap.")
        if values.get("playbook_mode") == "starter" and values.get("min_entry_score", 5) > 5:
            warnings.append("Starter playbook ignores most score settings; keep the first draft simple.")



    if template_key in {"futures_long_short_momentum_builder", "futures_risk_guard_builder"}:
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("macd_fast", 12) >= values.get("macd_slow", 26):
            raise ValueError("macd_fast must be smaller than macd_slow")
        if values.get("long_rsi_min", 45) >= values.get("long_rsi_max", 72):
            raise ValueError("long_rsi_min must be smaller than long_rsi_max")
        if values.get("short_rsi_min", 28) >= values.get("short_rsi_max", 55):
            raise ValueError("short_rsi_min must be smaller than short_rsi_max")
        if values.get("max_atr_pct", 8.0) >= values.get("hard_atr_pct", 14.0):
            warnings.append("max_atr_pct is close to or above hard_atr_pct; entry volatility gate and hard exit may overlap.")
        if values.get("trade_direction") in {"short_only", "long_short"}:
            warnings.append("Short-side logic is intended for Freqtrade futures-oriented workflows; do not export this as a spot-only strategy without review.")
        if template_key == "futures_risk_guard_builder":
            if values.get("min_quality_gates", 3) > 5:
                warnings.append("min_quality_gates is above the number of available quality gates; entries may be blocked.")
            if values.get("max_distance_from_ema_pct", 6.0) < 1.0:
                warnings.append("max_distance_from_ema_pct is quite tight; many entries may be filtered out.")

    if template_key == "futures_breakout_guard_builder":
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; verify the intended channel-exit behavior.")
        if values.get("max_atr_pct", 10.0) >= values.get("hard_atr_pct", 18.0):
            warnings.append("max_atr_pct is close to or above hard_atr_pct; breakout entry and hard volatility exit may overlap.")
        if values.get("trade_direction") in {"short_only", "long_short"}:
            warnings.append("Short breakout logic is intended for Freqtrade futures-oriented workflows; use the futures export profile and review Freqtrade leverage settings separately.")
        if values.get("breakout_buffer_pct", 0.15) > 2.0:
            warnings.append("breakout_buffer_pct is quite high; breakouts may become very selective.")



    if template_key == "market_state_router_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("ema_slow", 2) >= values.get("macro_ema", 200):
            warnings.append("macro_ema is usually larger than ema_slow so the router has a clear macro anchor.")
        if values.get("range_rsi_buy", 30) >= values.get("range_rsi_sell", 55):
            raise ValueError("range_rsi_buy must be smaller than range_rsi_sell")
        if values.get("range_adx_max", 18) >= values.get("trend_adx_min", 22):
            warnings.append("range_adx_max is close to or above trend_adx_min; range and trend states may overlap.")
        if values.get("breakout_atr_min", 3.0) >= values.get("hard_atr_pct", 15.0):
            warnings.append("breakout_atr_min is close to or above hard_atr_pct; breakout state and hard exit may overlap.")
        if values.get("exit_window", 18) > values.get("breakout_window", 40):
            warnings.append("exit_window is larger than breakout_window; review channel-exit behavior.")

    if template_key == "confirmation_stack_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_min", 42) >= values.get("rsi_max", 72):
            raise ValueError("rsi_min must be smaller than rsi_max")
        active_score = 0
        for enabled_name, weight_name in [
            ("use_trend_gate", "trend_weight"),
            ("use_rsi_gate", "rsi_weight"),
            ("use_adx_gate", "adx_weight"),
            ("use_volume_gate", "volume_weight"),
            ("use_volatility_gate", "volatility_weight"),
            ("use_candle_gate", "candle_weight"),
        ]:
            if values.get(enabled_name):
                active_score += int(values.get(weight_name, 0) or 0)
        if active_score <= 0:
            raise ValueError("At least one enabled gate must have positive weight")
        if values.get("min_confirmation_score", 1) > active_score:
            warnings.append("min_confirmation_score is above the maximum enabled gate score; the strategy may rarely enter.")
        if values.get("exit_confirmation_score", 0) >= values.get("min_confirmation_score", 1):
            warnings.append("exit_confirmation_score is not below min_confirmation_score; entry and exit score boundaries may overlap.")
        if values.get("hard_atr_pct", 14.0) <= values.get("max_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below max_atr_pct; volatility entry and exit rules may overlap.")

    if template_key == "exit_priority_stack_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_min", 42) >= values.get("rsi_max", 72):
            raise ValueError("rsi_min must be smaller than rsi_max")
        if values.get("rsi_exit_floor", 38) >= values.get("rsi_min", 42):
            warnings.append("rsi_exit_floor is close to or above rsi_min; momentum exit may overlap with entry filtering.")
        if values.get("exit_window", 18) > values.get("exit_ema", 34) * 3:
            warnings.append("exit_window is much larger than exit_ema; protective channel exits may react slowly.")

    if template_key == "defensive_volatility_guard_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("hard_atr_pct", 13.0) <= values.get("max_atr_pct", 7.5):
            warnings.append("hard_atr_pct is at or below max_atr_pct; entry volatility filter and hard exit may overlap.")
        if values.get("min_guard_count", 3) > 4:
            warnings.append("min_guard_count is above the number of available guard modules; entries may be blocked.")
        if values.get("max_distance_from_ema_pct", 6.0) < 1.0:
            warnings.append("max_distance_from_ema_pct is quite tight; many trend entries may be filtered out.")
        if values.get("rsi_exit_floor", 38) >= values.get("rsi_recovery_min", 45):
            warnings.append("rsi_exit_floor is close to the recovery threshold; entry and exit momentum rules may overlap.")



    if template_key == "scenario_guard_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("ema_slow", 2) >= values.get("macro_ema", 144):
            warnings.append("macro_ema is usually larger than ema_slow so the scenario guard has a clear higher-level anchor.")
        if values.get("max_entry_atr_pct", 8.0) >= values.get("hard_atr_pct", 14.0):
            warnings.append("max_entry_atr_pct is close to or above hard_atr_pct; entry volatility gate and hard exit may overlap.")
        if values.get("rsi_exit_floor", 38) >= values.get("rsi_recovery_min", 45):
            warnings.append("rsi_exit_floor is close to the recovery threshold; entry and exit momentum rules may overlap.")

    if template_key == "preset_pack_router_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        active_score = values.get("trend_weight", 0) + values.get("momentum_weight", 0) + values.get("strength_weight", 0) + values.get("volume_weight", 0) + values.get("volatility_weight", 0)
        for score_name in ["balanced_score", "defensive_score", "exploratory_score"]:
            if values.get(score_name, 1) > active_score:
                warnings.append(f"{score_name} is above the maximum possible quality score; that preset may rarely enter.")
        if values.get("exit_score", 0) >= values.get("balanced_score", 1):
            warnings.append("exit_score is close to or above balanced_score; score entry and exit boundaries may overlap.")
        if values.get("hard_atr_pct", 14.0) <= values.get("max_entry_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below max_entry_atr_pct; volatility entry and exit rules may overlap.")

    if template_key == "multitimeframe_proxy_confirmation_builder":
        if values.get("local_fast_ema", 1) >= values.get("local_slow_ema", 2):
            raise ValueError("local_fast_ema must be smaller than local_slow_ema")
        if values.get("local_slow_ema", 2) >= values.get("proxy_trend_ema", 144):
            warnings.append("proxy_trend_ema is usually larger than local_slow_ema so it behaves like a slower confirmation anchor.")
        if values.get("min_proxy_score", 3) > 4:
            warnings.append("min_proxy_score is above the number of available proxy confirmation modules; entries may be blocked.")
        if values.get("hard_atr_pct", 14.0) <= values.get("max_entry_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below max_entry_atr_pct; volatility entry and exit rules may overlap.")

    if template_key == "signal_deconfliction_builder":
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("rsi_recovery_min", 45) >= values.get("rsi_overheat_max", 76):
            raise ValueError("rsi_recovery_min must be smaller than rsi_overheat_max")
        positive_score = values.get("trend_weight", 0) + values.get("momentum_weight", 0) + values.get("strength_weight", 0) + values.get("volume_weight", 0)
        max_penalty = values.get("overheat_penalty", 0) + values.get("volatility_penalty", 0) + values.get("distance_penalty", 0)
        if values.get("min_net_score", 3) > positive_score:
            warnings.append("min_net_score is above the maximum positive score before penalties; entries may be very rare.")
        if max_penalty >= positive_score and values.get("min_net_score", 3) > 0:
            warnings.append("Total conflict penalty can fully offset positive signals; review whether the draft is too defensive.")
        if values.get("hard_atr_pct", 14.0) <= values.get("max_entry_atr_pct", 8.0):
            warnings.append("hard_atr_pct is at or below max_entry_atr_pct; volatility conflict and hard exit may overlap.")



    if template_key in {"weekly_alpha_stack_builder", "liquidity_participation_guard_builder", "adaptive_risk_budget_builder", "strategy_handoff_ready_builder", "multi_stage_entry_builder", "futures_bias_router_builder"}:
        if values.get("ema_fast", 1) >= values.get("ema_slow", 2):
            raise ValueError("ema_fast must be smaller than ema_slow")
        if values.get("max_entry_atr_pct", 8.0) >= values.get("hard_atr_pct", 14.0):
            warnings.append("max_entry_atr_pct is close to or above hard_atr_pct; entry volatility filter and hard exit may overlap.")
        if values.get("volume_period", 20) < 5:
            warnings.append("volume_period is very short; participation confirmation may become noisy.")

    if template_key == "weekly_alpha_stack_builder":
        if values.get("macd_fast", 12) >= values.get("macd_slow", 26):
            raise ValueError("macd_fast must be smaller than macd_slow")
        if values.get("rsi_min", 42) >= values.get("rsi_max", 74):
            raise ValueError("rsi_min must be smaller than rsi_max")
        max_score = values.get("trend_weight", 0) + values.get("momentum_weight", 0) + values.get("rsi_weight", 0) + values.get("strength_weight", 0) + values.get("volume_weight", 0) + values.get("volatility_weight", 0)
        if values.get("include_breakout_component"):
            max_score += values.get("breakout_weight", 0)
        if values.get("min_alpha_score", 5) > max_score:
            warnings.append("min_alpha_score is above the maximum active alpha score; the strategy may rarely enter.")
        if values.get("exit_alpha_score", 2) >= values.get("min_alpha_score", 5):
            warnings.append("exit_alpha_score is not below min_alpha_score; entry and exit score boundaries may overlap.")

    if template_key == "liquidity_participation_guard_builder":
        if values.get("rsi_exit_floor", 38) >= values.get("rsi_recovery_min", 45):
            warnings.append("rsi_exit_floor is close to or above rsi_recovery_min; momentum entry and exit may overlap.")
        if values.get("max_candle_range_pct", 5.0) < 1.0:
            warnings.append("max_candle_range_pct is quite tight; many entries may be blocked.")
        if values.get("min_volume_ratio", 1.0) > 2.0:
            warnings.append("min_volume_ratio is high; entries may require unusually strong participation.")

    if template_key == "adaptive_risk_budget_builder":
        if values.get("ema_slow", 2) >= values.get("macro_ema", 200):
            warnings.append("macro_ema is usually larger than ema_slow so the risk-budget anchor is clearly slower.")
        if values.get("rsi_min", 42) >= values.get("rsi_max", 74):
            raise ValueError("rsi_min must be smaller than rsi_max")
        if values.get("defensive_exit_rsi", 42) < values.get("balanced_exit_rsi", 38):
            warnings.append("defensive_exit_rsi is usually at least as high as balanced_exit_rsi so defensive mode exits earlier.")

    if template_key == "strategy_handoff_ready_builder":
        if values.get("rsi_min", 42) >= values.get("rsi_max", 72):
            raise ValueError("rsi_min must be smaller than rsi_max")
        if values.get("rsi_exit_floor", 38) >= values.get("rsi_min", 42):
            warnings.append("rsi_exit_floor is close to or above rsi_min; entry and exit may overlap.")

    if template_key == "multi_stage_entry_builder":
        if values.get("ema_slow", 2) >= values.get("setup_ema", 100):
            warnings.append("setup_ema is usually larger than ema_slow so the setup layer is slower than the trigger layer.")
        if values.get("pullback_rsi_max", 45) >= values.get("trigger_rsi_min", 52):
            warnings.append("pullback_rsi_max is close to or above trigger_rsi_min; setup and trigger definitions may blur.")
        if values.get("rsi_exit_floor", 38) >= values.get("trigger_rsi_min", 52):
            warnings.append("rsi_exit_floor is close to trigger_rsi_min; momentum trigger and exit may overlap.")

    if template_key == "literature_lead_lag_calendar_spread_feedback":
        warnings.append("Paper-replication mode requires synchronized tick/event-level Level-1 F1/F2 bid/ask data; ordinary OHLCV bars are not sufficient.")
        if values.get("tick_size", 0) <= 0:
            raise ValueError("tick_size must be positive")
        if values.get("lambda_price", 0) <= 0:
            raise ValueError("lambda_price must be positive")
        if values.get("ema_cycle", 0) != 50:
            warnings.append("The paper fixes ema_cycle C=50; changing it makes the strategy a variation rather than a strict replication.")
        if values.get("max_position", 1) != 1:
            warnings.append("The paper caps max absolute position at one lot; changing max_position is a variation.")
        if values.get("max_f1_spread_ticks", 2.0) > 2.0:
            warnings.append("The paper trades only when F1 spread is no more than two ticks; a larger value weakens replication fidelity.")

    if template_key == "literature_calendar_spread_proxy_reversion":
        warnings.append("This template is only a Freqtrade-friendly proxy and is not a tick-level paper replication.")
        if values.get("allow_short"):
            warnings.append("Short entries require a futures-oriented Freqtrade workflow; do not use short logic in spot-only mode.")

    if template_key == "futures_bias_router_builder":
        if values.get("ema_slow", 2) >= values.get("macro_ema", 200):
            warnings.append("macro_ema is usually larger than ema_slow so long/short bias has a clear anchor.")
        if values.get("long_rsi_min", 45) >= values.get("long_rsi_max", 74):
            raise ValueError("long_rsi_min must be smaller than long_rsi_max")
        if values.get("short_rsi_min", 26) >= values.get("short_rsi_max", 55):
            raise ValueError("short_rsi_min must be smaller than short_rsi_max")
        if values.get("trade_direction") in {"short_only", "long_short"}:
            warnings.append("Short-side logic is intended for Freqtrade futures-oriented workflows; use the futures export profile and configure leverage/margin inside Freqtrade.")

    return [_friendly_warning(w) for w in warnings]


def _crossover_helpers(values: Dict[str, Any]) -> Dict[str, Any]:
    helpers = dict(values)
    price_source = values.get("price_source", "close")
    helpers["source_expr"] = SOURCE_EXPR_MAP[price_source]
    helpers["entry_fast_ta"] = TA_FUNC_MAP[values["entry_fast_indicator"]]
    helpers["entry_slow_ta"] = TA_FUNC_MAP[values["entry_slow_indicator"]]
    helpers["exit_fast_ta"] = TA_FUNC_MAP[values["exit_fast_indicator"]]
    helpers["exit_slow_ta"] = TA_FUNC_MAP[values["exit_slow_indicator"]]
    helpers["trend_filter_ta"] = values.get("trend_filter", "off")
    return helpers


def static_warnings(code: str) -> List[str]:
    warnings: List[str] = []
    for pattern, message in BAD_PATTERNS.items():
        if re.search(pattern, code):
            warnings.append(message)


    return warnings


def compile_check(code: str) -> None:
    with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as tmp:
        tmp.write(code.encode("utf-8"))
        tmp_path = tmp.name
    try:
        py_compile.compile(tmp_path, doraise=True)
        ast.parse(code)
    finally:
        Path(tmp_path).unlink(missing_ok=True)
        Path(tmp_path + "c").unlink(missing_ok=True)


def _localized(zh: str, en: str) -> Dict[str, str]:
    return {"zh": zh, "en": en}


def _field_label_map(template_key: str) -> Dict[str, Dict[str, str]]:
    tpl = TEMPLATES[template_key]
    return {field.name: field.label.model_dump() for field in tpl.fields}


def _parameter_groups(template_key: str, values: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    tpl = TEMPLATES[template_key]
    grouped: Dict[str, Dict[str, Any]] = {}
    for field in tpl.fields:
        grouped.setdefault(field.group, {})[field.name] = values.get(field.name)
    return grouped


def _fallback_logic_summary(template_key: str, values: Dict[str, Any]) -> Dict[str, Dict[str, str]]:
    tpl = TEMPLATES[template_key]
    entry = tpl.entry_logic.model_dump() if tpl.entry_logic.zh or tpl.entry_logic.en else _localized(
        "根据模板参数生成入场条件；请在生成代码中查看具体指标组合。",
        "Entry conditions are generated from the selected template parameters; inspect the generated code for the exact indicator combination.",
    )
    exit_ = tpl.exit_logic.model_dump() if tpl.exit_logic.zh or tpl.exit_logic.en else _localized(
        "根据模板参数生成退出条件；重点检查退出阈值、交叉方向和可选风险层。",
        "Exit conditions are generated from the selected parameters; pay special attention to thresholds, crossover direction, and optional risk layers.",
    )
    risk = tpl.risk_logic.model_dump() if tpl.risk_logic.zh or tpl.risk_logic.en else _localized(
        f"使用 minimal_roi={values.get('minimal_roi')} 与 stoploss={values.get('stoploss')} 作为基础风险参数。",
        f"Uses minimal_roi={values.get('minimal_roi')} and stoploss={values.get('stoploss')} as the base risk parameters.",
    )
    weakness = tpl.weakness.model_dump() if tpl.weakness.zh or tpl.weakness.en else _localized(
        "该策略文件只是研究和开发脚手架，仍需在外部系统中独立检查和评估。",
        "This strategy file is only a research/development scaffold and still needs external review and evaluation.",
    )
    notes = tpl.development_notes.model_dump() if tpl.development_notes.zh or tpl.development_notes.en else _localized(
        "建议先确认策略假设，再调整参数；不要仅根据生成结果直接使用。",
        "Confirm the strategy hypothesis before tuning parameters; do not use the generated file directly without review.",
    )
    return {"entry_logic": entry, "exit_logic": exit_, "risk_logic": risk, "weakness": weakness, "development_notes": notes}


def build_design_summary(validated: ValidatedStrategy, template_key: str) -> Dict[str, Any]:
    tpl = TEMPLATES[template_key]
    logic = _fallback_logic_summary(template_key, validated.values)
    return {
        "strategy_family": tpl.category,
        "strategy_mode": tpl.strategy_mode,
        "market_regime": tpl.market_regime,
        "risk_level": tpl.risk_level,
        "tags": tpl.tags,
        "template_label": tpl.label.model_dump(),
        "template_description": tpl.description.model_dump(),
        "template_principle": tpl.principle.model_dump(),
        "field_labels": _field_label_map(template_key),
        "parameter_groups": _parameter_groups(template_key, validated.values),
        "suitable_market": tpl.suitable_market.model_dump(),
        "signal_structure": tpl.signal_structure.model_dump(),
        "confirmation_layers": tpl.confirmation_layers,
        "exit_modules": tpl.exit_modules,
        "sensitivity_notes": tpl.sensitivity_notes.model_dump(),
        "risk_control_notes": tpl.risk_control_notes.model_dump(),
        "overfit_notes": tpl.overfit_notes.model_dump(),
        "workflow_stage": tpl.workflow_stage,
        "literature_references": [ref.model_dump() if hasattr(ref, "model_dump") else ref for ref in getattr(tpl, "literature_references", [])],
        "literature_explanation": tpl.literature_explanation.model_dump() if hasattr(tpl, "literature_explanation") else {"zh": "", "en": ""},
        "literature_implementation_note": tpl.literature_implementation_note.model_dump() if hasattr(tpl, "literature_implementation_note") else {"zh": "", "en": ""},
        "human_readable_summary": {
            "zh": "该策略先根据模板假设生成入场信号，再通过已启用的确认/过滤模块筛选，最后由退出模块、ROI 和 stoploss 共同定义退出边界。",
            "en": "This strategy first generates entry signals from the template hypothesis, then filters them through enabled confirmation modules, and finally defines exits through exit modules, ROI, and stoploss."
        },
        "strategy_draft_notes": _strategy_draft_notes(template_key, validated.values),
        "guided_card": {
            "best_for": tpl.suitable_market.model_dump(),
            "entry_idea": logic["entry_logic"],
            "exit_idea": logic["exit_logic"],
            "main_knobs": [field.name for field in tpl.fields if field.name not in {"strategy_name", "timeframe", "export_plot_config"}][:5],
            "things_to_watch": logic["weakness"],
        },
        "strategy_blueprint": {
            "market_assumption": tpl.suitable_market.model_dump(),
            "signal_structure": tpl.signal_structure.model_dump(),
            "confirmation_layers": tpl.confirmation_layers,
            "exit_modules": tpl.exit_modules,
            "sensitivity_notes": tpl.sensitivity_notes.model_dump(),
            "risk_control_notes": tpl.risk_control_notes.model_dump(),
            "tuning_risks": tpl.overfit_notes.model_dump(),
        },
        **logic,
    }


def build_design_checklist(validated: ValidatedStrategy, template_key: str) -> List[Dict[str, Any]]:
    """Create a lightweight pre-generation checklist without running any backtest."""
    tpl = TEMPLATES[template_key]
    values = validated.values
    checks = [
        {
            "key": "entry_logic",
            "ok": bool(tpl.entry_logic.en or tpl.entry_logic.zh or tpl.signal_structure.en or tpl.signal_structure.zh),
            "label": {"zh": "入场逻辑已定义", "en": "Entry logic is defined"},
        },
        {
            "key": "exit_logic",
            "ok": bool(tpl.exit_logic.en or tpl.exit_logic.zh or tpl.exit_modules or values.get("minimal_roi") is not None),
            "label": {"zh": "退出逻辑已定义", "en": "Exit logic is defined"},
        },
        {
            "key": "stoploss",
            "ok": values.get("stoploss", 0) < 0,
            "label": {"zh": "Stoploss 为有效负数", "en": "Stoploss is a valid negative value"},
        },
        {
            "key": "roi",
            "ok": values.get("minimal_roi", 0) >= 0,
            "label": {"zh": "ROI 参数有效", "en": "ROI parameter is valid"},
        },
        {
            "key": "metadata",
            "ok": bool(validated.base_name and validated.filename),
            "label": {"zh": "版本与 metadata 信息已准备", "en": "Version and metadata are prepared"},
        },
        {
            "key": "scope",
            "ok": True,
            "label": {"zh": "仅生成策略文件，不包含回测或交易执行", "en": "Strategy-file generation only; no backtest or execution logic"},
        },
    ]
    return checks


def build_metadata(validated: ValidatedStrategy, template_key: str) -> Dict[str, Any]:
    tpl = TEMPLATES[template_key]
    design_summary = build_design_summary(validated, template_key)
    return {
        "builder_app": settings.app_name,
        "builder_version": settings.app_version,
        "template_key": template_key,
        "template_label": tpl.label.model_dump(),
        "strategy_family": tpl.category,
        "strategy_mode": tpl.strategy_mode,
        "market_regime": tpl.market_regime,
        "risk_level": tpl.risk_level,
        "tags": tpl.tags,
        "base_name": validated.base_name,
        "version": validated.version,
        "class_name": validated.class_name,
        "filename": validated.filename,
        "notes": validated.notes,
        "warnings": validated.warnings,
        "values": validated.values,
        "design_summary": design_summary,
        "design_checklist": build_design_checklist(validated, template_key),
        "strategy_draft_notes": design_summary.get("strategy_draft_notes", {}),
        "template_quality_audit": {
            "design_clarity": "advanced" if len(tpl.fields) > 12 else "moderate" if len(tpl.fields) > 7 else "simple",
            "main_dependency": ", ".join(tpl.tags[:4]),
            "recommended_user_level": "advanced" if tpl.strategy_mode == "self_build" and len(tpl.fields) > 12 else "intermediate" if len(tpl.fields) > 7 else "beginner-friendly",
        },
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "disclaimer": DISCLAIMER.model_dump(),
    }


def validate_payload(
    template_key: str,
    raw_values: Dict[str, Any],
    *,
    output_dir: str | None = None,
    save_as_new_version: bool = False,
    notes: str = "",
) -> ValidatedStrategy:
    values = _validate_template_values(template_key, raw_values)
    warnings = _basic_rule_checks(template_key, values)

    strategy_name = values["strategy_name"]
    base_name, current_version = parse_base_and_version(strategy_name)
    resolved_output = validate_output_dir(output_dir)

    version = current_version
    class_name = strategy_name
    if save_as_new_version:
        version = next_version(base_name, str(resolved_output))
        class_name = base_name if version == 1 else f"{base_name}_v{version}"
        values["strategy_name"] = class_name

    return ValidatedStrategy(
        class_name=class_name,
        filename=f"{class_name}.py",
        base_name=base_name,
        version=version,
        values=values,
        output_dir=str(resolved_output),
        notes=notes.strip()[:4000],
        warnings=warnings,
    )


def preview_strategy(
    template_key: str,
    raw_values: Dict[str, Any],
    *,
    output_dir: str | None = None,
    save_as_new_version: bool = False,
    notes: str = "",
) -> Tuple[ValidatedStrategy, str, Dict[str, Any]]:
    validated = validate_payload(template_key, raw_values, output_dir=output_dir, save_as_new_version=save_as_new_version, notes=notes)
    header = _header_comment(template_key, validated.values, validated.base_name, validated.version, validated.notes)
    values = dict(validated.values)
    values["common_class_block"] = _common_class_block(values)
    if template_key in {"flex_crossover_builder", "classic_golden_cross_builder"}:
        values.update(_crossover_helpers(validated.values))
    code = render_strategy(TEMPLATES[template_key].template_file, values, header=header)
    warnings = static_warnings(code)
    compile_check(code)
    validated.warnings.extend(warnings)
    metadata = build_metadata(validated, template_key)
    return validated, code, metadata


def _range_values(sweep: SweepDefinition, field_type: str) -> List[Any]:
    values: List[Any] = []
    cur = sweep.start
    guard = 0
    while cur <= sweep.end + 1e-12:
        if field_type == "int":
            values.append(int(round(cur)))
        else:
            values.append(round(cur, 10))
        cur += sweep.step
        guard += 1
        if guard > 10000:
            raise ValueError("Sweep definition expands to too many points")
    return list(dict.fromkeys(values))


def batch_plan(
    template_key: str,
    raw_values: Dict[str, Any],
    sweeps: List[SweepDefinition],
    *,
    output_dir: str | None = None,
    notes: str = "",
    max_items: int = 100,
) -> Tuple[List[ValidatedStrategy], List[str]]:
    if template_key not in TEMPLATES:
        raise ValueError(f"Unknown template_key: {template_key}")
    field_map = {f.name: f for f in TEMPLATES[template_key].fields}
    if not sweeps:
        raise ValueError("At least one sweep is required")
    if len(sweeps) > 5:
        raise ValueError("At most five sweep dimensions are allowed")
    max_items = max(1, min(int(max_items), 100))
    sweep_names = [sweep.field_name for sweep in sweeps]
    if len(set(sweep_names)) != len(sweep_names):
        raise ValueError("Each sweep field may appear only once")

    expanded: List[Tuple[str, List[Any]]] = []
    warnings: List[str] = []
    combination_count = 1
    for sweep in sweeps:
        if sweep.field_name not in field_map:
            raise ValueError(f"Unknown field in sweep: {sweep.field_name}")
        field = field_map[sweep.field_name]
        if field.type not in {"int", "float"}:
            raise ValueError(f"Sweep field must be numeric: {sweep.field_name}")
        vals = _range_values(sweep, field.type)
        expanded.append((sweep.field_name, vals))
        combination_count *= len(vals)
        if combination_count > max_items:
            raise ValueError(f"Batch size {combination_count} exceeds limit {max_items}")

    # The product is materialized only after its bounded size is known.
    combos = list(itertools.product(*[vals for _, vals in expanded]))

    plans: List[ValidatedStrategy] = []
    for idx, combo in enumerate(combos, start=1):
        values = dict(raw_values)
        for (field_name, _vals), value in zip(expanded, combo):
            values[field_name] = value
        values["strategy_name"] = f"{raw_values.get('strategy_name', 'Strategy')}_v{idx}"
        plan = validate_payload(template_key, values, output_dir=output_dir, save_as_new_version=False, notes=notes)
        plans.append(plan)
    return plans, warnings
