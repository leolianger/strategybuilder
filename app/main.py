from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, Query, Request, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.concurrency import run_in_threadpool

from app.config import get_settings
from app.models import (
    BatchGenerateRequest,
    BatchGenerateResponse,
    BatchGenerateItem,
    BulkExportRequest,
    BatchPreviewRequest,
    BatchPreviewResponse,
    BatchItemPreview,
    CurrentOutputDirResponse,
    DeleteResponse,
    DirectoryListingResponse,
    DocumentationUpdateRequest,
    DisclaimerResponse,
    GenerateRequest,
    GenerateResponse,
    HealthResponse,
    PreviewRequest,
    PreviewResponse,
    StrategySourceResponse,
    StrategyMetadataResponse,
    ClonePayloadResponse,
    StrategyDiffResponse,
    StrategyDocumentationUpdateResponse,
    StrategyReviewReportResponse,
    StrategyCurationUpdateRequest,
    StrategyCurationUpdateResponse,
    VersionInfo,
)
from app.registry import TEMPLATES
from app.services.file_manager import (
    build_strategy_review_report,
    build_strategy_scenario_plan,
    build_parameter_tuning_guide,
    code_quality_check,
    clone_payload,
    delete_strategy,
    diff_strategy_metadata,
    export_strategy_package,
    export_strategy_collection,
    freqtrade_import_guide_markdown,
    strategy_readiness_check,
    list_strategies,
    read_metadata,
    read_strategy,
    update_strategy_documentation,
    update_strategy_curation,
    versions_for,
    write_strategy,
    write_strategy_batch,
)
from app.services.fs_browser import get_output_roots, list_directories, validate_output_dir
from app.services.validator import DISCLAIMER, batch_plan, preview_strategy
from app.services.doctor import literature_family_summary, template_doctor_report, template_doctor_summary
from app.services.ai_paper import AIProviderError, UnsafeEndpointError, generate_strategy_from_paper, provider_catalog
from app.services.diagnostics import run_system_diagnostics


settings = get_settings()
app = FastAPI(title=settings.app_name)


templates = Jinja2Templates(directory=str(Path(__file__).resolve().parent / "templates"))
app.mount("/static", StaticFiles(directory=str(Path(__file__).resolve().parent / "static")), name="static")


def _apply_security_headers(response: Response, request_path: str) -> Response:
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "no-referrer")
    response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    response.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; "
        "script-src 'self'; connect-src 'self'; font-src 'self' data:; object-src 'none'; "
        "base-uri 'self'; form-action 'self'; frame-ancestors 'self' https: http:",
    )
    if request_path.startswith("/api/"):
        response.headers.setdefault("Cache-Control", "no-store")
    return response


@app.middleware("http")
async def security_headers(request: Request, call_next):
    def reject(status_code: int, detail: str) -> Response:
        return _apply_security_headers(
            JSONResponse(status_code=status_code, content={"detail": detail}),
            request.url.path,
        )

    if request.method in {"POST", "PUT", "PATCH"}:
        limit = 13 * 1024 * 1024 if request.url.path == "/api/ai-paper/generate" else 2 * 1024 * 1024
        raw_length = request.headers.get("content-length")
        if raw_length:
            try:
                declared_length = int(raw_length)
            except ValueError:
                return reject(400, "Invalid Content-Length header.")
            if declared_length < 0:
                return reject(400, "Invalid Content-Length header.")
            if declared_length > limit:
                return reject(413, "Request body exceeds the allowed size.")

        # Content-Length can be absent or inaccurate for streamed requests.
        # Buffer only up to the route-specific cap, reject immediately above it,
        # then replay the verified body to FastAPI's normal parser.
        chunks: list[bytes] = []
        received = 0
        async for chunk in request.stream():
            received += len(chunk)
            if received > limit:
                return reject(413, "Request body exceeds the allowed size.")
            chunks.append(chunk)
        verified_body = b"".join(chunks)
        request._body = verified_body  # Preserve the body for BaseHTTPMiddleware call_next.
        replayed = False

        async def replay_receive():
            nonlocal replayed
            if replayed:
                return {"type": "http.request", "body": b"", "more_body": False}
            replayed = True
            return {"type": "http.request", "body": verified_body, "more_body": False}

        request._receive = replay_receive  # Starlette request receive hook.
    response = await call_next(request)
    return _apply_security_headers(response, request.url.path)


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse(
        request,
        "index.html",
        {
            "title": settings.app_name,
            "app_version": settings.app_version,
            "output_dir": str(settings.default_output_dir),
            "output_roots": get_output_roots(),
        },
    )


