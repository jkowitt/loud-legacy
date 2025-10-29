from __future__ import annotations

import os
from functools import lru_cache


class Settings:
    def __init__(self) -> None:
        self.environment = os.getenv("ENVIRONMENT", "local")
        self.service_timeout_seconds = float(os.getenv("SERVICE_TIMEOUT_SECONDS", "5.0"))
        self.valuation_orchestrator_url = os.getenv(
            "VALUATION_ORCHESTRATOR_URL", "http://valuation-orchestrator:8001"
        )
        self.auth_audience = os.getenv("AUTH_AUDIENCE", "valora-api")
        self.auth_issuer = os.getenv("AUTH_ISSUER", "https://auth.valora.app/")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
