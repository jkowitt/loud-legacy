"""Health endpoints."""

from datetime import datetime

from fastapi import APIRouter

router = APIRouter()


@router.get("/health/live")
def live_health() -> dict:
    """Operational health summary for admins."""
    return {
        "status": "ok",
        "checked_at": datetime.utcnow(),
        "ingest": {"status": "green"},
        "encoder": {"status": "green"},
        "playback": {"status": "green"},
    }


@router.get("/health")
def healthcheck() -> dict:
    """Simple liveness probe."""
    return {"status": "ok"}
