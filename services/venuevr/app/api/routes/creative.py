"""Creative management endpoints."""

from datetime import datetime, timedelta

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from ...models import CreativeAsset, CreativePlacement, CreativePlacementRequest, CreativePreviewRequest

router = APIRouter()

MOCK_ASSET = CreativeAsset(
    id="asset_demo",
    sponsor_id="sponsor_acme",
    media_type="video/mp4",
    uri="https://cdn.example.com/creative/asset_demo.mp4",
    created_at=datetime.utcnow(),
)
MOCK_PLACEMENT = CreativePlacement(
    id="placement_demo",
    event_id="evt_demo",
    anchor_ref="ribbon_center",
    asset_id=MOCK_ASSET.id,
    rules={"rotation": "weighted"},
    start_ts=datetime.utcnow(),
    end_ts=datetime.utcnow() + timedelta(hours=2),
    status="scheduled",
)


@router.post("/creative/upload", response_model=CreativeAsset, status_code=status.HTTP_201_CREATED)
async def upload_creative(file: UploadFile = File(...), sponsor_id: str = "sponsor_acme") -> CreativeAsset:
    """Accept creative upload and return metadata."""
    media_type = file.content_type or "application/octet-stream"
    return CreativeAsset(
        id="asset_uploaded",
        sponsor_id=sponsor_id,
        media_type=media_type,
        uri=f"https://cdn.example.com/creative/{file.filename}",
        created_at=datetime.utcnow(),
    )


@router.post("/creative/assets/{asset_id}/publish")
def publish_asset(asset_id: str, approval_state: str = "approved") -> dict:
    """Publish or approve a creative asset."""
    if asset_id != MOCK_ASSET.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asset not found.")
    return {"asset_id": asset_id, "state": approval_state}


@router.get("/creative/assets", response_model=list[CreativeAsset])
def list_assets() -> list[CreativeAsset]:
    """Return creative assets."""
    return [MOCK_ASSET]


@router.get("/creative/assets/{asset_id}", response_model=CreativeAsset)
def get_asset(asset_id: str) -> CreativeAsset:
    """Return a creative asset."""
    if asset_id != MOCK_ASSET.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asset not found.")
    return MOCK_ASSET


@router.post("/creative/placements", response_model=CreativePlacement, status_code=status.HTTP_201_CREATED)
def create_placement(request: CreativePlacementRequest) -> CreativePlacement:
    """Create a placement for a creative asset."""
    return CreativePlacement(id="placement_new", status="scheduled", **request.dict())


@router.patch("/creative/placements/{placement_id}", response_model=CreativePlacement)
def update_placement(placement_id: str, request: CreativePlacementRequest) -> CreativePlacement:
    """Update an existing placement."""
    if placement_id != MOCK_PLACEMENT.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Placement not found.")
    return CreativePlacement(id=placement_id, status="scheduled", **request.dict())


@router.get("/creative/events/{event_id}/placements", response_model=list[CreativePlacement])
def list_event_placements(event_id: str) -> list[CreativePlacement]:
    """Return placements for an event."""
    if event_id != MOCK_PLACEMENT.event_id:
        return []
    return [MOCK_PLACEMENT]


@router.post("/creative/events/{event_id}/preview")
def preview_event(event_id: str, request: CreativePreviewRequest) -> dict:
    """Generate a preview manifest."""
    return {"event_id": event_id, "preview_url": "https://cdn.example.com/previews/scene.glb"}


@router.post("/creative/placements/{placement_id}/rollback")
def rollback_placement(placement_id: str) -> dict:
    """Rollback a placement to the previous version."""
    return {"placement_id": placement_id, "status": "rolled_back"}
