from __future__ import annotations

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from services.marketplace.app import schemas
from services.marketplace.app.database import get_session
from services.marketplace.app.models import Payment, Subscription, SubscriptionPlan, User
from services.marketplace.app.security import require_api_key

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"], dependencies=[Depends(require_api_key)])


@router.get("/plans", response_model=list[schemas.SubscriptionPlanRead])
def list_plans(session: Session = Depends(get_session)) -> list[schemas.SubscriptionPlanRead]:
    plans = session.query(SubscriptionPlan).filter(SubscriptionPlan.is_active.is_(True)).all()
    return [schemas.SubscriptionPlanRead.model_validate(plan, from_attributes=True) for plan in plans]


@router.post("/plans", response_model=schemas.SubscriptionPlanRead, status_code=status.HTTP_201_CREATED)
def create_plan(payload: schemas.SubscriptionPlanCreate, session: Session = Depends(get_session)) -> schemas.SubscriptionPlanRead:
    if session.query(SubscriptionPlan).filter(SubscriptionPlan.code == payload.code).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Plan code already exists")
    plan = SubscriptionPlan(**payload.model_dump())
    session.add(plan)
    session.flush()
    return schemas.SubscriptionPlanRead.model_validate(plan, from_attributes=True)


@router.post("", response_model=schemas.SubscriptionRead, status_code=status.HTTP_201_CREATED)
def create_subscription(payload: schemas.SubscriptionCreate, session: Session = Depends(get_session)) -> schemas.SubscriptionRead:
    user = session.get(User, payload.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    plan = session.get(SubscriptionPlan, payload.plan_id)
    if not plan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plan not found")

    existing = (
        session.query(Subscription)
        .filter(Subscription.user_id == payload.user_id, Subscription.status.in_(["trialing", "active", "past_due"]))
        .first()
    )
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Subscription already active")

    subscription = Subscription(
        user_id=payload.user_id,
        plan_id=payload.plan_id,
        status="trialing",
        start_date=datetime.utcnow(),
        current_period_end=datetime.utcnow() + timedelta(days=30),
        auto_renew=payload.auto_renew,
    )
    session.add(subscription)
    session.flush()
    return schemas.SubscriptionRead.model_validate(subscription, from_attributes=True)


@router.get("/{user_id}", response_model=list[schemas.SubscriptionRead])
def list_subscriptions(user_id: str, session: Session = Depends(get_session)) -> list[schemas.SubscriptionRead]:
    subscriptions = session.query(Subscription).filter(Subscription.user_id == user_id).all()
    return [schemas.SubscriptionRead.model_validate(s, from_attributes=True) for s in subscriptions]


@router.post("/{subscription_id}/payments", response_model=schemas.PaymentRead, status_code=status.HTTP_201_CREATED)
def record_payment(
    subscription_id: str,
    payload: schemas.PaymentCreate,
    session: Session = Depends(get_session),
) -> schemas.PaymentRead:
    subscription = session.get(Subscription, subscription_id)
    if not subscription:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

    payment = Payment(
        subscription_id=subscription_id,
        amount=payload.amount,
        currency=payload.currency,
        provider=payload.provider,
        provider_ref=payload.provider_ref,
        status="succeeded",
        processed_at=datetime.utcnow(),
    )
    session.add(payment)
    session.flush()
    return schemas.PaymentRead.model_validate(payment, from_attributes=True)
