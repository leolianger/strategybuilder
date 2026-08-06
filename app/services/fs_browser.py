from __future__ import annotations

import os
from pathlib import Path
from typing import List, Optional

from app.config import get_settings
from app.models import DirectoryEntry, DirectoryListingResponse, OutputRootInfo


settings = get_settings()


def _allowed_roots() -> List[Path]:
    return settings.output_roots


def _is_within(path: Path, root: Path) -> bool:
    try:
        path.resolve().relative_to(root.resolve())
        return True
    except Exception:
        return False


def _custom_output_base() -> Path:
    raw = os.environ.get("STRATEGY_BUILDER_CUSTOM_OUTPUT_BASE", "").strip()
    if raw:
        return Path(raw).expanduser().resolve()
    # In Olares, /app/data is the persistent appData mount. Falling back to the
    # default output parent keeps local behavior unchanged.
    if Path("/app/data").exists():
        return Path("/app/data").resolve()
    return settings.default_output_dir.parent.resolve()


def _resolve_user_path(path_str: str) -> Path:
    raw = path_str.strip()
    if len(raw) > 1024:
        raise ValueError("The output path is too long.")
    if not raw:
        return settings.default_output_dir
    p = Path(raw).expanduser()
    if not p.is_absolute():
        p = _custom_output_base() / p
    return p.resolve()


def validate_output_dir(path_str: Optional[str]) -> Path:
    if not path_str:
        settings.default_output_dir.mkdir(parents=True, exist_ok=True)
        return settings.default_output_dir

    path = _resolve_user_path(path_str)
    roots = _allowed_roots()
    for root in roots:
        if _is_within(path, root):
            path.mkdir(parents=True, exist_ok=True)
            return path

    allowed = ", ".join(str(r) for r in roots) or str(settings.default_output_dir)
    raise ValueError(
        "Selected folder is outside allowed roots. "
        "In Olares, choose a path under the persistent app data folder, "
        f"for example /app/data/my-strategies. Allowed roots: {allowed}"
    )


def get_output_roots() -> List[OutputRootInfo]:
    roots = []
    for root in _allowed_roots():
        label = root.name or str(root)
        roots.append(OutputRootInfo(path=str(root), label=label))
    return roots


def list_directories(path_str: Optional[str]) -> DirectoryListingResponse:
    path = validate_output_dir(path_str) if path_str else settings.default_output_dir
    parent = None
    for root in _allowed_roots():
        if _is_within(path, root) and path != root:
            parent = str(path.parent)
            break
    children = []
    for child in sorted(path.iterdir(), key=lambda p: p.name.lower()):
        if child.is_dir() and not child.is_symlink() and not child.name.startswith('.'):
            children.append(DirectoryEntry(name=child.name, path=str(child.resolve())))
            if len(children) >= 500:
                break
    return DirectoryListingResponse(path=str(path), parent=parent, children=children)
