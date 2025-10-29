"""Auth endpoints."""

from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException, status

from ...models import (
    LoginRequest,
    LoginResponse,
    MagicLinkRequest,
    SignupRequest,
    TokenResponse,
    UserProfile,
)

router = APIRouter()


def _build_mock_profile(email: str) -> UserProfile:
    """Return a placeholder profile until persistence is wired up."""
    return UserProfile(
        id="user_demo",
        email=email,
        display_name=email.split("@")[0],
        roles=["fan_user"],
        created_at=datetime.utcnow(),
        entitlements=["trial_evt"],
    )


def _issue_mock_tokens() -> TokenResponse:
    """Generate static tokens for local development."""
    expires_in = 3600
    return TokenResponse(
        access_token="demo-access-token",
        refresh_token="demo-refresh-token",
        expires_in=expires_in,
    )


@router.post("/auth/signup", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest) -> LoginResponse:
    """Handle account creation."""
    if payload.provider == "email" and not payload.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password required for email signup.",
        )
    return LoginResponse(tokens=_issue_mock_tokens(), user=_build_mock_profile(payload.email))


@router.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest) -> LoginResponse:
    """Handle email or social login."""
    return LoginResponse(tokens=_issue_mock_tokens(), user=_build_mock_profile(payload.email))


@router.post("/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout() -> None:
    """Invalidate the active session."""
    return None


@router.post("/auth/magiclink", status_code=status.HTTP_204_NO_CONTENT)
def magic_link(payload: MagicLinkRequest) -> None:
    """Trigger a magic link for passwordless auth."""
    # Placeholder only; real implementation dispatches an email.
    return None


@router.get("/me", response_model=UserProfile)
def get_me() -> UserProfile:
    """Return the current user profile."""
    return _build_mock_profile("demo@sportsvr.local")


@router.get("/me/entitlements", response_model=List[str])
def get_my_entitlements() -> List[str]:
    """Return entitlement IDs available to the current user."""
    return ["evt_demo_main", "evt_demo_archive"]
