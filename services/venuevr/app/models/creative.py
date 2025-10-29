"""Creative management schemas."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class CreativeAsset(BaseModel):
    id: str
    sponsor_id: str
    media_type: str
    uri: str
    thumb_uri: Optional[str] = None
    metadata: dict = {}
    status: str = "draft"
    created_at: datetime


class CreativePlacementRequest(BaseModel):
    event_id: str
    anchor_ref: str
    asset_id: str
    rules: dict = {}
    start_ts: datetime
    end_ts: datetime


class CreativePlacement(CreativePlacementRequest):
    id: str
    status: str = "scheduled"


class CreativePreviewRequest(BaseModel):
    event_id: str
    placement_draft: List[CreativePlacementRequest]