@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(ok=True, output_dir=str(settings.default_output_dir), version=settings.app_version)


@app.get("/api/system/diagnostics")
def system_diagnostics(deep: bool = Query(default=False)):
    return run_system_diagnostics(deep=deep)


@app.get("/api/disclaimer", response_model=DisclaimerResponse)
def get_disclaimer() -> DisclaimerResponse:
    return DISCLAIMER


@app.get("/api/templates")
def get_templates():
    return list(TEMPLATES.values())


@app.get("/api/literature/families")
def get_literature_families():
    return literature_family_summary(TEMPLATES.values())


@app.get("/api/templates/{template_key}/doctor")
def get_template_doctor(template_key: str):
    template = TEMPLATES.get(template_key)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template_doctor_report(template)


@app.get("/api/strategy-doctor/summary")
def get_strategy_doctor_summary():
    return template_doctor_summary(TEMPLATES.values())


@app.get("/api/ai-paper/providers")
def ai_paper_providers():
    return provider_catalog()


@app.post("/api/ai-paper/generate")
async def ai_paper_generate_strategy(
    paper_file: UploadFile = File(...),
    provider: str = Form(default="openai"),
    api_key: str = Form(...),
    model: str = Form(default=""),
    base_url: str = Form(default=""),
    output_dir: str = Form(default=""),
    max_input_chars: int = Form(default=10000),
    max_output_tokens: int = Form(default=900),
    temperature: float = Form(default=0.2),
):
    try:
        filename = paper_file.filename or "uploaded_paper"
        if Path(filename).suffix.lower() not in {".pdf", ".txt", ".md", ".markdown"}:
            raise ValueError("Unsupported paper type. Upload a PDF, TXT, MD, or MARKDOWN file.")
        content = await paper_file.read(12 * 1024 * 1024 + 1)
        if not content:
            raise ValueError("Uploaded paper is empty.")
        if len(content) > 12 * 1024 * 1024:
            raise ValueError("Uploaded paper exceeds the 12 MB limit.")
        # PDF parsing and external HTTP calls are blocking operations. Run them
        # outside the event loop so health checks and other users remain responsive.
        return await run_in_threadpool(
            generate_strategy_from_paper,
            filename=filename,
            content=content,
            provider=provider,
            api_key=api_key,
            model=model,
            base_url=base_url or None,
            output_dir=output_dir or None,
            max_input_chars=max_input_chars,
            max_output_tokens=max_output_tokens,
            temperature=temperature,
        )
    except (AIProviderError,) as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except (UnsafeEndpointError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    finally:
        await paper_file.close()


@app.get("/api/output-roots")
def output_roots():
    return get_output_roots()


@app.get("/api/freqtrade-import-guide")
def get_freqtrade_import_guide(export_target: str = Query(default="generic")):
    headers = {"Content-Disposition": 'attachment; filename="FREQTRADE_IMPORT_GUIDE.md"'}
    return Response(content=freqtrade_import_guide_markdown(export_target), media_type="text/markdown; charset=utf-8", headers=headers)


@app.get("/api/current-output-dir", response_model=CurrentOutputDirResponse)
def current_output_dir(output_dir: str | None = Query(default=None)) -> CurrentOutputDirResponse:
    resolved = validate_output_dir(output_dir)
    return CurrentOutputDirResponse(output_dir=str(resolved))


@app.get("/api/fs/list", response_model=DirectoryListingResponse)
def fs_list(path: str | None = Query(default=None)) -> DirectoryListingResponse:
    try:
        return list_directories(path)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies")
def get_strategies(output_dir: str | None = Query(default=None)):
    try:
        resolved = validate_output_dir(output_dir)
        return list_strategies(str(resolved))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}", response_model=StrategySourceResponse)
