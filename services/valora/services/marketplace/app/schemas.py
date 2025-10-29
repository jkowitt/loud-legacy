from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


# Users


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = Field(pattern="^(buyer|seller|dual|admin)$")


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserRead(UserBase):
    id: str
    created_at: datetime


# Properties & Valuations


class ValuationRead(BaseModel):
    id: str
    estimate: float
    confidence: float
    valuation_method: str
    created_at: datetime


class ValuationCreate(BaseModel):
    estimate: float
    confidence: float
    valuation_method: str


class PropertyBase(BaseModel):
    address: str
    city: str
    state: str
    postal_code: str
    bedrooms: Optional[float] = None
    bathrooms: Optional[float] = None
    living_area_sqft: Optional[float] = None
    lot_size_sqft: Optional[float] = None
    year_built: Optional[int] = None
    description: Optional[str] = None


class PropertyCreate(PropertyBase):
    owner_id: str


class PropertyRead(PropertyBase):
    id: str
    created_at: datetime
    owner_id: str
    valuations: List[ValuationRead] = Field(default_factory=list)


class ListingCreate(BaseModel):
    property_id: str
    seller_id: str
    asking_price: float


class ListingCreateWithProperty(PropertyBase):
    seller_id: str
    asking_price: float


class ListingRead(BaseModel):
    id: str
    status: str
    asking_price: float
    published_at: Optional[datetime]
    created_at: datetime
    property: PropertyRead


class OfferCreate(BaseModel):
    listing_id: str
    buyer_id: str
    amount: float
    message: Optional[str] = None


class OfferRead(BaseModel):
    id: str
    listing_id: str
    buyer_id: str
    amount: float
    status: str
    message: Optional[str]
    created_at: datetime


# Subscriptions & Payments


class SubscriptionPlanCreate(BaseModel):
    code: str
    name: str
    monthly_price: float
    annual_price: float
    included_valuations: int
    description: Optional[str] = None
    is_active: bool = True


class SubscriptionPlanRead(BaseModel):
    id: str
    code: str
    name: str
    monthly_price: float
    annual_price: float
    included_valuations: int
    description: Optional[str]
    is_active: bool


class SubscriptionCreate(BaseModel):
    user_id: str
    plan_id: str
    auto_renew: bool = True


class SubscriptionRead(BaseModel):
    id: str
    user_id: str
    plan_id: str
    status: str
    start_date: datetime
    current_period_end: Optional[datetime]
    auto_renew: bool


class PaymentCreate(BaseModel):
    subscription_id: str
    amount: float
    currency: str = "USD"
    provider: str = "stripe"
    provider_ref: Optional[str] = None


class PaymentRead(BaseModel):
    id: str
    subscription_id: str
    amount: float
    currency: str
    provider: str
    provider_ref: Optional[str]
    status: str
    processed_at: Optional[datetime]
