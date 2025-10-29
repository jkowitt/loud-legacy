"""Auth and identity schemas."""

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, EmailStr


class SignupRequest(BaseModel):
    email: EmailStr
    password: Optional[str] = None
    provider: Literal["email", "google", "apple", "meta", "magic_link"] = "email"


class LoginRequest(BaseModel):
    email: EmailStr
    password: Optional[str] = None
    provider: Literal["email", "google", "apple", "meta", "magic_link"] = "email"


class MagicLinkRequest(BaseModel):
    email: EmailStr


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = 3600


class LoginResponse(BaseModel):
    tokens: TokenResponse
    user: "UserProfile"


class UserProfile(BaseModel):
    id: str
    email: EmailStr
    display_name: Optional[str] = None
    roles: List[str] = ["fan_user"]
    created_at: datetime
    entitlements: List[str] = []


LoginResponse.model_rebuild()
