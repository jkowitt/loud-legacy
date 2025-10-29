from __future__ import annotations

import os
from functools import lru_cache


class Settings:
    def __init__(self) -> None:
        self.api_key = os.getenv("MARKETPLACE_API_KEY", "local-dev-key")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
