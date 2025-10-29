"""Router registration helpers."""

from fastapi import APIRouter

from .routes import analytics, auth, commerce, creative, events, health, presence


def get_api_router() -> APIRouter:
    """Aggregate domain routers under a common prefix."""
    api_router = APIRouter()
    api_router.include_router(auth.router)
    api_router.include_router(events.router)
    api_router.include_router(creative.router)
    api_router.include_router(commerce.router)
    api_router.include_router(presence.router)
    api_router.include_router(analytics.router)
    api_router.include_router(health.router, tags=["health"])
    return api_router
