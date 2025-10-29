from __future__ import annotations

import os
import time
from typing import Any, Awaitable, Callable, Dict, Tuple

CacheEntry = Tuple[float, Any]

_CACHE: Dict[str, CacheEntry] = {}
_DEFAULT_TTL = int(os.getenv("DATA_FEED_CACHE_TTL_SECONDS", "300"))


async def get_cached(key: str, fetcher: Callable[[], Awaitable[Any]], ttl: int | None = None) -> Any:
    effective_ttl = ttl or _DEFAULT_TTL
    now = time.monotonic()
    entry = _CACHE.get(key)
    if entry and now - entry[0] < effective_ttl:
        return entry[1]
    result = await fetcher()
    _CACHE[key] = (now, result)
    return result
