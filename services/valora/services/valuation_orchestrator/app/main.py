from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI

from services.valuation_orchestrator.app.routes import jobs, uploads, valuations
from services.valuation_orchestrator.app.service import ValuationService
from services.valuation_orchestrator.app.storage.jobs import InMemoryJobStore


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    app.state.valuation_service = ValuationService()
    app.state.job_store = InMemoryJobStore()
    yield


app = FastAPI(title="VALORA Valuation Orchestrator", lifespan=lifespan)

app.include_router(valuations.router)
app.include_router(jobs.router)
app.include_router(uploads.router)
