from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Dict

import httpx

SAMPLE_DIR = Path(__file__).resolve().parent.parent / "sample_data"


def _load_sample(name: str) -> Dict[str, Any]:
    with (SAMPLE_DIR / f"{name}.json").open("r", encoding="utf-8") as handle:
        return json.load(handle)


class DataFeedClient:
    def __init__(self) -> None:
        self.interest_rate_url = os.getenv("INTEREST_RATE_API_URL")
        self.property_sales_url = os.getenv("PROPERTY_SALES_API_URL")
        self.api_key = os.getenv("DATA_FEED_API_KEY")

    async def fetch_interest_rates(self) -> Dict[str, Any]:
        if not self.interest_rate_url:
            return _load_sample("interest_rates")
        headers = {"Authorization": f"Bearer {self.api_key}"} if self.api_key else {}
        async with httpx.AsyncClient(timeout=6) as client:
            response = await client.get(self.interest_rate_url, headers=headers)
            response.raise_for_status()
            return response.json()

    async def fetch_residential_sales(self) -> Dict[str, Any]:
        if not self.property_sales_url:
            return _load_sample("residential_sales")
        headers = {"x-api-key": self.api_key} if self.api_key else {}
        params = {"type": "residential"}
        async with httpx.AsyncClient(timeout=8) as client:
            response = await client.get(self.property_sales_url, params=params, headers=headers)
            response.raise_for_status()
            return response.json()

    async def fetch_commercial_sales(self) -> Dict[str, Any]:
        if not self.property_sales_url:
            return _load_sample("commercial_sales")
        headers = {"x-api-key": self.api_key} if self.api_key else {}
        params = {"type": "commercial"}
        async with httpx.AsyncClient(timeout=8) as client:
            response = await client.get(self.property_sales_url, params=params, headers=headers)
            response.raise_for_status()
            return response.json()
