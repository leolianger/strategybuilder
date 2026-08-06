from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional

import math
import re

from pydantic import BaseModel, Field

# Runtime compatibility: some Olares FastAPI base images may include
# Pydantic v1, while local development may use Pydantic v2.
try:
    from pydantic import field_validator, model_validator
    PYDANTIC_V2 = True
except ImportError:  # pragma: no cover - compatibility path for older runtime images
    from pydantic import validator as field_validator, root_validator
    PYDANTIC_V2 = False

if not hasattr(BaseModel, "model_dump"):
    def _model_dump(self, *args, **kwargs):
        return self.dict(*args, **kwargs)
    BaseModel.model_dump = _model_dump  # type: ignore[attr-defined]



FieldType = Literal["str", "int", "float", "bool", "select"]


class LocalizedText(BaseModel):
    zh: str
    en: str


class TemplateField(BaseModel):
    name: str
    label: LocalizedText
    type: FieldType
    default: Any
    min: Optional[float] = None
    max: Optional[float] = None
    help: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    options: List[str] = Field(default_factory=list)
    group: str = "general"


class LiteratureReference(BaseModel):
    title: str
    authors: str = ""
    year: str = ""
    venue: str = ""
    url: str = ""
    note: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))


class TemplateDefinition(BaseModel):
    key: str
    label: LocalizedText
    description: LocalizedText
    principle: LocalizedText
    image: str
    template_file: str
    category: str
    market_regime: str
    risk_level: str
    tags: List[str] = Field(default_factory=list)
    strategy_mode: str = "traditional"
    supports_spot: bool = True
    supports_futures: bool = False
    fields: List[TemplateField]
    entry_logic: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    exit_logic: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    risk_logic: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    weakness: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    development_notes: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    suitable_market: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    signal_structure: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    confirmation_layers: List[str] = Field(default_factory=list)
    exit_modules: List[str] = Field(default_factory=list)
    sensitivity_notes: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    risk_control_notes: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    overfit_notes: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    workflow_stage: str = "select_template"
    literature_references: List[LiteratureReference] = Field(default_factory=list)
    literature_explanation: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))
    literature_implementation_note: LocalizedText = Field(default_factory=lambda: LocalizedText(zh="", en=""))


class SweepDefinition(BaseModel):
    field_name: str
    start: float
    end: float
    step: float

    if PYDANTIC_V2:
        @model_validator(mode="after")
        def validate_range(self) -> "SweepDefinition":
            if not all(math.isfinite(value) for value in (self.start, self.end, self.step)):
                raise ValueError("start, end, and step must be finite")
            if self.step <= 0:
                raise ValueError("step must be positive")
            if self.end < self.start:
                raise ValueError("end must be >= start")
            return self
    else:
        @root_validator
        def validate_range(cls, values: Dict[str, Any]) -> Dict[str, Any]:
            step = values.get("step")
            start = values.get("start")
            end = values.get("end")
            present = [value for value in (start, end, step) if value is not None]
            if present and not all(math.isfinite(float(value)) for value in present):
                raise ValueError("start, end, and step must be finite")
            if step is not None and step <= 0:
                raise ValueError("step must be positive")
            if start is not None and end is not None and end < start:
                raise ValueError("end must be >= start")
            return values


class PreviewRequest(BaseModel):
    template_key: str
    values: Dict[str, Any]
    output_dir: Optional[str] = None
    save_as_new_version: bool = False
    notes: str = ""


class GenerateRequest(PreviewRequest):
    overwrite: bool = False


class BatchPreviewRequest(BaseModel):
    template_key: str
    values: Dict[str, Any]
    sweeps: List[SweepDefinition]
    output_dir: Optional[str] = None
    notes: str = ""


class BatchGenerateRequest(BatchPreviewRequest):
    overwrite: bool = False
    max_items: int = 100


class StrategyFileInfo(BaseModel):
    filename: str
    class_name: str
    size_bytes: int
    updated_at: float
    base_name: Optional[str] = None
    version: Optional[int] = None
    template_key: Optional[str] = None
    template_label: Optional[LocalizedText] = None
    notes: Optional[str] = None
    builder_version: Optional[str] = None
    market_regime: Optional[str] = None
    risk_level: Optional[str] = None
    strategy_mode: Optional[str] = None
    design_clarity: Optional[str] = None
    recommended_user_level: Optional[str] = None
    draft_note: Optional[Dict[str, str]] = None
    documentation_notes: Optional[Dict[str, str]] = None
    curation_status: Optional[str] = None
    review_status: Optional[str] = None
    library_tags: List[str] = Field(default_factory=list)
    curation_note: Optional[str] = None
    archived: bool = False


class DisclaimerResponse(BaseModel):
    title: LocalizedText
    body: LocalizedText


