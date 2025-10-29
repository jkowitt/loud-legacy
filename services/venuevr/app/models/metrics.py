"""Telemetry schemas."""

from datetime import datetime
from typing import Dict

from pydantic import BaseModel


class MetricSample(BaseModel):
    session_id: str
    metric: str
    value: float
    dims: Dict[str, str] = {}
    ts: datetime
