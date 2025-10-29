"""Commerce and entitlement schemas."""

from datetime import datetime
from typing import List, Literal

from pydantic import BaseModel


class CatalogItem(BaseModel):
    product_id: str
    type: Literal["ticket", "subscription", "addon"]
    name: str
    price_cents: int
    currency: str = "USD"
    rules: dict = {}


class OrderItem(BaseModel):
    product_id: str
    qty: int = 1


class OrderCreateRequest(BaseModel):
    items: List[OrderItem]
    return_url: str


class Order(BaseModel):
    id: str
    status: Literal["pending", "paid", "failed", "refunded"]
    total_cents: int
    currency: str = "USD"
    created_at: datetime
