from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException

from services.data_feeds.app.clients.external import DataFeedClient
from services.data_feeds.app.cache import get_cached
from services.data_feeds.app.security import rate_limiter

router = APIRouter(prefix="/feeds", tags=["Data Feeds"], dependencies=[Depends(rate_limiter)])

client = DataFeedClient()


@router.get("/interest-rates")
async def get_interest_rates() -> dict:
    try:
        return await get_cached("interest_rates", client.fetch_interest_rates)
    except Exception as exc:  # pragma: no cover - network failure
        raise HTTPException(status_code=502, detail="Failed to fetch interest rates") from exc


@router.get("/property-sales/residential")
async def get_residential_sales() -> dict:
    try:
        return await get_cached("residential_sales", client.fetch_residential_sales)
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=502, detail="Failed to fetch residential sales data") from exc


@router.get("/property-sales/commercial")
async def get_commercial_sales() -> dict:
    try:
        return await get_cached("commercial_sales", client.fetch_commercial_sales)
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=502, detail="Failed to fetch commercial sales data") from exc
