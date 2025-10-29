from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from services.marketplace.app import schemas
from services.marketplace.app.database import get_session
from services.marketplace.app.models import Property, User, Valuation
from services.marketplace.app.security import require_api_key

router = APIRouter(prefix="/properties", tags=["Properties"], dependencies=[Depends(require_api_key)])


@router.post("", response_model=schemas.PropertyRead, status_code=status.HTTP_201_CREATED)
def create_property(payload: schemas.PropertyCreate, session: Session = Depends(get_session)) -> schemas.PropertyRead:
    owner = session.get(User, payload.owner_id)
    if not owner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Owner not found")

    property_record = Property(
        owner_id=payload.owner_id,
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

    return schemas.PropertyRead.model_validate(property_record, from_attributes=True)


@router.get("/{property_id}", response_model=schemas.PropertyRead)
def get_property(property_id: str, session: Session = Depends(get_session)) -> schemas.PropertyRead:
    property_record = session.get(Property, property_id)
    if not property_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")
    return schemas.PropertyRead.model_validate(property_record, from_attributes=True)


@router.post("/{property_id}/valuations", response_model=schemas.ValuationRead, status_code=status.HTTP_201_CREATED)
def add_valuation(
    property_id: str,
    valuation: schemas.ValuationCreate,
    session: Session = Depends(get_session),
) -> schemas.ValuationRead:
    property_record = session.get(Property, property_id)
    if not property_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Property not found")

    valuation_record = Valuation(
        property_id=property_id,
        estimate=valuation.estimate,
        confidence=valuation.confidence,
        valuation_method=valuation.valuation_method,
        created_at=datetime.utcnow(),
    )
    session.add(valuation_record)
    session.flush()
    return schemas.ValuationRead.model_validate(valuation_record, from_attributes=True)


@router.get("", response_model=list[schemas.PropertyRead])
def list_properties(session: Session = Depends(get_session)) -> list[schemas.PropertyRead]:
    properties = session.query(Property).order_by(Property.created_at.desc()).limit(50).all()
    return [schemas.PropertyRead.model_validate(p, from_attributes=True) for p in properties]
