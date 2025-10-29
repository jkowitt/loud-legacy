from __future__ import annotations

import uuid
from typing import Annotated, Union

from fastapi import APIRouter, Depends, HTTPException, status

from services.valuation_orchestrator.app.service import UnsupportedAssetClassError, ValuationService
from services.valuation_orchestrator.app.storage.jobs import InMemoryJobStore
from valora_common.schemas.valuation import AcceptedResponse, ValuationRequest, ValuationResponse

router = APIRouter(prefix="/valuations", tags=["Valuations"])


def get_service() -> ValuationService:
    from services.valuation_orchestrator.app.main import app

    return app.state.valuation_service  # type: ignore[no-any-return]


def get_job_store() -> InMemoryJobStore:
    from services.valuation_orchestrator.app.main import app

    return app.state.job_store  # type: ignore[no-any-return]


@router.post("", response_model=Union[ValuationResponse, AcceptedResponse])
async def create_valuation(
    payload: ValuationRequest,
    service: Annotated[ValuationService, Depends(get_service)],
    job_store: Annotated[InMemoryJobStore, Depends(get_job_store)],
) -> Union[ValuationResponse, AcceptedResponse]:
    if payload.class_ == "real_estate":
        try:
            return service.valuate(payload)
        except UnsupportedAssetClassError as exc:  # pragma: no cover - defensive
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Unsupported asset class: {payload.class_}",
            ) from exc
    # Autos default to async placeholder to match roadmap sequencing.
    job_id = f"job_{uuid.uuid4().hex}"
    job_store.create(job_id)
    return AcceptedResponse(job_id=job_id, status="queued", estimated_completion_seconds=120)
