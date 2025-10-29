from services.valuation_orchestrator.app.pipelines.real_estate import RealEstatePipeline
from valora_common.schemas.valuation import ValuationRequest


def test_real_estate_pipeline_returns_estimate():
    pipeline = RealEstatePipeline()
    request = ValuationRequest(
        class_="real_estate",
        attributes={
            "address": "123 Main St",
            "zip": "60115",
            "living_area_sqft": 1800,
            "bedrooms": 3,
            "bathrooms": 2,
            "year_built": 2005,
        },
    )

    valuation = pipeline.valuate(request)

    assert valuation.estimate > 0
    assert valuation.interval_low < valuation.interval_high
    assert valuation.method == "baseline_gbr_v0"
    assert valuation.comps
