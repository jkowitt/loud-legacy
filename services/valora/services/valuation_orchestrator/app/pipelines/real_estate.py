from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any

from valora_common.schemas.valuation import Comparable, Explanation, ValuationRequest, ValuationResponse


class RealEstatePipeline:
    """Placeholder real estate valuation pipeline for early development and testing."""

    def __init__(self, *, cache_ttl_minutes: int = 15) -> None:
        self._cache_ttl = timedelta(minutes=cache_ttl_minutes)
        self._cache: dict[str, tuple[datetime, ValuationResponse]] = {}

    def valuate(self, payload: ValuationRequest) -> ValuationResponse:
        cache_key = self._cache_key(payload)
        cached = self._cache.get(cache_key)
        if cached and datetime.utcnow() - cached[0] < self._cache_ttl:
            return cached[1]

        estimate = self._baseline_estimate(payload.attributes)
        response = ValuationResponse(
            valuation_id=f"val_{datetime.utcnow().timestamp():.0f}",
            estimate=estimate,
            confidence=0.75,
            interval_low=estimate * 0.95,
            interval_high=estimate * 1.05,
            method="baseline_gbr_v0",
            explanations=self._mock_explanations(payload.attributes),
            comps=self._mock_comps(payload.attributes),
            metadata={"cache_hit": False},
        )
        self._cache[cache_key] = (datetime.utcnow(), response)
        return response

    def _baseline_estimate(self, attributes: dict[str, Any]) -> float:
        sqft = attributes.get("living_area_sqft", 1600)
        beds = attributes.get("bedrooms", 3)
        baths = attributes.get("bathrooms", 2)
        base_price_sqft = 225.0
        adjustment = (beds - 3) * 12000 + (baths - 2) * 9000
        return max(sqft * base_price_sqft + adjustment, 100000)

    def _mock_explanations(self, attributes: dict[str, Any]) -> list[Explanation]:
        return [
            Explanation(feature="living_area_sqft", direction="+", magnitude=0.31),
            Explanation(feature="year_built", direction="+", magnitude=0.12),
            Explanation(
                feature="condition_score",
                direction="+",
                magnitude=0.07,
                human_readable="Above-average property condition adds value",
            ),
        ]

    def _mock_comps(self, attributes: dict[str, Any]) -> list[Comparable]:
        address = attributes.get("address", "123 Main St")
        city = attributes.get("city", "Sample City")
        return [
            Comparable(
                comparable_id="comp_1",
                address=f"{address} Unit A, {city}",
                price=attributes.get("asking_price", 240000),
                distance_mi=0.25,
                attributes={"bedrooms": attributes.get("bedrooms", 3)},
                source="synthetic",
            ),
            Comparable(
                comparable_id="comp_2",
                address=f"{attributes.get('street', address)} Nearby, {city}",
                price=attributes.get("asking_price", 252000),
                distance_mi=0.45,
                attributes={"bedrooms": attributes.get("bedrooms", 3)},
                source="synthetic",
            ),
        ]

    def _cache_key(self, payload: ValuationRequest) -> str:
        key_parts = [
            payload.class_,
            str(payload.attributes.get("address")),
            str(payload.attributes.get("zip")),
        ]
        return "|".join(key_parts)
