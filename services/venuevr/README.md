# Backend Services

This backend scaffold provides a FastAPI application that aggregates the core REST endpoints described in the Sports Event VR blueprint. Each domain (auth, events, commerce, creative, social, analytics) receives its own router module with placeholder implementations that can be filled in as services mature.

## Local Development
1. Install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. Start the API:
   ```bash
   uvicorn app.main:app --reload
   ```
3. Open `http://localhost:8000/docs` for interactive Swagger.

## Directory Structure
- `app/main.py` – FastAPI application factory and router wiring.
- `app/core/` – Settings, logging, and shared utilities.
- `app/models/` – Pydantic schemas (request and response models).
- `app/api/routes/` – Domain specific routers implementing the contract.

## Next Steps
- Back routers with real persistence and integrate with identity, payments, and streaming providers.
- Introduce service modules per domain (`services/identity.py`, etc.) with business logic.
- Add automated tests under `tests/` mirroring critical flows (auth, purchase, entitlement, creative upload).