def get_strategy_source(filename: str, output_dir: str | None = Query(default=None)) -> StrategySourceResponse:
    try:
        resolved = validate_output_dir(output_dir)
        source = read_strategy(filename, str(resolved))
        return StrategySourceResponse(filename=filename, source=source, output_dir=str(resolved))
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}/metadata", response_model=StrategyMetadataResponse)
def get_strategy_metadata(filename: str, output_dir: str | None = Query(default=None)) -> StrategyMetadataResponse:
    try:
        resolved = validate_output_dir(output_dir)
        metadata = read_metadata(filename, str(resolved))
        return StrategyMetadataResponse(filename=filename, metadata=metadata, output_dir=str(resolved))
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}/review", response_model=StrategyReviewReportResponse)
def get_strategy_review(filename: str, output_dir: str | None = Query(default=None)) -> StrategyReviewReportResponse:
    try:
        resolved = validate_output_dir(output_dir)
        bundle = build_strategy_review_report(filename, str(resolved))
        return StrategyReviewReportResponse(filename=filename, output_dir=str(resolved), review=bundle["review"], markdown=bundle["markdown"])
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/strategies/{filename}/documentation", response_model=StrategyDocumentationUpdateResponse)
def update_strategy_notes(filename: str, req: DocumentationUpdateRequest, output_dir: str | None = Query(default=None)) -> StrategyDocumentationUpdateResponse:
    try:
        resolved = validate_output_dir(output_dir)
        result = update_strategy_documentation(filename, str(resolved), req.model_dump())
        return StrategyDocumentationUpdateResponse(filename=filename, output_dir=str(resolved), documentation_notes=result["documentation_notes"], metadata=result["metadata"])
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))




@app.post("/api/strategies/{filename}/curation", response_model=StrategyCurationUpdateResponse)
def update_strategy_library_curation(filename: str, req: StrategyCurationUpdateRequest, output_dir: str | None = Query(default=None)) -> StrategyCurationUpdateResponse:
    try:
        resolved = validate_output_dir(output_dir)
        result = update_strategy_curation(filename, str(resolved), req.model_dump())
        return StrategyCurationUpdateResponse(filename=filename, output_dir=str(resolved), curation=result["curation"], metadata=result["metadata"])
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/strategies/{filename}/clone-payload", response_model=ClonePayloadResponse)
def get_strategy_clone_payload(filename: str, output_dir: str | None = Query(default=None)) -> ClonePayloadResponse:
    try:
        resolved = validate_output_dir(output_dir)
        payload = clone_payload(filename, str(resolved))
        return ClonePayloadResponse(**payload)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}/readiness")
def get_strategy_readiness(filename: str, output_dir: str | None = Query(default=None), export_target: str = Query(default="generic")):
    try:
        resolved = validate_output_dir(output_dir)
        return strategy_readiness_check(filename, str(resolved), export_target=export_target)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}/code-quality")
def get_strategy_code_quality(filename: str, output_dir: str | None = Query(default=None), export_target: str = Query(default="generic")):
    try:
        resolved = validate_output_dir(output_dir)
        return code_quality_check(filename, str(resolved), export_target=export_target)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))




@app.get("/api/strategies/{filename}/scenario-plan")
def get_strategy_scenario_plan(filename: str, output_dir: str | None = Query(default=None), export_target: str = Query(default="generic")):
    try:
        resolved = validate_output_dir(output_dir)
        return build_strategy_scenario_plan(filename, str(resolved), export_target=export_target)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}/tuning-guide")
def get_strategy_tuning_guide(filename: str, output_dir: str | None = Query(default=None)):
    try:
        resolved = validate_output_dir(output_dir)
        return build_parameter_tuning_guide(filename, str(resolved))
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/strategies/{filename}/export")
def export_strategy(filename: str, output_dir: str | None = Query(default=None), export_target: str = Query(default="generic")):
    try:
        resolved = validate_output_dir(output_dir)
        package_name, content = export_strategy_package(filename, str(resolved), export_target=export_target)
        headers = {"Content-Disposition": f'attachment; filename="{package_name}"'}
        return Response(content=content, media_type="application/zip", headers=headers)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Strategy file not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))




@app.post("/api/strategies/bulk-export")
def export_strategy_collection_endpoint(req: BulkExportRequest, output_dir: str | None = Query(default=None)):
    try:
        resolved = validate_output_dir(output_dir)
        package_name, content = export_strategy_collection(req.filenames, str(resolved), export_target=req.export_target)
        headers = {"Content-Disposition": f'attachment; filename="{package_name}"'}
        return Response(content=content, media_type="application/zip", headers=headers)
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=f"Strategy file not found: {e}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/strategy-diff", response_model=StrategyDiffResponse)
def get_strategy_diff(left_filename: str, right_filename: str, output_dir: str | None = Query(default=None)) -> StrategyDiffResponse:
    try:
        resolved = validate_output_dir(output_dir)
        diff = diff_strategy_metadata(left_filename, right_filename, str(resolved))
        return StrategyDiffResponse(**diff)
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=f"Strategy file not found: {e}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/versions/{base_name}", response_model=list[VersionInfo])
def get_versions(base_name: str, output_dir: str | None = Query(default=None)):
    try:
        resolved = validate_output_dir(output_dir)
        return versions_for(base_name, str(resolved))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.delete("/api/strategies/{filename}", response_model=DeleteResponse)
