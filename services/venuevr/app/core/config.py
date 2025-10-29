"""Application level configuration."""

from functools import lru_cache
import os
from typing import List

from pydantic import BaseModel


class Settings(BaseModel):
    """Runtime configuration loaded from environment variables."""

    environment: str = os.getenv("APP_ENV", "local")
    app_name: str = "Sports Event VR API"
    cors_origins: List[str] = [
        "http://localhost:5173",  # Web portal dev server
        "http://localhost:3000",  # Admin portal dev server
    ]


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()
