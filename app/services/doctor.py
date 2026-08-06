from __future__ import annotations

from collections import Counter, defaultdict
from typing import Any, Dict, Iterable, List


FAMILY_RULES = [
    ("Momentum", {"momentum", "trend", "relative", "residual", "roc"}),
    ("Reversal", {"reversion", "mean_reversion", "rsi", "pairs", "spread"}),
    ("Breakout", {"breakout", "squeeze", "channel", "opening"}),
    ("Volatility", {"volatility", "atr", "squeeze", "bollinger"}),
    ("Liquidity / Microstructure", {"liquidity", "volume", "lead_lag", "microstructure", "lob"}),
    ("Carry / Futures", {"carry", "futures", "funding", "basis"}),
    ("Hybrid / Adaptive", {"adaptive", "regime", "score", "router", "hybrid"}),
]


def _text(value: Any, lang: str = "en") -> str:
    if isinstance(value, dict):
        return value.get(lang) or value.get("en") or value.get("zh") or ""
    if hasattr(value, "model_dump"):
        data = value.model_dump()
        return data.get(lang) or data.get("en") or data.get("zh") or ""
    if hasattr(value, "dict"):
        data = value.dict()
        return data.get(lang) or data.get("en") or data.get("zh") or ""
    return str(value or "")


def _template_dict(template: Any) -> Dict[str, Any]:
    if hasattr(template, "model_dump"):
        return template.model_dump()
    if hasattr(template, "dict"):
        return template.dict()
    return dict(template)


def template_family(template: Any) -> str:
    t = _template_dict(template)
    tags = {str(x).lower() for x in t.get("tags", [])}
    haystack = " ".join([
        str(t.get("key", "")),
        str(t.get("category", "")),
        str(t.get("market_regime", "")),
        str(t.get("workflow_stage", "")),
        " ".join(tags),
    ]).lower().replace("-", "_")
    for family, terms in FAMILY_RULES:
        if any(term in haystack for term in terms):
            return family
    return "Other"


