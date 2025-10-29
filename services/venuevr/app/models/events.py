"""Event and venue schemas."""

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel


class Venue(BaseModel):
    id: str
    name: str
    map_json: dict | None = None
    anchors_json: dict | None = None


class EventFeed(BaseModel):
    id: str
    type: Literal["360", "180", "audio", "broadcast"]
    url: Optional[str] = None
    token: Optional[str] = None
    ttl_sec: Optional[int] = None


class Event(BaseModel):
    id: str
    venue: Venue
    league: str
    home_team: str
    away_team: str
    start_time: datetime
    status: Literal["draft", "scheduled", "live", "ended"]
    feeds: List[EventFeed] = []


class EventListFilters(BaseModel):
    status: Optional[str] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    team: Optional[str] = None
