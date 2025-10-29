from __future__ import annotations

import os
import time
from dataclasses import dataclass
from typing import Dict

from fastapi import HTTPException, Request, status


@dataclass
class RateBucket:
    count: int
    window_start: float


_buckets: Dict[str, RateBucket] = {}


def rate_limiter(request: Request) -> None:
    rate_limit = int(os.getenv("DATA_FEED_RATE_LIMIT", "60"))
    window_seconds = int(os.getenv("DATA_FEED_WINDOW_SECONDS", "60"))
    identifier = request.client.host if request.client else "anonymous"
    now = time.time()
    bucket = _buckets.get(identifier)

    if not bucket or now - bucket.window_start >= window_seconds:
        _buckets[identifier] = RateBucket(count=1, window_start=now)
        return

    if bucket.count >= rate_limit:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Rate limit exceeded")

    bucket.count += 1
