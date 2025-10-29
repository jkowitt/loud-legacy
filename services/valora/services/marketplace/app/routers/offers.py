from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from services.marketplace.app import schemas
from services.marketplace.app.database import get_session
from services.marketplace.app.models import Listing, Offer, User
from services.marketplace.app.security import require_api_key

router = APIRouter(prefix="/offers", tags=["Offers"], dependencies=[Depends(require_api_key)])


@router.post("", response_model=schemas.OfferRead, status_code=status.HTTP_201_CREATED)
def create_offer(payload: schemas.OfferCreate, session: Session = Depends(get_session)) -> schemas.OfferRead:
    listing = session.get(Listing, payload.listing_id)
    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")
    buyer = session.get(User, payload.buyer_id)
    if not buyer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Buyer not found")

    offer = Offer(
        listing_id=payload.listing_id,
        buyer_id=payload.buyer_id,
        amount=payload.amount,
        message=payload.message,
        status="submitted",
        created_at=datetime.utcnow(),
    )
    session.add(offer)
    session.flush()
    return schemas.OfferRead.model_validate(offer, from_attributes=True)


@router.get("/listing/{listing_id}", response_model=list[schemas.OfferRead])
def list_offers(listing_id: str, session: Session = Depends(get_session)) -> list[schemas.OfferRead]:
    offers = session.query(Offer).filter(Offer.listing_id == listing_id).order_by(Offer.created_at.desc()).all()
    return [schemas.OfferRead.model_validate(o, from_attributes=True) for o in offers]
