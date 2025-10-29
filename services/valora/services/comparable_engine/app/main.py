from __future__ import annotations

from typing import List

from fastapi import FastAPI

from valora_common.schemas.valuation import Comparable

app = FastAPI(title="VALORA Comparable Engine (Mock)")


@app.get("/comps")
async def search_comps(
    class_: str, latitude: float | None = None, longitude: float | None = None
) -> dict[str, List[dict]]:
    comps = [
        Comparable(
            comparable_id="comp_demo",
            address="129 Main St",
            price=240000,
            distance_mi=0.2,
            attributes={"class": class_},
            source="mock",
        )
    ]
    return {"results": [comp.model_dump() for comp in comps]}
