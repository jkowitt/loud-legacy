"""Social and party endpoints."""

from datetime import datetime

from fastapi import APIRouter, status

from ...models import Party, PartyCreateRequest, PartyInviteRequest

router = APIRouter()


@router.post("/parties", response_model=Party, status_code=status.HTTP_201_CREATED)
def create_party(payload: PartyCreateRequest) -> Party:
    """Create a party for co-watching."""
    return Party(
        id="party_demo",
        event_id=payload.event_id,
        name=payload.name,
        host_id="user_demo",
        member_ids=["user_demo"],
        created_at=datetime.utcnow(),
    )


@router.post("/parties/{party_id}/invite", status_code=status.HTTP_202_ACCEPTED)
def invite_to_party(party_id: str, payload: PartyInviteRequest) -> dict:
    """Invite a friend to a party."""
    return {"party_id": party_id, "invitee_id": payload.invitee_id, "status": "pending"}


@router.post("/parties/{party_id}/leave", status_code=status.HTTP_204_NO_CONTENT)
def leave_party(party_id: str) -> None:
    """Leave a party."""
    return None


@router.get("/parties/{party_id}", response_model=Party)
def get_party(party_id: str) -> Party:
    """Return party details."""
    return Party(
        id=party_id,
        event_id="evt_demo",
        name="Watch Party",
        host_id="user_demo",
        member_ids=["user_demo", "user_friend"],
        created_at=datetime.utcnow(),
    )
