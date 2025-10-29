from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Literal

from valora_common.schemas.valuation import JobProgress, JobStatus

JobState = Literal["queued", "running", "succeeded", "failed", "partial"]


@dataclass
class JobRecord:
    job_id: str
    status: JobState
    submitted_at: datetime
    updated_at: datetime
    progress: JobProgress = field(default_factory=JobProgress)
    result_url: str | None = None


class InMemoryJobStore:
    """Simple thread-unsafe job store for prototyping."""

    def __init__(self) -> None:
        self._jobs: Dict[str, JobRecord] = {}

    def create(self, job_id: str) -> JobStatus:
        now = datetime.utcnow()
        record = JobRecord(
            job_id=job_id,
            status="queued",
            submitted_at=now,
            updated_at=now,
        )
        self._jobs[job_id] = record
        return self._to_status(record)

    def update(
        self,
        job_id: str,
        *,
        status: JobState,
        progress: JobProgress | None = None,
        result_url: str | None = None,
    ) -> JobStatus:
        record = self._jobs[job_id]
        record.status = status
        if progress:
            record.progress = progress
        record.result_url = result_url
        record.updated_at = datetime.utcnow()
        return self._to_status(record)

    def get(self, job_id: str) -> JobStatus:
        record = self._jobs[job_id]
        return self._to_status(record)

    def _to_status(self, record: JobRecord) -> JobStatus:
        return JobStatus(
            job_id=record.job_id,
            status=record.status,
            submitted_at=record.submitted_at,
            updated_at=record.updated_at,
            progress=record.progress,
            result_url=record.result_url,
        )