def delete_strategy_file(filename: str, output_dir: str | None = Query(default=None)) -> DeleteResponse:
    try:
        resolved = validate_output_dir(output_dir)
        deleted = delete_strategy(filename, str(resolved))
        return DeleteResponse(filename=filename, deleted=deleted, output_dir=str(resolved))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/preview", response_model=PreviewResponse)
def preview(req: PreviewRequest) -> PreviewResponse:
    try:
        validated, code, metadata = preview_strategy(
            req.template_key,
            req.values,
            output_dir=req.output_dir,
            save_as_new_version=req.save_as_new_version,
            notes=req.notes,
        )
        return PreviewResponse(
            template_key=req.template_key,
            filename=validated.filename,
            class_name=validated.class_name,
            code=code,
            warnings=validated.warnings,
            output_dir=validated.output_dir,
            base_name=validated.base_name,
            version=validated.version,
            disclaimer=DISCLAIMER,
            design_summary=metadata.get("design_summary", {}),
            design_checklist=metadata.get("design_checklist", []),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest) -> GenerateResponse:
    try:
        validated, code, metadata = preview_strategy(
            req.template_key,
            req.values,
            output_dir=req.output_dir,
            save_as_new_version=req.save_as_new_version,
            notes=req.notes,
        )
        saved_to, meta_path = write_strategy(
            validated.filename,
            code,
            overwrite=req.overwrite,
            output_dir=validated.output_dir,
            metadata=metadata,
        )
        return GenerateResponse(
            template_key=req.template_key,
            filename=validated.filename,
            class_name=validated.class_name,
            code=code,
            warnings=validated.warnings,
            saved_to=str(saved_to),
            metadata_path=str(meta_path) if meta_path else "",
            output_dir=validated.output_dir,
            base_name=validated.base_name,
            version=validated.version,
            disclaimer=DISCLAIMER,
            design_summary=metadata.get("design_summary", {}),
            design_checklist=metadata.get("design_checklist", []),
        )
    except FileExistsError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/batch-preview", response_model=BatchPreviewResponse)
def batch_preview(req: BatchPreviewRequest) -> BatchPreviewResponse:
    try:
        plans, warnings = batch_plan(
            req.template_key,
            req.values,
            req.sweeps,
            output_dir=req.output_dir,
            notes=req.notes,
        )
        items = [BatchItemPreview(filename=p.filename, class_name=p.class_name, values=p.values, version=p.version) for p in plans]
        output_dir = plans[0].output_dir if plans else str(validate_output_dir(req.output_dir))
        return BatchPreviewResponse(template_key=req.template_key, count=len(items), output_dir=output_dir, items=items, warnings=warnings)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/batch-generate", response_model=BatchGenerateResponse)
def batch_generate(req: BatchGenerateRequest) -> BatchGenerateResponse:
    try:
        plans, warnings = batch_plan(
            req.template_key,
            req.values,
            req.sweeps,
            output_dir=req.output_dir,
            notes=req.notes,
            max_items=req.max_items,
        )
        # Validate and render every item before the first filesystem mutation.
        # This avoids partial batches caused by a late validation/render error.
        rendered: list[tuple[object, str, dict]] = []
        for plan in plans:
            _, code, metadata = preview_strategy(
                req.template_key, plan.values, output_dir=plan.output_dir,
                save_as_new_version=False, notes=plan.notes,
            )
            rendered.append((plan, code, metadata))

        output_dir = plans[0].output_dir if plans else str(validate_output_dir(req.output_dir))
        committed = write_strategy_batch(
            [(plan.filename, code, metadata) for plan, code, metadata in rendered],
            output_dir=output_dir,
            overwrite=req.overwrite,
        )
        items: list[BatchGenerateItem] = []
        for (plan, _, _), (saved_to, meta_path) in zip(rendered, committed):
            items.append(BatchGenerateItem(
                filename=plan.filename, saved_to=str(saved_to),
                metadata_path=str(meta_path), version=plan.version,
            ))
        return BatchGenerateResponse(template_key=req.template_key, count=len(items), output_dir=output_dir, items=items, warnings=warnings)
    except FileExistsError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
