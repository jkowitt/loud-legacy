from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from services.marketplace.app import schemas
from services.marketplace.app.database import get_session
from services.marketplace.app.models import User
from services.marketplace.app.security import hash_password, require_api_key

router = APIRouter(prefix="/users", tags=["Users"], dependencies=[Depends(require_api_key)])


@router.post("", response_model=schemas.UserRead, status_code=status.HTTP_201_CREATED)
def create_user(payload: schemas.UserCreate, session: Session = Depends(get_session)) -> schemas.UserRead:
    if session.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    password_hash = hash_password(payload.password)
    user = User(
        email=payload.email,
        full_name=payload.full_name,
        role=payload.role,
        password_hash=password_hash,
        created_at=datetime.utcnow(),
    )
    session.add(user)
    session.flush()
    return schemas.UserRead.model_validate(user, from_attributes=True)


@router.get("", response_model=list[schemas.UserRead])
def list_users(session: Session = Depends(get_session)) -> list[schemas.UserRead]:
    users = session.query(User).order_by(User.created_at.desc()).all()
    return [schemas.UserRead.model_validate(user, from_attributes=True) for user in users]
