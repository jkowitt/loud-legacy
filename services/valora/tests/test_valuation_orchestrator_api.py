import pytest
from fastapi.testclient import TestClient

from services.valuation_orchestrator.app.main import app


@pytest.fixture()
def client() -> TestClient:
    with TestClient(app) as test_client:
        yield test_client


def test_real_estate_valuation_completes_synchronously(client: TestClient):
    payload = {
        "class": "real_estate",
        "attributes": {
            "address": "123 Main St",
            "zip": "60115",
            "living_area_sqft": 1600,
        },
    }

    response = client.post("/valuations", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "completed"
    assert data["estimate"] > 0
    assert data["comps"]


def test_auto_valuation_returns_job_reference(client: TestClient):
    payload = {
        "class": "auto",
        "attributes": {
            "vin": "1HGCM82633A004352",
            "make": "Toyota",
            "model": "Camry",
            "year": 2021,
            "trim": "SE",
            "mileage": 42000,
        },
    }

    response = client.post("/valuations", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "queued"
    assert "job_id" in data
    job_id = data["job_id"]

    job_response = client.get(f"/jobs/{job_id}")

    assert job_response.status_code == 200
    job_body = job_response.json()
    assert job_body["job_id"] == job_id
    assert job_body["status"] == "queued"


def test_unknown_job_returns_404(client: TestClient):
    response = client.get("/jobs/job_nonexistent")

    assert response.status_code == 404


def test_image_upload(tmp_path, client: TestClient):
    file_path = tmp_path / "photo.jpg"
    file_path.write_bytes(b"fake-image-bytes")

    with file_path.open("rb") as handle:
        response = client.post("/valuations/demo/images", files={"image": ("photo.jpg", handle, "image/jpeg")})

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "stored"
