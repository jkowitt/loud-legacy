"""Pydantic schemas shared across routers."""

from .auth import (
    LoginRequest,
    LoginResponse,
    MagicLinkRequest,
    SignupRequest,
    TokenResponse,
    UserProfile,
)
from .commerce import CatalogItem, Order, OrderCreateRequest
from .creative import (
    CreativeAsset,
    CreativePlacement,
    CreativePlacementRequest,
    CreativePreviewRequest,
)
from .events import Event, EventFeed, EventListFilters, Venue
from .metrics import MetricSample
from .social import Party, PartyCreateRequest, PartyInviteRequest

__all__ = [
    "LoginRequest",
    "LoginResponse",
    "MagicLinkRequest",
    "SignupRequest",
    "TokenResponse",
    "UserProfile",
    "CatalogItem",
    "Order",
    "OrderCreateRequest",
    "CreativeAsset",
    "CreativePlacement",
    "CreativePlacementRequest",
    "CreativePreviewRequest",
    "Event",
    "EventFeed",
    "EventListFilters",
    "Venue",
    "MetricSample",
    "Party",
    "PartyCreateRequest",
    "PartyInviteRequest",
]
