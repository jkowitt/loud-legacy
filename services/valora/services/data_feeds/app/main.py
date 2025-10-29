from __future__ import annotations

from fastapi import FastAPI

from services.data_feeds.app.routes import feeds
+from valora_common.security import SecurityHeadersMiddleware
+

-app = FastAPI(title="VALORA Data Feeds API")
+app = FastAPI(title="VALORA Data Feeds API")
+app.add_middleware(SecurityHeadersMiddleware)

app.include_router(feeds.router)
+
+
+@app.get("/healthz")
+async def healthcheck() -> dict[str, str]:
+    return {"status": "ok"}
