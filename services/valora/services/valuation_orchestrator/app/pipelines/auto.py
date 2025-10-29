from __future__ import annotations

from datetime import datetime

from valora_common.schemas.valuation import Comparable, Explanation, ValuationRequest, ValuationResponse


class AutoPipeline:
    """Placeholder automotive valuation pipeline using simple hedonic adjustments."""

    def valuate(self, payload: ValuationRequest) -> ValuationResponse:
        details = payload.attributes
        base_price = self._lookup_base_price(details)
        mileage_penalty = max(details.get("mileage", 0) - 30000, 0) * 0.08
        condition_bonus = (details.get("condition_score", 3) - 3) * 750
        estimate = max(base_price - mileage_penalty + condition_bonus, 5000)

        return ValuationResponse(
            valuation_id=f"auto_{datetime.utcnow().timestamp():.0f}",
            estimate=estimate,
            confidence=0.68,
            interval_low=estimate * 0.9,
            interval_high=estimate * 1.08,
            method="hedonic_v0",
            explanations=[
                Explanation(feature="base_trim_value", direction="+", magnitude=0.44),
                Explanation(feature="mileage", direction="-", magnitude=0.22),
            ],
            comps=[
                Comparable(
                    comparable_id="auto_comp_1",
                    address="market_listing",
                    price=estimate * 0.97,
                    distance_mi=0.0,
                    attributes={"vin": details.get("vin"), "seller": "synthetic"},
                    source="synthetic",
                )
            ],
            metadata={"pipeline": "auto"},
        )

    def _lookup_base_price(self, details: dict[str, int | str]) -> float:
        trim_key = f"{details.get('make')}|{details.get('model')}|{details.get('year')}|{details.get('trim')}"
        base_prices = {
            "Tesla|Model 3|2022|Performance": 52000,
            "Toyota|Camry|2021|SE": 26500,
        }
        return base_prices.get(trim_key, 23000.0)
