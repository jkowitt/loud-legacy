from datetime import datetime, timedelta
from typing import Dict, Optional
import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Sports Event VR API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PartyIn(BaseModel):
    name: str
    description: Optional[str] = None


class PartyOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None


class EventFeed(BaseModel):
    id: str
    type: str


class Venue(BaseModel):
    id: str
    name: str


class EventOut(BaseModel):
    id: str
    league: str
    home_team: str
    away_team: str
    start_time: datetime
    status: str
    venue: Venue
    feeds: list[EventFeed]


class CreativePlacement(BaseModel):
    id: str
    event_id: str
    anchor_ref: str
    asset_id: str
    start_ts: datetime
    end_ts: datetime
    status: str
    rules: Dict[str, str] = {}


class CatalogItem(BaseModel):
    product_id: str
    type: str
    name: str
    price_cents: int
    currency: str = "USD"
    rules: Dict[str, str] = {}


PARTY_DB: Dict[str, PartyOut] = {}

DEMO_VENUE = Venue(id="venue_demo", name="Downtown Arena")

DEMO_EVENT = EventOut(
    id="evt_demo",
    league="Premier Five",
    home_team="Metro Hawks",
    away_team="River City Waves",
    start_time=datetime.utcnow() + timedelta(days=2),
    status="scheduled",
    venue=DEMO_VENUE,
    feeds=[
        EventFeed(id="feed_360_a", type="360"),
        EventFeed(id="feed_360_b", type="360"),
        EventFeed(id="feed_audio", type="audio"),
    ],
)

DEMO_PLACEMENTS = [
    CreativePlacement(
        id="placement_demo",
        event_id="evt_demo",
        anchor_ref="ribbon_center",
        asset_id="asset_demo",
        start_ts=datetime.utcnow(),
        end_ts=datetime.utcnow() + timedelta(hours=3),
        status="scheduled",
        rules={"rotation": "weighted"},
    )
]

DEMO_CATALOG = [
    CatalogItem(
        product_id="ticket_evt_demo",
        type="ticket",
        name="Event Pass",
        price_cents=500,
        rules={"trial_minutes": "20"},
    ),
    CatalogItem(
        product_id="sub_premium",
        type="subscription",
        name="Season Premium",
        price_cents=10000,
        rules={"access": "all_events"},
    ),
]


@app.get("/")
def root() -> dict[str, str]:
    return {"service": app.title, "docs": "/docs", "health": "/health"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/parties", response_model=PartyOut)
def create_party(party: PartyIn) -> PartyOut:
    pid = str(uuid.uuid4())
    record = PartyOut(id=pid, name=party.name, description=party.description)
    PARTY_DB[pid] = record
    return record


@app.get("/api/parties/{party_id}", response_model=PartyOut)
def get_party(party_id: str) -> PartyOut:
    item = PARTY_DB.get(party_id)
    if not item:
        raise HTTPException(status_code=404, detail="Party not found")
    return item


@app.get("/api/events", response_model=list[EventOut])
def list_events() -> list[EventOut]:
    return [DEMO_EVENT]


@app.get("/api/events/{event_id}", response_model=EventOut)
def get_event(event_id: str) -> EventOut:
    if event_id != DEMO_EVENT.id:
        raise HTTPException(status_code=404, detail="Event not found")
    return DEMO_EVENT


@app.get("/api/creative/events/{event_id}/placements", response_model=list[CreativePlacement])
def list_placements(event_id: str) -> list[CreativePlacement]:
    if event_id != DEMO_EVENT.id:
        return []
    return DEMO_PLACEMENTS


@app.get("/api/catalog", response_model=list[CatalogItem])
def list_catalog() -> list[CatalogItem]:
    return DEMO_CATALOG
