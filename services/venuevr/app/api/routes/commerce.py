"""Commerce, payments, and entitlements endpoints."""

from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, status

from ...models import CatalogItem, Order, OrderCreateRequest

router = APIRouter()

MOCK_CATALOG = [
    CatalogItem(product_id="ticket_evt_demo", type="ticket", name="Event Pass", price_cents=500),
    CatalogItem(
        product_id="sub_premium",
        type="subscription",
        name="Season Premium",
        price_cents=10000,
    ),
]

MOCK_ORDER = Order(
    id="order_demo",
    status="paid",
    total_cents=500,
    created_at=datetime.utcnow(),
)


@router.get("/catalog", response_model=List[CatalogItem])
def get_catalog() -> List[CatalogItem]:
    """Return available products."""
    return MOCK_CATALOG


@router.post("/orders", response_model=Order, status_code=status.HTTP_201_CREATED)
def create_order(request: OrderCreateRequest) -> Order:
    """Create an order (placeholder returns demo order)."""
    total = sum(item.qty for item in request.items) * MOCK_CATALOG[0].price_cents
    return Order(
        id="order_new",
        status="pending",
        total_cents=total,
        created_at=datetime.utcnow(),
    )


@router.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str) -> Order:
    """Return order details."""
    return MOCK_ORDER.copy(update={"id": order_id})


@router.post("/payments/session")
def create_payment_session() -> dict:
    """Create a checkout session with the payment provider."""
    return {"checkout_url": "https://payments.example.com/checkout/demo"}


@router.post("/payments/confirm", status_code=status.HTTP_202_ACCEPTED)
def confirm_payment(provider_ref: str) -> dict:
    """Handle payment confirmation webhook or callback."""
    return {"provider_ref": provider_ref, "status": "received"}


@router.get("/payments/history")
def payments_history() -> dict:
    """Return placeholder payment history."""
    return {"orders": [MOCK_ORDER.dict()]}


@router.post("/entitlements", status_code=status.HTTP_201_CREATED)
def create_entitlement(event_id: str, account_id: str, expires_in_minutes: int = 240) -> dict:
    """Grant an entitlement for an event."""
    expiry = datetime.utcnow() + timedelta(minutes=expires_in_minutes)
    return {
        "account_id": account_id,
        "event_id": event_id,
        "expires_at": expiry.isoformat(),
        "claims": ["sideline", "endzone"],
    }
