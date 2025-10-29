from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from services.valuation_orchestrator.app.storage.jobs import InMemoryJobStore
from valora_common.schemas.valuation import JobStatus

router = APIRouter(prefix="/jobs", tags=["Jobs"])


def get_job_store() -> InMemoryJobStore:
    from services.valuation_orchestrator.app.main import app

    return app.state.job_store  # type: ignore[no-any-return]


@router.get("/{job_id}", response_model=JobStatus)
async def get_job(job_id: str, job_store: InMemoryJobStore = Depends(get_job_store)) -> JobStatus:
    try:
        return job_store.get(job_id)
    except KeyError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found") from exc
