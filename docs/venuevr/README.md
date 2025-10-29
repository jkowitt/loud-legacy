# Sports Event VR Platform

Bring fans into live sports through an immersive virtual reality experience that unlocks premium digital inventory for teams, venues, and sponsors.

## Repository Layout
- `docs/` – Full product blueprint, architecture notes, delivery plan, and operational checklists.
- `backend/` – FastAPI-based service scaffold for APIs that power identity, events, commerce, creative, and analytics.
- `frontend/` – Web (Next.js) and mobile (Expo) clients plus shared TypeScript helpers.
- `clients/` – Unity (VR), admin, and other experience guidelines (future).

## Getting Started
1. Create a Python virtual environment and install backend requirements:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. Run the API locally:
   ```bash
   uvicorn app.main:app --reload
   ```
3. Explore the interactive docs at `http://localhost:8000/docs`.

## Roadmap Snapshot
- Phase 0: Rights confirmation, venue capture planning, vendor selection.
- Phase 1: Core services, admin tooling, Unity shell, low-latency streaming path.
- Phase 2: MVP event with purchase flow, party mode, and sponsor activations.
- Phase 3: Scale testing, security hardening, and public launch.

See `docs/blueprint.md` for the complete vision, features, architecture, and delivery plan.
