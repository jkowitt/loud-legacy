from fastapi.testclient import TestClient

from services.marketplace.app.main import app, seed_plans
from services.marketplace.app.database import engine
from services.marketplace.app.models import Base


client = TestClient(app)
client.headers.update({"x-api-key": "local-dev-key"})


def setup_module(_module):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    seed_plans()


def test_create_user_listing_and_offer_flow():
    user_payload = {
        "email": "seller@example.com",
        "full_name": "Samantha Seller",
        "role": "seller",
        "password": "StrongPass!1"
    }
    response = client.post("/users", json=user_payload)
    assert response.status_code == 201
    seller_id = response.json()["id"]

    buyer_payload = {
        "email": "buyer@example.com",
        "full_name": "Barry Buyer",
        "role": "buyer",
        "password": "StrongPass!2"
    }
    buyer_resp = client.post("/users", json=buyer_payload)
    assert buyer_resp.status_code == 201
    buyer_id = buyer_resp.json()["id"]

    listing_payload = {
        "seller_id": seller_id,
        "address": "456 Market St",
        "city": "Chicago",
        "state": "IL",
        "postal_code": "60601",
        "bedrooms": 3,
        "bathrooms": 2,
        "living_area_sqft": 1800,
        "lot_size_sqft": 4000,
        "year_built": 2010,
        "description": "Modern townhouse with skyline views",
        "asking_price": 625000
    }
    listing_resp = client.post("/listings/with-property", json=listing_payload)
    assert listing_resp.status_code == 201
    listing = listing_resp.json()

    listings_resp = client.get("/listings")
    assert listings_resp.status_code == 200
    assert any(item["id"] == listing["id"] for item in listings_resp.json())

    offer_payload = {
        "listing_id": listing["id"],
        "buyer_id": buyer_id,
        "amount": 615000,
        "message": "Contingent on inspection"
    }
    offer_resp = client.post("/offers", json=offer_payload)
    assert offer_resp.status_code == 201
    offer = offer_resp.json()
    assert offer["status"] == "submitted"

    offers_resp = client.get(f"/offers/listing/{listing['id']}")
    assert offers_resp.status_code == 200
    assert len(offers_resp.json()) == 1


def test_subscriptions_flow():
    user_payload = {
        "email": "sub@example.com",
        "full_name": "Subscriber",
        "role": "buyer",
        "password": "StrongPass!3"
    }
    user_resp = client.post("/users", json=user_payload)
    assert user_resp.status_code == 201
    user_id = user_resp.json()["id"]

    plans_resp = client.get("/subscriptions/plans")
    assert plans_resp.status_code == 200
    plan_id = plans_resp.json()[0]["id"]

    subscription_resp = client.post(
        "/subscriptions",
        json={"user_id": user_id, "plan_id": plan_id, "auto_renew": True},
    )
    assert subscription_resp.status_code == 201
    subscription = subscription_resp.json()

    payment_resp = client.post(
        f"/subscriptions/{subscription['id']}/payments",
        json={"subscription_id": subscription["id"], "amount": 99.0},
    )
    assert payment_resp.status_code == 201

    history_resp = client.get(f"/subscriptions/{user_id}")
    assert history_resp.status_code == 200
    assert len(history_resp.json()) == 1


def test_requires_api_key():
    unauthenticated_client = TestClient(app)
    response = unauthenticated_client.get("/subscriptions/plans")
    assert response.status_code == 401
