from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, HttpUrl

AssetClass = Literal["real_estate", "auto"]


class Comparable(BaseModel):
    comparable_id: str = Field(..., description="Internal identifier for the comparable record")
    address: str
    price: float
    distance_mi: float = Field(..., ge=0)
    attributes: Dict[str, Any] = Field(default_factory=dict)
    source: Optional[str] = None
    sale_date: Optional[datetime] = None


class Explanation(BaseModel):
    feature: str
    direction: Literal["+", "-"]
    magnitude: float = Field(..., ge=0)
    human_readable: Optional[str] = None


class ValuationRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    class_: AssetClass = Field(alias="class")
    attributes: Dict[str, Any]
    options: Dict[str, Any] = Field(default_factory=dict)
    correlator_id: Optional[str] = None


class ValuationResponse(BaseModel):
    valuation_id: str
    status: Literal["completed", "pending", "failed"] = "completed"
    estimate: float
    confidence: float = Field(..., ge=0, le=1)
    interval_low: float
    interval_high: float
    currency: str = "USD"
    method: str
    explanations: List[Explanation]
    comps: List[Comparable]
    metadata: Dict[str, Any] = Field(default_factory=dict)


class AcceptedResponse(BaseModel):
    job_id: str
    status: Literal["accepted", "queued"] = "accepted"
    estimated_completion_seconds: Optional[int] = Field(default=None, ge=0)


class JobProgress(BaseModel):
    processed: int = 0
    total: int = 0
    succeeded: int = 0
    failed: int = 0


class JobStatus(BaseModel):
    job_id: str
    status: Literal["queued", "running", "succeeded", "failed", "partial"]
    submitted_at: datetime
    updated_at: datetime
    progress: JobProgress
    result_url: Optional[HttpUrl] = None
