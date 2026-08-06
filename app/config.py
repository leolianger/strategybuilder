from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import List


@dataclass(frozen=True)
class Settings:
    base_dir: Path
    default_output_dir: Path
    app_name: str
    app_version: str
    output_roots: List[Path]
    metadata_dir_name: str


BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_DIR = BASE_DIR / "output" / "strategies"
APP_VERSION = "1.2.20"
METADATA_DIR_NAME = ".strategy_builder"


def _candidate_roots(default_output_dir: Path) -> List[Path]:
    raw = os.environ.get("STRATEGY_BUILDER_ROOTS", "").strip()
    if raw:
        candidates = [Path(x.strip()).expanduser().resolve() for x in raw.split(",") if x.strip()]
    else:
        home = Path.home()
        candidates = [
            default_output_dir,
            default_output_dir.parent,
            Path("/app/data"),
            Path("/app/output"),
            home / "Desktop",
            home / "Documents",
            home,
            Path("/Volumes"),
        ]

    roots: List[Path] = []
    seen = set()
    for p in candidates:
        try:
            p = p.resolve()
        except Exception:
            continue
        if not p.exists() or not p.is_dir():
            continue
        if str(p) in seen:
            continue
        seen.add(str(p))
        roots.append(p)
    if default_output_dir.exists() and str(default_output_dir.resolve()) not in seen:
        roots.insert(0, default_output_dir.resolve())
    return roots


def get_settings() -> Settings:
    app_name = os.environ.get("APP_NAME", "Strategy Builder")
    default_output_dir = Path(os.environ.get("STRATEGY_OUTPUT_DIR", str(DEFAULT_OUTPUT_DIR))).expanduser().resolve()
    default_output_dir.mkdir(parents=True, exist_ok=True)
    return Settings(
        base_dir=BASE_DIR,
        default_output_dir=default_output_dir,
        app_name=app_name,
        app_version=os.environ.get("APP_VERSION", APP_VERSION),
        output_roots=_candidate_roots(default_output_dir),
        metadata_dir_name=METADATA_DIR_NAME,
    )
