"""Social and presence schemas."""

from datetime import datetime
from typing import List

from pydantic import BaseModel


class PartyCreateRequest(BaseModel):
    event_id: str
    name: str


class PartyInviteRequest(BaseModel):
    invitee_id: str


class Party(BaseModel):
    id: str
    event_id: str
    name: str
    host_id: str
    member_ids: List[str]
    created_at: datetime
