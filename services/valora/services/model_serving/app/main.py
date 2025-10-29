from __future__ import annotations

from fastapi import FastAPI, HTTPException

from valora_common.schemas.valuation import ValuationRequest

app = FastAPI(title="VALORA Model Serving (Mock)")


@app.post("/predict")
async def predict(payload: ValuationRequest) -> dict[str, float]:
    if payload.class_ == "real_estate":
        sqft = payload.attributes.get("living_area_sqft", 1600)
        price = max(200000, sqft * 210)
        return {"estimate": float(price), "confidence": 0.74}
    if payload.class_ == "auto":
        return {"estimate": 24000.0, "confidence": 0.65}
    raise HTTPException(status_code=422, detail="Unsupported asset class")


@app.post("/explain")
async def explain(payload: ValuationRequest) -> dict[str, list[dict[str, float | str]]]:
    explanations = [
        {"feature": "living_area_sqft", "direction": "+", "magnitude": 0.31},
        {"feature": "year_built", "direction": "+", "magnitude": 0.12},
    ]
    return {"explanations": explanations}
