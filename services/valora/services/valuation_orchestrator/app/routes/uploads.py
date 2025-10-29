from __future__ import annotations

from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

UPLOAD_DIR = Path(__file__).resolve().parent.parent / ".." / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

router = APIRouter(prefix="/valuations", tags=["Valuations"])


@router.post("/{valuation_id}/images", status_code=status.HTTP_201_CREATED)
async def upload_images(
    valuation_id: str,
    image: Annotated[UploadFile, File(...)],
) -> dict[str, str]:
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Only images allowed")
    destination = UPLOAD_DIR / f"{valuation_id}_{image.filename}"
    contents = await image.read()
    with destination.open("wb") as handle:
        handle.write(contents)
    return {"status": "stored", "path": str(destination)}
