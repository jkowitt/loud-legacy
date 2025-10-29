from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.marketplace.app.database import engine, session_scope
from services.marketplace.app.models import Base, SubscriptionPlan
from services.marketplace.app.routers import offers, listings, properties, subscriptions, users
from valora_common.security import SecurityHeadersMiddleware


DEFAULT_PLANS = [
    {
        "code": "starter",
        "name": "Starter",
        "monthly_price": 99.0,
        "annual_price": 999.0,
        "included_valuations": 100,
        "description": "For solo investors validating single properties",
    },
    {
        "code": "pro",
        "name": "Pro",
        "monthly_price": 399.0,
        "annual_price": 3999.0,
        "included_valuations": 3000,
        "description": "For lenders and funds needing daily volume",
    },
    {
        "code": "enterprise",
        "name": "Enterprise",
        "monthly_price": 0.0,
        "annual_price": 0.0,
        "included_valuations": 0,
        "description": "Custom contracts with dedicated support",
    },
]


def seed_plans() -> None:
    with session_scope() as session:
        existing_codes = {plan.code for plan in session.query(SubscriptionPlan).all()}
        for plan in DEFAULT_PLANS:
            if plan["code"] not in existing_codes:
                session.add(SubscriptionPlan(**plan))


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    seed_plans()
    yield


app = FastAPI(title="VALORA Marketplace API", lifespan=lifespan)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=600,
)

app.include_router(users.router)
app.include_router(properties.router)
app.include_router(listings.router)
app.include_router(offers.router)
app.include_router(subscriptions.router)


@app.get("/healthz")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
