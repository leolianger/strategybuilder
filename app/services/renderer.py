from __future__ import annotations

from pathlib import Path
from typing import Any, Dict

from jinja2 import Environment, FileSystemLoader, StrictUndefined


env = Environment(
    loader=FileSystemLoader(str(Path(__file__).resolve().parents[1] / "templates" / "strategies")),
    autoescape=False,
    trim_blocks=True,
    lstrip_blocks=True,
    undefined=StrictUndefined,
)


def render_strategy(template_file: str, values: Dict[str, Any], header: str = "") -> str:
    template = env.get_template(template_file)
    body = template.render(**values)
    return (header.rstrip() + "\n\n" + body).strip() + "\n"
