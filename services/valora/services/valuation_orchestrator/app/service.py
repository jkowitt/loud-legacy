from __future__ import annotations

from typing import Callable, Dict

from services.valuation_orchestrator.app.pipelines.auto import AutoPipeline
from services.valuation_orchestrator.app.pipelines.real_estate import RealEstatePipeline
from valora_common.schemas.valuation import ValuationRequest, ValuationResponse


class UnsupportedAssetClassError(ValueError):
    pass


class ValuationService:
    """Dispatches valuation requests to the correct asset pipeline."""

    def __init__(self) -> None:
        self._pipelines: Dict[str, Callable[[ValuationRequest], ValuationResponse]] = {
            "real_estate": RealEstatePipeline().valuate,
            "auto": AutoPipeline().valuate,
        }

    def valuate(self, payload: ValuationRequest) -> ValuationResponse:
        try:
            pipeline = self._pipelines[payload.class_]
        except KeyError as exc:
            raise UnsupportedAssetClassError(payload.class_) from exc
        return pipeline(payload)
