from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator, Union

import httpx
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware

from services.gateway.app.clients import ValuationOrchestratorClient, get_valuation_client
from services.gateway.app.settings import get_settings
from valora_common.security import SecurityHeadersMiddleware
from valora_common.schemas.valuation import (
    AcceptedResponse,
    JobStatus,
    ValuationRequest,
    ValuationResponse,
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    app.state.orchestrator_client = await get_valuation_client(
        base_url=settings.valuation_orchestrator_url,
        timeout_seconds=settings.service_timeout_seconds,
    )
    yield
    await app.state.orchestrator_client.close()


app = FastAPI(title="VALORA API Gateway", lifespan=lifespan)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=600,
)


def get_client() -> ValuationOrchestratorClient:
    client: ValuationOrchestratorClient = app.state.orchestrator_client
    return client


@app.get("/healthz", tags=["System"])
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post(
    "/valuations",
    response_model=Union[ValuationResponse, AcceptedResponse],
    tags=["Valuations"],
    status_code=status.HTTP_200_OK,
)
async def create_valuation(
    payload: ValuationRequest, orchestrator: ValuationOrchestratorClient = Depends(get_client)
) -> Union[ValuationResponse, AcceptedResponse]:
    try:
        return await orchestrator.create_valuation(payload=payload)
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code == status.HTTP_429_TOO_MANY_REQUESTS:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Usage limit exceeded",
            ) from exc
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Valuation orchestrator returned an error",
        ) from exc
    except httpx.HTTPError as exc:  # pragma: no cover - network failure
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Valuation orchestrator unavailable",
        ) from exc


@app.get("/jobs/{job_id}", response_model=JobStatus, tags=["Jobs"])
async def get_job(
    job_id: str, orchestrator: ValuationOrchestratorClient = Depends(get_client)
) -> JobStatus:
    try:
        return await orchestrator.get_job(job_id=job_id)
    except httpx.HTTPStatusError as exc:
        if exc.response.status_code == status.HTTP_404_NOT_FOUND:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found") from exc
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to fetch job status from orchestrator",
        ) from exc


@app.post("/valuations/{valuation_id}/images", tags=["Valuations"], status_code=status.HTTP_201_CREATED)
async def upload_images(
    valuation_id: str,
    image: UploadFile = File(...),
    orchestrator: ValuationOrchestratorClient = Depends(get_client),
) -> dict[str, str]:
    try:
        return await orchestrator.upload_image(valuation_id, image)
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.json()) from exc
    except httpx.HTTPError as exc:  # pragma: no cover
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Upload failed") from exc
