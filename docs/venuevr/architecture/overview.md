# Architecture Overview

This document distills the blueprint into the concrete software components and interfaces that will live in the Sports Event VR codebase.

## Monorepo Layout (Planned)
- `backend/` – Python FastAPI services bundled as a monorepo package with submodules for auth, events, media, commerce, creative, analytics, and integration adapters.
- `clients/` – Unity (VR), Next.js (web portal), native mobile shells, and shared UI kits.
- `infrastructure/` (future) – IaC definitions (Terraform or AWS CDK) for networking, databases, streaming, and observability.
- `ops/` (future) – Runbooks, health check automation, and venue certification scripts.

## Service Boundaries
| Service | Responsibilities | Interfaces |
| --- | --- | --- |
| `gateway` | API gateway, auth verification, request routing | REST `/api`, WebSockets for presence |
| `identity` | Accounts, roles, device binding, session tokens | REST, IdP webhooks |
| `events` | Venues, schedules, feeds, moments | REST, admin UI |
| `commerce` | Catalog, orders, payments, entitlements | REST, payment webhooks, finance exports |
| `creative` | Asset uploads, approvals, placements, ad rotation | REST `/api/creative`, CDN manifests |
| `presence` | Party mode, chat, moderation hooks | WebRTC signaling, WebSockets |
| `metrics` | Telemetry ingest, dashboards, alerting | REST `/metrics`, stream to analytics warehouse |
| `media-control` | Ingest orchestration, encoder presets, playback tokens | REST, control plane to streaming stack |

Services communicate over gRPC or REST internally, with async events delivered via a message bus (AWS EventBridge, SNS/SQS, or Kafka).

## Data Stores
- **Postgres** – Primary OLTP store for identity, events, commerce, creative, and admin operations.
- **Redis** – Session cache, rate limiting, short lived playback tokens.
- **Object Storage (S3 or GCS)** – Creative assets, VOD clips, manifests.
- **Column Store (BigQuery, Snowflake, Redshift)** – Analytics warehouse fed by streaming telemetry.
- **Time Series (Prometheus, Timestream)** – Operational metrics and alert thresholds.

## Streaming and Real Time
- Low latency WebRTC for live 360 feeds with fallback to low latency HLS.
- Spatial audio streams multiplexed alongside video for positional awareness.
- Party sync relies on a real time messaging service (Ably, AWS AppSync, SignalR) with presence and voice chat integration.

## Security Posture
- Auth tokens issued by the identity service with short expiration and refresh rotation.
- Role based access control enforced at the gateway and service layers.
- Signed URLs for asset uploads and playback manifests.
- All admin actions audit logged and surfaced in Trust and Safety tooling.

## Deployment Model
- Containerized services deployed to Kubernetes or ECS with blue/green release strategy.
- API gateway fronted by CloudFront or Cloudflare for global fan delivery.
- Media control plane deployed close to ingest POPs with autoscaling encoders.
- Observability stack (OpenTelemetry collectors) sidecars metrics, traces, logs into centralized dashboards (Grafana, Datadog, or New Relic).

## Roadmap Hooks
- Feature flags (LaunchDarkly or internal) controlling seat jump, replays, and ad experiments.
- Integration layer for third party APIs with circuit breakers and retry budgets.
- Venue certification scripts baked into ops automation for pre event validation.

Refer to `docs/blueprint.md` for deep domain requirements, and to `backend/app` for implementation details as services come online.
