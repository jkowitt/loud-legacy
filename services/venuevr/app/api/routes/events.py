"""Event and venue endpoints."""

from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query, status

from ...models import Event, EventFeed, Venue

router = APIRouter()

MOCK_VENUE = Venue(
    id="venue_demo",
    name="Downtown Arena",
    map_json={"layers": []},
    anchors_json={"center": {"x": 0, "y": 0, "z": 0}},
)
MOCK_EVENT = Event(
    id="evt_demo",
    venue=MOCK_VENUE,
    league="Premier Five",
    home_team="Metro Hawks",
    away_team="River City Waves",
    start_time=datetime.utcnow() + timedelta(days=2),
    status="scheduled",
    feeds=[
        EventFeed(id="feed_360_a", type="360"),
        EventFeed(id="feed_360_b", type="360"),
        EventFeed(id="feed_audio", type="audio"),
    ],
)


@router.get("/events", response_model=List[Event])
def list_events(
    status_filter: Optional[str] = Query(default=None, alias="status"),
    team: Optional[str] = None,
) -> List[Event]:
    """Return events filtered by status or team."""
    events = [MOCK_EVENT]
    if status_filter and status_filter != MOCK_EVENT.status:
        return []
    if team and team not in (MOCK_EVENT.home_team, MOCK_EVENT.away_team):
        return []
    return events


@router.get("/events/{event_id}", response_model=Event)
def get_event(event_id: str) -> Event:
    """Return event detail."""
    if event_id != MOCK_EVENT.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return MOCK_EVENT


@router.post("/events", response_model=Event, status_code=status.HTTP_201_CREATED)
def create_event(event: Event) -> Event:
    """Create a new event (placeholder mirrors payload)."""
    return event


@router.patch("/events/{event_id}", response_model=Event)
def update_event(event_id: str, event: Event) -> Event:
    """Update an event (placeholder mirrors payload)."""
    if event_id != event.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID mismatch.")
    return event


@router.post("/events/{event_id}/publish", status_code=status.HTTP_202_ACCEPTED)
def publish_event(event_id: str) -> dict:
    """Mark an event as ready for fans."""
    return {"event_id": event_id, "status": "publishing"}


@router.get("/events/{event_id}/feeds", response_model=List[EventFeed])
def list_event_feeds(event_id: str) -> List[EventFeed]:
    """Return feeds for an event."""
    if event_id != MOCK_EVENT.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return MOCK_EVENT.feeds


@router.post("/events/{event_id}/feeds", response_model=EventFeed, status_code=status.HTTP_201_CREATED)
def register_feed(event_id: str, feed: EventFeed) -> EventFeed:
    """Register a new feed against an event."""
    if event_id != MOCK_EVENT.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return feed


@router.patch("/feeds/{feed_id}", response_model=EventFeed)
def update_feed(feed_id: str, feed: EventFeed) -> EventFeed:
    """Update feed metadata."""
    if feed_id != feed.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID mismatch.")
    return feed


@router.post("/events/{event_id}/token")
def issue_playback_token(event_id: str) -> dict:
    """Return a short lived playback token for a viewer."""
    return {"event_id": event_id, "token": "playback-token", "expires_in": 120}


@router.get("/venues", response_model=List[Venue])
def list_venues() -> List[Venue]:
    """Return available venues."""
    return [MOCK_VENUE]


@router.get("/venues/{venue_id}", response_model=Venue)
def get_venue(venue_id: str) -> Venue:
    """Return venue detail."""
    if venue_id != MOCK_VENUE.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Venue not found.")
    return MOCK_VENUE


@router.post("/venues", response_model=Venue, status_code=status.HTTP_201_CREATED)
def create_venue(venue: Venue) -> Venue:
    """Create a venue."""
    return venue


@router.patch("/venues/{venue_id}", response_model=Venue)
def update_venue(venue_id: str, venue: Venue) -> Venue:
    """Update a venue."""
    if venue_id != venue.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID mismatch.")
    return venue
