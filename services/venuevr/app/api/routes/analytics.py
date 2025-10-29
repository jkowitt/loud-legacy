"""Analytics and telemetry endpoints."""

from datetime import datetime
from typing import List

from fastapi import APIRouter, status

from ...models import MetricSample

router = APIRouter()


@router.post("/metrics", status_code=status.HTTP_204_NO_CONTENT)
def ingest_metrics(samples: List[MetricSample]) -> None:
    """Ingest telemetry samples from clients."""
    # In production this would enqueue to analytics pipeline.
    return None


@router.get("/metrics")
def list_metrics() -> dict:
    """Return placeholder aggregate metrics."""
    return {
        "generated_at": datetime.utcnow(),
        "sessions": 120,
        "average_watch_time_minutes": 48,
        "rebuffer_rate": 0.015,
    }
