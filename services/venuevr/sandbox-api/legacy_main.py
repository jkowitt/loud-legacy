import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Sports Event VR API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PartyIn(BaseModel):
    name: str
    description: Optional[str] = None

class PartyOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None

DB: dict[str, PartyOut] = {}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/party", response_model=PartyOut)
def create_party(party: PartyIn):
    pid = str(uuid.uuid4())
    record = PartyOut(id=pid, name=party.name, description=party.description)
    DB[pid] = record
    return record

@app.get("/api/party/{party_id}", response_model=PartyOut)
def get_party(party_id: str):
    item = DB.get(party_id)
    if not item:
        raise HTTPException(status_code=404, detail="Party not found")
    return item
from typing import Optional
import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Sports Event VR API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PartyIn(BaseModel):
    name: str
    description: Optional[str] = None


class PartyOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None


DB: dict[str, PartyOut] = {}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/party", response_model=PartyOut)
def create_party(party: PartyIn) -> PartyOut:
    pid = str(uuid.uuid4())
    record = PartyOut(id=pid, name=party.name, description=party.description)
    DB[pid] = record
    return record


@app.get("/api/party/{party_id}", response_model=PartyOut)
def get_party(party_id: str) -> PartyOut:
    item = DB.get(party_id)
    if not item:
        raise HTTPException(status_code=404, detail="Party not found")
    return item
