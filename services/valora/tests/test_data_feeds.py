import os

os.environ.setdefault("DATA_FEED_RATE_LIMIT", "2")
os.environ.setdefault("DATA_FEED_WINDOW_SECONDS", "60")

from fastapi.testclient import TestClient

from services.data_feeds.app.main import app

client = TestClient(app)


def test_interest_rates_returns_sample():
    response = client.get("/feeds/interest-rates")
    assert response.status_code == 200
    payload = response.json()
    assert "rates" in payload
    assert payload["rates"]["fed_funds_target"] == 5.25


def test_residential_sales_returns_sample():
    response = client.get("/feeds/property-sales/residential")
    assert response.status_code == 200
    data = response.json()
    assert data["median_price"] == 412000


def test_commercial_sales_returns_sample():
    response = client.get("/feeds/property-sales/commercial")
    assert response.status_code == 200
    data = response.json()
    assert data["median_cap_rate"] == 6.1


def test_rate_limit_enforced():
    # Two requests should pass due to DATA_FEED_RATE_LIMIT=2
    for _ in range(2):
        response = client.get("/feeds/interest-rates")
        assert response.status_code == 200

    # Third request should be throttled
    response = client.get("/feeds/interest-rates")
    assert response.status_code == 429