def template_doctor_report(template: Any, values: Dict[str, Any] | None = None) -> Dict[str, Any]:
    t = _template_dict(template)
    values = values or {}
    fields = t.get("fields", []) or []
    tags = {str(x).lower() for x in t.get("tags", [])}
    field_names = {f.get("name") if isinstance(f, dict) else getattr(f, "name", "") for f in fields}
    key = str(t.get("key", ""))
    mode = t.get("strategy_mode", "traditional")
    risk = str(t.get("risk_level", "medium")).lower()
    category = str(t.get("category", "")).lower()
    workflow = str(t.get("workflow_stage", "")).lower()

    score = {
        "signal_logic_quality": 60,
        "risk_control_completeness": 50,
        "overfitting_safety": 60,
        "data_requirement_ease": 75,
        "freqtrade_compatibility": 70,
        "beginner_friendliness": 65,
    }

    if t.get("entry_logic") or t.get("signal_structure"):
        score["signal_logic_quality"] += 15
    if t.get("confirmation_layers"):
        score["signal_logic_quality"] += min(15, len(t.get("confirmation_layers", [])) * 4)
    if any(x in field_names for x in ["stoploss", "atr_period", "max_atr_pct", "hard_atr_pct", "risk_level"]):
        score["risk_control_completeness"] += 20
    if t.get("exit_modules") or any(x in field_names for x in ["exit_window", "sell_rsi", "exit_z", "hard_z"]):
        score["risk_control_completeness"] += 15
    if risk == "low":
        score["beginner_friendliness"] += 10
        score["risk_control_completeness"] += 5
    elif risk == "high":
        score["beginner_friendliness"] -= 15
        score["overfitting_safety"] -= 10
    if mode == "literature":
        score["signal_logic_quality"] += 8
        score["beginner_friendliness"] -= 5
    if mode == "self_build":
        score["beginner_friendliness"] -= 5
        score["overfitting_safety"] -= 5
    if any(term in key or term in workflow for term in ["lead_lag", "pairs", "carry", "cross_sectional", "residual"]):
        score["data_requirement_ease"] -= 25
    if any(term in key or term in workflow for term in ["proxy", "single_asset"]):
        score["freqtrade_compatibility"] += 10
    if any(term in key for term in ["tick", "lob", "lead_lag_calendar"]):
        score["freqtrade_compatibility"] -= 25
    if any(term in category for term in ["breakout", "volatility"]):
        score["overfitting_safety"] -= 5
    if len(fields) > 16:
        score["beginner_friendliness"] -= 10
        score["overfitting_safety"] -= 8
    elif len(fields) <= 8:
        score["beginner_friendliness"] += 10

    score = {k: max(0, min(100, int(v))) for k, v in score.items()}
    overall = round(sum(score.values()) / len(score))

    warnings: List[str] = []
    checks: List[Dict[str, Any]] = []
    def add_check(label: str, ok: bool, detail: str):
        checks.append({"label": label, "ok": ok, "detail": detail})
        if not ok:
            warnings.append(detail)

    add_check("Has explicit entry logic", bool(t.get("entry_logic") or t.get("signal_structure")), "Entry logic is not clearly documented.")
    add_check("Has explicit exit logic", bool(t.get("exit_logic") or t.get("exit_modules")), "Exit logic should be reviewed before backtesting.")
    add_check("Has risk controls", "stoploss" in field_names or bool(t.get("risk_logic")), "Risk-control layer is weak or implicit.")
    add_check("Freqtrade-oriented output", str(t.get("template_file", "")).endswith(".py.j2"), "Template file does not look like a standard Python strategy template.")
    add_check("No obvious paper/data mismatch", not any(x in key for x in ["lead_lag_calendar_spread_feedback"]), "This template needs tick-level F1/F2 LOB fields; do not use ordinary OHLCV bars for paper replication.")

    replication_note = "traditional_or_builder"
    if mode == "literature":
        replication_note = "paper_replication" if "replication" in workflow or "lead_lag_calendar" in key else "research_inspired_proxy"

    return {
        "template_key": key,
        "template_label": _text(t.get("label")),
        "family": template_family(t),
        "strategy_mode": mode,
        "overall_score": overall,
        "scores": score,
        "checks": checks,
        "warnings": warnings,
        "replication_note": replication_note,
        "beginner_note": "Good beginner starting point." if score["beginner_friendliness"] >= 75 else "Review the logic and data assumptions before use.",
        "backtest_readiness_note": "Compile and run a small backtest first; Strategy Builder does not claim performance.",
        "data_note": "Requires special external columns or multi-asset inputs." if score["data_requirement_ease"] < 60 else "Works mostly with ordinary OHLCV-style inputs.",
    }


def literature_family_summary(templates: Iterable[Any]) -> Dict[str, Any]:
    literature = [_template_dict(t) for t in templates if _template_dict(t).get("strategy_mode") == "literature"]
    grouped: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for tpl in literature:
        grouped[template_family(tpl)].append({
            "key": tpl.get("key"),
            "label": _text(tpl.get("label")),
            "description": _text(tpl.get("description")),
            "tags": tpl.get("tags", []),
            "replication_note": "paper_replication" if "replication" in str(tpl.get("workflow_stage", "")) or "lead_lag_calendar" in str(tpl.get("key", "")) else "research_inspired_proxy",
        })
    families = []
    for family in [x[0] for x in FAMILY_RULES] + ["Other"]:
        items = grouped.get(family, [])
        if items:
            families.append({"family": family, "count": len(items), "items": items})
    return {
        "total_literature_templates": len(literature),
        "families": families,
        "note": "Literature templates are either paper-replication drafts or practical research-inspired proxies. They do not include performance claims.",
    }


def template_doctor_summary(templates: Iterable[Any]) -> Dict[str, Any]:
    reports = [template_doctor_report(t) for t in templates]
    counts = Counter(r["family"] for r in reports)
    return {
        "total_templates": len(reports),
        "families": dict(counts),
        "average_score": round(sum(r["overall_score"] for r in reports) / max(1, len(reports))),
        "top_beginner_templates": sorted(reports, key=lambda r: (r["scores"]["beginner_friendliness"], r["overall_score"]), reverse=True)[:8],
        "review_first_templates": sorted(reports, key=lambda r: (r["scores"]["data_requirement_ease"], r["scores"]["freqtrade_compatibility"]))[:8],
    }