class PreviewResponse(BaseModel):
    template_key: str
    filename: str
    class_name: str
    code: str
    warnings: List[str] = Field(default_factory=list)
    output_dir: str
    base_name: str
    version: int
    disclaimer: DisclaimerResponse
    design_summary: Dict[str, Any] = Field(default_factory=dict)
    design_checklist: List[Dict[str, Any]] = Field(default_factory=list)


class GenerateResponse(PreviewResponse):
    saved_to: str
    metadata_path: str


class BatchItemPreview(BaseModel):
    filename: str
    class_name: str
    values: Dict[str, Any]
    version: int


class BatchPreviewResponse(BaseModel):
    template_key: str
    count: int
    output_dir: str
    items: List[BatchItemPreview]
    warnings: List[str] = Field(default_factory=list)


class BatchGenerateItem(BaseModel):
    filename: str
    saved_to: str
    metadata_path: str
    version: int


class BatchGenerateResponse(BaseModel):
    template_key: str
    count: int
    output_dir: str
    items: List[BatchGenerateItem]
    warnings: List[str] = Field(default_factory=list)


class StrategySourceResponse(BaseModel):
    filename: str
    source: str
    output_dir: str

class StrategyMetadataResponse(BaseModel):
    filename: str
    output_dir: str
    metadata: Dict[str, Any] = Field(default_factory=dict)


class DocumentationUpdateRequest(BaseModel):
    research_note: str = ""
    change_note: str = ""
    external_testing_note: str = ""




class StrategyCurationUpdateRequest(BaseModel):
    curation_status: str = "draft"
    review_status: str = "not_reviewed"
    library_tags: List[str] = Field(default_factory=list)
    curation_note: str = ""
    archived: bool = False


class StrategyCurationUpdateResponse(BaseModel):
    filename: str
    output_dir: str
    curation: Dict[str, Any] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class BulkExportRequest(BaseModel):
    filenames: List[str]
    export_target: str = "generic"


class StrategyDocumentationUpdateResponse(BaseModel):
    filename: str
    output_dir: str
    documentation_notes: Dict[str, str] = Field(default_factory=dict)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class StrategyReviewReportResponse(BaseModel):
    filename: str
    output_dir: str
    review: Dict[str, Any] = Field(default_factory=dict)
    markdown: str = ""


class ClonePayloadResponse(BaseModel):
    filename: str
    output_dir: str
    template_key: str
    values: Dict[str, Any] = Field(default_factory=dict)
    notes: str = ""


class StrategyDiffChange(BaseModel):
    field: str
    left: Any = None
    right: Any = None
    design_impact: str = ""


class StrategyDiffResponse(BaseModel):
    left_filename: str
    right_filename: str
    output_dir: str
    template_changed: bool = False
    changed_parameters: List[StrategyDiffChange] = Field(default_factory=list)
    summary: Dict[str, str] = Field(default_factory=dict)
    impact_summary: Dict[str, str] = Field(default_factory=dict)



class DeleteResponse(BaseModel):
    filename: str
    deleted: bool
    output_dir: str


class HealthResponse(BaseModel):
    ok: bool
    output_dir: str
    version: str


class OutputRootInfo(BaseModel):
    path: str
    label: str


class DirectoryEntry(BaseModel):
    name: str
    path: str


class DirectoryListingResponse(BaseModel):
    path: str
    parent: Optional[str]
    children: List[DirectoryEntry]


class CurrentOutputDirResponse(BaseModel):
    output_dir: str


class VersionInfo(BaseModel):
    base_name: str
    version: int
    filename: str
    template_key: Optional[str] = None
    template_label: Optional[LocalizedText] = None
    notes: Optional[str] = None
    updated_at: float
    metadata_path: Optional[str] = None


class ValidatedStrategy(BaseModel):
    class_name: str
    filename: str
    base_name: str
    version: int
    values: Dict[str, Any]
    output_dir: str
    notes: str = ""
    warnings: List[str] = Field(default_factory=list)

    @field_validator("class_name")
    @classmethod
    def validate_class_name(cls, v: str) -> str:
        if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_]{0,71}", v or ""):
            raise ValueError(
                "strategy_name must be 1-72 ASCII characters, start with a letter, "
                "and contain only letters, digits, or underscores"
            )
        return v


    if PYDANTIC_V2:
        @model_validator(mode="after")
        def validate_filename(self) -> "ValidatedStrategy":
            if not self.filename.endswith(".py"):
                raise ValueError("filename must end with .py")
            return self
    else:
        @root_validator
        def validate_filename(cls, values: Dict[str, Any]) -> Dict[str, Any]:
            filename = values.get("filename", "")
            if filename and not filename.endswith(".py"):
                raise ValueError("filename must end with .py")
            return values
