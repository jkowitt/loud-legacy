from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from services.marketplace.app import schemas
from services.marketplace.app.database import get_session
from services.marketplace.app.models import Listing, Property, User
from services.marketplace.app.security import require_api_key

router = APIRouter(prefix="/listings", tags=["Listings"], dependencies=[Depends(require_api_key)])


@router.get("", response_model=list[schemas.ListingRead])
def list_active_listings(session: Session = Depends(get_session)) -> list[schemas.ListingRead]:
    listings = (
        session.query(Listing)
        .options(joinedload(Listing.property))
        .filter(Listing.status == "active")
        .order_by(Listing.created_at.desc())
        .limit(50)
        .all()
    )
    return [schemas.ListingRead.model_validate(listing, from_attributes=True) for listing in listings]


@router.post("", response_model=schemas.ListingRead, status_code=status.HTTP_201_CREATED)
def create_listing(payload: schemas.ListingCreate, session: Session = Depends(get_session)) -> schemas.ListingRead:
    property_record = session.get(Property, payload.property_id)
    if not property_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    seller = session.get(User, payload.seller_id)
    if not seller:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seller not found")

    listing = Listing(
        property_id=payload.property_id,
        seller_id=payload.seller_id,
        asking_price=payload.asking_price,
        status="active",
        published_at=datetime.utcnow(),
        created_at=datetime.utcnow(),
    )
    session.add(listing)
    session.flush()
    session.refresh(listing)
    return schemas.ListingRead.model_validate(listing, from_attributes=True)


@router.post("/with-property", response_model=schemas.ListingRead, status_code=status.HTTP_201_CREATED)
def create_listing_with_property(
    payload: schemas.ListingCreateWithProperty, session: Session = Depends(get_session)
) -> schemas.ListingRead:
    seller = session.get(User, payload.seller_id)
    if not seller:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seller not found")

    property_record = Property(
        owner_id=payload.seller_id,
        address=payload.address,
        city=payload.city,
        state=payload.state,
        postal_code=payload.postal_code,
        bedrooms=payload.bedrooms,
        bathrooms=payload.bathrooms,
        living_area_sqft=payload.living_area_sqft,
        lot_size_sqft=payload.lot_size_sqft,
        year_built=payload.year_built,
        description=payload.description,
        created_at=datetime.utcnow(),
    )
    session.add(property_record)
    session.flush()

    listing = Listing(
        property_id=property_record.id,
        seller_id=payload.seller_id,
        asking_price=payload.asking_price,
        status="active",
        published_at=datetime.utcnow(),
    )
    session.add(listing)
    session.flush()
    session.refresh(listing)
    return schemas.ListingRead.model_validate(listing, from_attributes=True)
