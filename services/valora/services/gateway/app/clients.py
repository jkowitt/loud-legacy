from __future__ import annotations

from typing import Union

import httpx
from fastapi import UploadFile

from valora_common.schemas.valuation import (
    AcceptedResponse,
    JobStatus,
    ValuationRequest,
    ValuationResponse,
)


class ValuationOrchestratorClient:
    """Thin async client around the valuation orchestrator API."""

    def __init__(self, base_url: str, timeout_seconds: float) -> None:
        self._client = httpx.AsyncClient(
            base_url=base_url,
            timeout=httpx.Timeout(timeout_seconds),
            headers={"User-Agent": "valora-gateway/0.1.0"},
        )

    async def create_valuation(
        self, payload: ValuationRequest
    ) -> Union[ValuationResponse, AcceptedResponse]:
        response = await self._client.post("/valuations", json=payload.model_dump(by_alias=True))
        response.raise_for_status()
        payload_dict = response.json()
        if response.status_code == httpx.codes.ACCEPTED:
            return AcceptedResponse.model_validate(payload_dict)
        return ValuationResponse.model_validate(payload_dict)

    async def get_job(self, job_id: str) -> JobStatus:
        response = await self._client.get(f"/jobs/{job_id}")
        response.raise_for_status()
        return JobStatus.model_validate(response.json())

    async def upload_image(self, valuation_id: str, image: UploadFile) -> dict[str, str]:
        file_bytes = await image.read()
        files = {"image": (image.filename or "upload.jpg", file_bytes, image.content_type or "application/octet-stream")}
        response = await self._client.post(f"/valuations/{valuation_id}/images", files=files)
        response.raise_for_status()
        return response.json()

    async def close(self) -> None:
        await self._client.aclose()


async def get_valuation_client(base_url: str, timeout_seconds: float) -> ValuationOrchestratorClient:
    return ValuationOrchestratorClient(base_url=base_url, timeout_seconds=timeout_seconds)
