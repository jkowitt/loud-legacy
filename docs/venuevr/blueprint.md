# Sports Event VR — Full Project Blueprint

## 1. Vision and Outcomes
**Vision**  
Bring fans into live sports through an immersive VR experience that feels like being at the game while unlocking new digital revenue for teams and partners.

**Primary outcomes**
- New digital ticket revenue and sponsor activation revenue
- Measurably higher fan engagement and retention across a season
- A platform that scales across multiple sports and venues

**North star metrics**
- Average watch time per event
- Conversion rate from preview to purchase
- Concurrent viewers per event and rebuffer rate under two percent

## 2. Users and Personas
**Fans**
- Core fans who cannot attend in person
- Out of region alumni and casual viewers who want a premium angle

**Partners**
- Sponsors who want interactive zones and offers
- Teams and leagues that need new inventory and reliable rights control

**Internal**
- Event operators who configure and run the show
- Moderators and support agents
- Finance and analytics users

## 3. Scope
**MVP scope**
- One league and one or two venues
- Three fixed 360 camera angles per event
- Live watch with party mode and voice chat
- Basic store links and one sponsor zone per event
- Admin portal for events, feeds, prices, sponsor placements, and live health tiles

**First upgrade after MVP**
- Seat jump catalog with five to seven angles
- Instant replays with a simple moment timeline
- Two or three sponsor mini experiences
- Highlights and VOD library with search

## 4. Feature List
**Fan app**
- Account and comfort onboarding
- Event discovery and previews
- Purchase and entitlement check
- Live watch with angle picker and party voice
- Timeline with key moments and stats
- Store panel and sponsor zones
- Replays and past events

**Admin portal**
- Event creation and publish flow
- Venue map and anchor editor
- Feed registry and encoder presets
- Sponsor zone placement and creative upload
- Pricing, codes, and bundles
- Health monitoring and alerts
- Basic finance reports and exports
- Trust and safety queue

## 5. System Architecture (High Level)
**Clients**
- VR clients built in Unity with OpenXR for Quest and visionOS
- Web client for previews, highlights, and store

**Services**
- API gateway that fronts user, event, media, commerce, and social services
- Media control service for ingest, encode, and token generation
- Real time messaging for party sync and stats
- Payments and entitlements service
- Analytics pipeline and dashboards

**Data**
- Postgres for core data
- Redis for sessions and rate limits
- Object storage for creative and clips
- Column store for analytics

**Streaming**
- WebRTC for live low latency feeds
- CMAF low latency HLS as a fallback where needed

## 6. Capture and Production
**At venue**
- Three to five 180 or 360 rigs at premium seats, midfield or midcourt, and behind the goal
- Spatial audio mics by section for crowd and field sound
- Reference 3D scan to keep sponsor objects anchored

**Production**
- Live stitching and color match
- First pass encode at the venue then uplink to cloud
- Glass to glass target under one second for party sync

## 7. Distribution
- Multi CDN delivery with adaptive ladders tuned for wide field of view
- Token based access and DRM for premium angles
- Geo rules and blackout by league and territory

## 8. Client Rendering and UX
- 8K 360 playback with time warp and foveated decode where available
- Ambisonics bed plus object audio for near field sound
- Comfort moves with fade and fast seat jump
- Clear live delay indicator and party sync status

## 9. API Contract Overview
Base path: `/api`

**Auth and users**
- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/me`
- GET `/me/entitlements`

**Events and venues**
- GET `/events` (filters: status, date range, team)
- GET `/events/{id}`
- POST `/events` (admin)
- PATCH `/events/{id}` (admin)
- POST `/events/{id}/publish` (admin)
- GET `/venues`
- GET `/venues/{id}`
- POST `/venues` and PATCH `/venues/{id}` (admin)

**Feeds and media**
- GET `/events/{id}/feeds` (returns signed urls and types)
- POST `/events/{id}/feeds` and PATCH `/feeds/{id}` (admin)
- POST `/events/{id}/token` (playback token)

**Sponsor zones and content**
- GET `/events/{id}/sponsors`
- POST `/events/{id}/sponsors` (admin)
- POST `/creative` upload (admin)

**Commerce and access**
- GET `/catalog` (tickets and bundles)
- POST `/orders`
- POST `/payments/confirm` (webhook)
- POST `/entitlements` (admin or payment flow)
- GET `/orders/{id}`

**Social and presence**
- POST `/parties`
- POST `/parties/{id}/invite`
- POST `/parties/{id}/leave`
- GET `/parties/{id}`

**Replays and moments**
- GET `/events/{id}/moments`
- POST `/events/{id}/moments` (admin)
- GET `/replays/{id}`

**Health and analytics**
- GET `/health/live` (admin)
- GET `/metrics` (admin)

## 10. Data Model Sketch
```
User(id, email, name, auth_provider, created_at)
Profile(id, user_id, favorites_json, comfort_json)
Venue(id, name, map_json, anchors_json)
Event(id, venue_id, league, home_team, away_team, start_time, status)
Feed(id, event_id, kind, encoder_preset, status)
TicketType(id, event_id, name, price, rules_json)
Order(id, user_id, total, status, provider_ref)
OrderItem(id, order_id, product_ref, qty, price)
Entitlement(id, user_id, event_id, claims_json, expires_at)
SponsorPlacement(id, event_id, anchor_ref, creative_ref, rules_json)
Moment(id, event_id, ts, label, tags)
ModerationCase(id, user_id, event_id, type, action, notes)
TelemetrySample(id, ts, client_ref, metric, value, dims_json)
```

## 11. Commerce Flow
1. Fan selects event and product
2. Client creates order
3. Payment provider confirms
4. Entitlement is created for the event and angles
5. Client fetches feeds with a short lived token

## 12. Trust and Safety
- Positional voice with mute, block, and report controls
- Word lists and model assisted flags for harassment and abuse
- Live moderation queue with fast actions
- Session timeouts and rate limits

## 13. Security and Compliance
- Passkeys and device binding for higher risk actions
- TLS everywhere, HSTS, and strict content policy
- Row level access checks and audit logs on all admin actions
- PCI scope contained to the provider
- Privacy and data retention by region and league rules

## 14. Observability and Quality Targets
**Observability**
- Correlation id from ingest to client for each session
- Real time tiles for ingest, encode, token, and playback health
- Frame time, bitrate, rebuffer, and comfort metrics by client

**Targets**
- Time to first frame under five seconds on common networks
- Glass to glass under one second for party sync
- Crash free sessions above ninety nine point five percent
- Audio video sync within plus or minus fifty milliseconds

## 15. Delivery Plan and Milestones
**Phase 0 discovery** 2 weeks
- Confirm rights and venue access
- Select capture vendor and streaming stack
- Define first venue map and anchor plan

**Phase 1 foundations** 6 to 8 weeks
- Core API and data model
- Admin portal with events, feeds, sponsors, pricing
- Unity client shell with login and discovery
- WebRTC ingest and playback path

**Phase 2 MVP event** 6 weeks
- Three fixed angles and spatial audio
- Purchase flow and entitlements
- Party mode and voice
- Health tiles and basic finance reports
- First closed beta event

**Phase 3 harden and launch** 4 weeks
- Scale tests and soak tests
- Store panel and promo codes
- Moderation runbook and on call
- Public launch with one venue and one league

## 16. Team and Responsibilities
- Product manager: scope, roadmap, and partner relations
- Tech lead: architecture, code quality, and delivery
- Unity engineers: client UI, rendering, playback, and networking
- Backend engineers: services, APIs, payments, analytics
- Media engineer: ingest, encode, player tuning
- DevOps and SRE: cloud, CI and CD, observability, and on call
- Designer: UX for VR and web
- Producer or live ops manager: event runbooks and production
- Support and moderation agents

## 17. Cost Model and Budget Bands
- Capture gear and on site crew per event
- Cloud and CDN based on viewers and bitrate
- Payment fees and fraud tools
- Engineering headcount and design
- Support and moderation during live windows

Note: finalize numbers after you pick the vendor and codec plan and after expected concurrency is known.

## 18. Risks and Mitigations
- Rights and blackout rules are unclear  
  Resolve with the league before a single line of code
- Latency higher than expected  
  Add edge compute and tune ladders and keyframe spacing
- Motion sickness for a segment of users  
  Strong comfort defaults and optional narrow FOV
- Device coverage is uneven  
  Prioritize Quest 3 and Vision Pro and provide a web path for highlights

## 19. Launch Plan
- Soft launch with invited fans and partners
- One live event weekend with two repeats
- Daily review of telemetry and NPS
- Public launch once targets are met

## 20. Roadmap After Launch
- Seat upgrades during live with smart pricing
- Dynamic camera switching directed by the producer
- Creator rooms and watch parties with hosts
- Loyalty points, quests, and sponsor challenges
- Limited volumetric moments for key plays

## 21. Creative Management Module
### Objectives
Enable venues and sponsor teams to upload, approve, schedule, and swap creative assets without developer help, with instant in scene preview and safe rapid rollback.

### Roles
- Admin operator at venue or rights holder
- Sponsor user with limited permissions (optional)
- Platform reviewer for approvals

### Supported Asset Types
- Static signage: PNG, JPG
- Animated signage: MP4, WebM
- 3D objects and booths: GLB, FBX
- Audio beds for zones: WAV, AAC (optional)

### Upload and Preview Workflow
1. Operator selects event and opens Stadium Map
2. Click an anchor to open Placement Panel
3. Upload creative file and set metadata (sponsor, click through URL, start and end date, target events, display duration)
4. Instant preview in the 3D map with scale and rotation controls
5. Save to schedule or submit for approval if required
6. Auto deploy at scheduled time with version pinned

### Scheduling and Rotation
- Each anchor supports a rotation list with weight based or time based rules
- Exclusive lock overrides rotation for a given sponsor and window
- Timeline editor per event allows drag to set start and end, with conflict warnings

### Library and Version Control
- Global library organized by property, season, and event
- Each asset has version history, status, and expiration
- One click rollback to any prior version

### Sponsor Self Service Portal (Phase Two)
- Sponsors upload creative into a sandbox tied to their brand
- Auto checks for format and size, with safe zone overlay guides
- Submit for venue approval and track status
- View post event analytics and download reports

### Technical Architecture
- Admin UI: React with Three.js for stadium preview
- Storage: Object storage with CDN caching
- Rendering: Unity Addressables for dynamic asset streaming
- Creative API: microservice for uploads, approvals, scheduling
- Database: Postgres for placements and schedules, Redis for publish cache
- Security: Signed upload URLs, role based access, audit log on all actions

### API Contract (Creative)
Base path: `/api/creative`

- POST `/upload` returns asset_id  
  Body: file upload, media_type, sponsor_id, metadata_json
- POST `/assets/{asset_id}/publish`  
  Body: approval_state, notes
- GET `/assets` filters by sponsor, status, event
- GET `/assets/{asset_id}`
- POST `/placements`  
  Body: event_id, anchor_ref, asset_id, rules_json, start_ts, end_ts
- PATCH `/placements/{placement_id}`
- GET `/events/{id}/placements`
- POST `/events/{id}/preview`  
  Body: placement_draft list, returns signed scene preview URL
- POST `/placements/{placement_id}/rollback`

### Data Model Additions
```
CreativeAsset(id, sponsor_id, media_type, uri, thumb_uri, metadata_json, status, created_at)
CreativeVersion(id, asset_id, uri, notes, created_at)
Anchor(id, venue_id, name, transform_json, constraints_json)
Placement(id, event_id, anchor_id, asset_id, rules_json, start_ts, end_ts, status)
RotationRule(id, anchor_id, rule_json)
Approval(id, subject_ref, subject_kind, state, reviewer_id, notes, created_at)
CreativeMetric(id, event_id, placement_id, ts, metric, value, dims_json)
```

### Rendering and Deployment Flow
1. Operator saves or approves placement
2. Creative service writes placement and pushes a publish message
3. Build service generates or updates a scene manifest for the event
4. Clients fetch the short lived manifest and stream assets from CDN
5. Metrics stream back as clients render and dwell

### Rights and Guardrails
- Safe zone guides at upload and preview
- Expiration auto removal with warning email seven days prior
- Word and image checks for policy and brand compliance
- All changes logged with who, what, and when

### Templates for Fast Activation
- Ribbon board strip template with exact pixels
- Scoreboard animation loop template
- Tunnel arch banner with transparency
- Standard booth GLB with texture slots and panels

### Analytics and Reporting
- Impressions per placement and per anchor
- Dwell time and interaction rate for interactive booths
- Heat map of gaze in zones by minute of game
- Downloadable sponsor report and API export

### Acceptance Criteria for MVP
- Upload to live placement in under five minutes end to end
- Preview fidelity within five percent of in headset render
- Rollback in under thirty seconds
- Rotation accuracy within one second of schedule

## 22. Accounts, Payments, Platforms, and Cybersecurity
### Objectives
Provide a single identity across devices, handle one off tickets and subscriptions, keep entitlements in sync on VR or mobile or web, and harden the platform against abuse.

### Identity and Authentication
- Providers: Email plus password, Google, Apple, Meta or Oculus; optional passwordless (magic link, OTP) and Passkeys (WebAuthn)
- Roles: `fan_user`, `premium_user`, `venue_admin`, `sponsor_admin`, `system_admin`
- Tokens: Short lived JWT plus refresh; device binding for higher risk actions
- IdP options: Auth0, AWS Cognito, Firebase Auth

### Payments and Entitlements
- Gateways: Stripe (primary), Adyen or Braintree (alt)
- Products: $5 pay per view ticket, $100 per year Premium, $10 to $25 add ons (premium events)
- Stores: Native IAP on iOS or Android; web uses Stripe Checkout; server verifies webhooks
- Entitlement engine: Grants event or angle access post payment; expires per rules
- Revenue share: Calculated per event and product; exportable

### Cross Platform Coverage
- VR Client: Unity plus OpenXR (Quest, Vision Pro, Pico)
- Mobile: iOS (Swift) and Android (Kotlin) companion apps; optional React Native or Flutter
- Web: Next.js (fan portal, highlights), Admin (sponsors, events, reports)
- All clients talk to the same REST or GraphQL API

### Core Flows
1. Signup or Trial -> guest or account -> 20 minute trial entitlement -> upgrade CTA
2. Purchase -> Stripe or IAP -> webhook -> entitlement created -> client unlocks
3. Sync -> user opens VR app -> tokens refresh -> `/me/entitlements` unlocks angles or events
4. Renewal -> Stripe subscription renews -> entitlement extended; failed payments trigger grace rules

### API Contract (Auth or Payments or Entitlements)
```
POST /auth/signup
POST /auth/login
POST /auth/magiclink
GET  /me
PATCH /me/profile

POST /payments/session
POST /payments/webhook
GET  /payments/history

GET  /catalog
POST /orders
GET  /entitlements
POST /entitlements/verify
```

### Data Model Additions
```
Account(id, email, provider, passkey_pub, created_at)
Subscription(id, account_id, product, status, renews_at, provider_ref)
Entitlement(id, account_id, event_id, claims_json, starts_at, expires_at)
Payment(id, account_id, amount, currency, provider, provider_ref, status)
DeviceLink(id, account_id, device_ref, last_seen_at)
Audit(id, actor_id, action, subject, ts, meta_json)
```

### Cybersecurity Controls
- Transport: TLS 1.3; HSTS; strict CSP
- Storage: AES 256 server side encryption; per tenant KMS keys (option)
- Access: RBAC plus row level policies by venue or property
- Admin security: MFA required; IP allowlists for sensitive ops
- Sessions: Short TTL JWT, refresh rotation, device binding
- Content protection: Signed playback URLs plus DRM for premium feeds
- Infra: Private VPC, least privilege IAM, WAF plus AWS Shield or Cloud Armor
- Monitoring: Centralized logs, CloudTrail or GuardDuty, anomaly alerts, SIEM
- SDLC: SAST or DAST in CI, dependency scanning, secrets detection
- Backups: Versioned buckets, cross region replication, disaster runbooks

### Privacy and Compliance
- GDPR or CCPA: Consent tracking, data export or delete endpoints, DSR SLAs
- PCI: Card data handled by gateway only; quarterly ASV scans
- COPPA: Age gate if minors included; parental consent flows (if needed)

### Admin Pages (New)
- Accounts (search, role edit, reset MFA)
- Payments and Subscriptions (refunds, invoice lookup, dunning status)
- Entitlements (grant or revoke, bulk codes)
- Security (API keys, audit log, IP policies)

### Acceptance Criteria
- Signup to trial entitlement in under 10 seconds
- Web and mobile purchase to unlocked VR content in under 30 seconds from gateway webhook
- Subscription renewal accuracy >= 99.9 percent; automated dunning with three retry stages
- MFA enforced for all admin accounts; audit log on every admin action

### Rollout Plan
- Phase A: Web signup, Stripe one off tickets, entitlement sync to VR
- Phase B: Annual subs plus dunning, mobile IAP parity
- Phase C: Admin roles, refunds, exportable revenue share reports
- Phase D: Advanced monitoring, SIEM, periodic pen test

## 23. Franchise and Licensing Program
### Vision
Enable venues to join the Sports Event VR network by purchasing a franchise or licensing agreement that provides them with a turnkey VR event system. The venue only needs to sign up, acquire the recommended equipment package, and connect to the approved network environment.

### Structure
**Franchise Option**
- Annual or multi year agreement granting use of the VR platform, creative management tools, and brand IP.
- Includes onboarding, tech support, cloud hosting, and software updates.
- Venues operate under the brand with protected territory rights.

**License Option**
- Lightweight version for properties that prefer their own branding.
- Access to platform APIs, admin dashboard, and cloud storage, but without shared national sponsorships.

### Franchise Onboarding Flow
1. Venue signs agreement and pays franchise fee.
2. Receives onboarding kit and equipment list.
3. Equipment shipped or sourced locally using approved models.
4. Setup verification and training call.
5. Go live with first streamed event.

### Equipment Package (Baseline)
**Camera and Capture**
- Insta360 X4 (8K 360 wireless) x 3 minimum per venue.
- Optional hero angle camera: Z CAM S1.

**Mounts and Accessories**
- Carbon fiber tripods with 1/4 inch mounts.
- Quick release base plates for sideline and court setups.
- Portable carrying case.

**Power and Cabling**
- External USB C power banks (10,000 mAh plus) or 12 V DC adapter.
- Shielded USB C to Ethernet adapters (Gigabit capable).
- Spare batteries and high speed SD cards (512 GB V30 UHS I).

**Networking**
- Dual band Wi Fi 6 or 6E access points dedicated to VR streams.
- Optional 5G bonded cellular router for backup uplink.
- Ethernet drop at each camera location where possible.
- VLAN segregation for video traffic; QoS priority on uplink ports.

**Compute and Cloud**
- Laptop or mini PC with 8 GB RAM plus, USB C, and encoder app for live tests.
- Automatic cloud upload to S3 or GCS via admin portal.

### Technology Hookups
- Power: 110 to 240 V grounded outlets or UPS units for continuous supply.
- Network: dedicated SSID for VR traffic; WPA3 secured; pre shared keys.
- Cabling: Cat6A shielded runs or certified wireless bridge.
- Configuration: each camera pre registered with platform credentials.

### Software and Admin Access
- Each venue receives its own admin portal domain.
- Access roles for marketing, sponsor ops, and tech lead.
- Automatic updates deployed by franchisor; no local install required.

### Support
- 24/7 ticket portal and live chat for event days.
- Quarterly system health checks.
- Replacement or upgrade discounts for certified hardware.

### Revenue Sharing (Summary)
| Stream | Franchisor | Venue |
| --- | --- | --- |
| VR Ticket Sales | 40 percent | 60 percent |
| Sponsorships | 30 percent | 70 percent |
| Add On Events or Merch | 30 percent | 70 percent |
| National Ads | 70 percent | 30 percent |

### Compliance and Certification
- Venues complete a certification checklist covering network, power, and safety.
- Successful certification unlocks franchise revenue dashboard access.
- Annual audit ensures system and security compliance.

### Expansion Path
- Starter License: pilot season, one venue.
- Regional Franchise: 3 to 10 venues under a single operator.
- Master Franchise: conference level or pro league rights with revenue override.

### Acceptance Criteria
- Venue setup time <= 4 hours.
- All cameras online and visible in admin portal within 10 minutes of power on.
- Network latency < 100 ms to cloud ingest.
- Verified first event upload and playback under franchisor monitoring.

## 24. Camera Zoom and Venue Functionality Assurance
### Enhanced Camera Features
- Implement digital zoom capability within 360 video feeds to allow users to focus on players, crowd areas, or sponsor activations.
- Utilize equirectangular projection cropping for zoomed views while maintaining full spatial awareness.
- Support smooth zoom transitions (0.5x to 5x) with minimal distortion.
- Integrate adaptive foveated rendering for performance optimization during zoom in scenes.

### Multi Angle Focus System
- Each venue admin can set predefined zoom hotspots (for example midfield, bench, sponsor zone).
- Users can select hotspots via gaze or controller input in the VR client.
- Dynamic re centering recalculates the user perspective to maintain immersion.

### Functional Assurance per Venue
To ensure that every venue maintains full operational integrity, the following systems must be validated before each event:

**Hardware Validation**
- Cameras: Verify connection, orientation, lens calibration, and firmware version.
- Power Supply: Ensure continuous power through certified outlets or battery banks.
- Mounts and Positioning: Check stability and field of view alignment with reference marks.

**Network Validation**
- Bandwidth Test: Minimum 25 Mbps upstream per camera.
- Latency Threshold: <100 ms to cloud ingest server.
- Wi Fi or 5G Backup: Auto failover configured for redundancy.

**Cloud Connectivity**
- Run pre event ping test to ingest endpoint.
- Confirm token authentication and upload permissions.
- Validate time sync (NTP) for all capture units.

**User Experience Quality Check**
- QA session with headset on venue Wi Fi: confirm login, seat jump, zoom feature, and sponsor zones render correctly.
- Monitor live telemetry (frame rate, bitrate, motion comfort) via admin dashboard.
- Run functional audit checklist before gates open.

**Automatic Health Monitoring**
- Each camera reports telemetry: temperature, uptime, bitrate, connection status.
- Alerts trigger if any stream drops below defined quality thresholds.
- System dashboard color codes cameras: green (OK), yellow (degraded), red (offline).

### Acceptance Criteria
- Zoom capability responsive within 250 ms of user input.
- No frame tearing or distortion at 3x zoom on 8K stream.
- All venue cameras must pass connectivity and quality validation before event start.
- Real time monitoring confirms 99.5 percent stream uptime during live operation.

## 25. Programmatic Ad Placement and Dynamic Replacement
### Objective
Enable seamless, automated placement and replacement of advertisements within the VR environment using a programmatic system that updates in real time without manual reconfiguration.

### Core Capabilities
- Dynamic Ad Engine: each sponsor zone or 3D anchor supports real time creative swaps through an API call or automated schedule.
- Programmatic Integration: integrate with existing ad servers (for example Google Ad Manager, VAST or VPAID compatible SSPs) for dynamic ad delivery.
- Real Time Rotation: the system pulls ad creatives from a central repository or external DSP feed, automatically refreshing on defined intervals.

### Implementation Details
- Creative Feed API: endpoint `/api/ads/serve` returns JSON payload of current creatives by zone, including asset URL, duration, target event, and tracking pixels.
- Placement Logic: priority hierarchy of guaranteed sponsor over campaign target over filler ad; supports geo targeting, time of day rules, and event category matching.
- Ad Rendering: static image or video texture mapped onto 3D surfaces; animated banners or motion graphics rendered as lightweight shader layers; optional interactive hotspots linking to sponsor microsites.

### Admin Portal Controls
- Ad Library view showing all active creatives by sponsor and zone.
- Drag and drop assignment to stadium anchors with override priority.
- Real time preview and testing before deployment.
- Scheduling module for start and end dates, rotation weights, and targeting rules.
- Version control and auto rollback in case of incorrect uploads.

### Programmatic Rules and Scheduling
- Frequency caps and pacing control per advertiser.
- Rotation interval default: 30 to 60 seconds or on scene change.
- Ad triggers: event start, timeout, halftime, replay, or player highlight.
- Creative expiration automatically reverts to default fallback.

### Reporting and Analytics
- Impressions, dwell time, and interaction metrics logged in real time.
- Sponsor performance dashboards include CTR, view duration, and zone heatmaps.
- Export reports to CSV or API feed for billing reconciliation.

### Technical Architecture
| Component | Function |
| --- | --- |
| Ad Service | Hosts creative metadata and rotation logic |
| Content CDN | Delivers image or video assets globally with low latency |
| Integration API | Handles ad calls, targeting, and tracking responses |
| Renderer | Applies creative to 3D surface in Unity scene at runtime |

### Security and Compliance
- All creative uploads scanned for malicious code or size violations.
- HTTPS and signed asset URLs required.
- GDPR or CCPA compliant opt out for personalized targeting.
- Ad delivery logs retained for 13 months per compliance rules.

### Acceptance Criteria
- New creative deploys globally within 60 seconds of approval.
- Programmatic refresh cycle runs automatically every 30 seconds without frame drop.
- Admins can replace any sponsor zone creative in under 2 minutes from upload to live render.
- Reporting latency under 5 minutes for impression metrics.

## 26. Ad System Revenue Share and Sponsor Reporting Integration
### Objective
Connect the programmatic ad engine directly to the franchise revenue share model, ensuring each venue and sponsor receives transparent performance data and accurate revenue allocation.

### Revenue Attribution Framework
1. Impression Based Allocation  
   Each ad view generates an impression log with timestamp, venue ID, sponsor ID, and creative ID. The central analytics engine aggregates impressions by venue, campaign, and time range. Revenue share is computed based on total impressions or CPM defined in the contract.
2. Sponsor Specific Attribution  
   Direct sponsorships (exclusive local deals) override programmatic fills in their assigned zones. System tags these impressions as guaranteed inventory for that sponsor. Reports separate guaranteed versus programmatic impressions for transparency.
3. Franchise Revenue Split (Default)  
   | Stream | Franchisor | Venue |  
   | --- | --- | --- |  
   | Programmatic Ads | 50 percent | 50 percent |  
   | Guaranteed Sponsorship Ads | 30 percent | 70 percent |  
   | National Brand Placements | 70 percent | 30 percent |  
   Percentages configurable per contract. Automated payout statements generated monthly.

### Reporting and Reconciliation
- Daily Analytics Feed: aggregates ad performance metrics (impressions, view time, CTR) per sponsor, venue, and creative.
- Revenue Engine: calculates earnings per impression or per campaign and allocates to each stakeholder.
- Dashboard Exports: venue and franchisor dashboards show total views and engagement metrics per zone, current CPM rate and accrued revenue, breakdown of local versus national campaigns, month to date and season to date payouts.

### Sponsor Reporting Portal
- Sponsors can log in to view campaign metrics (impressions, dwell time, engagement, conversion if applicable).
- Heatmap visualizations showing where viewers focused.
- Click through data for interactive ads.
- Option to download white label reports for marketing use.

### Compliance and Validation
- Automatic verification of logged impressions using timestamp and viewer session ID to prevent fraud.
- Duplicate or partial views filtered by the analytics service.
- Revenue records reconciled weekly with ad network reports (if external DSPs used).

### API Endpoints for Integration
```
GET  /ads/revenue?venue_id=&range=
GET  /ads/reports/sponsor?campaign_id=
POST /ads/reports/export
GET  /ads/heatmap?event_id=
```

### Acceptance Criteria
- Revenue data synchronized daily between ad server and franchise dashboard.
- Sponsor reporting latency < 6 hours after event end.
- Automatic monthly payout summaries generated with <1 percent variance to verified ad logs.
- Sponsors can access real time performance views without manual intervention.

## 27. Public API Integration Layer (Required vs. Optional)
### Purpose
Centralize and secure all third party integrations behind internal services so the platform remains private and franchise grade.

### Required Integrations
- Auth: Auth0 or AWS Cognito or Firebase Auth (federated logins, passkeys)
- Payments: Stripe (web plus mobile IAP sync)
- Storage or CDN: AWS S3 plus CloudFront or GCS plus Cloud CDN
- Telemetry: OpenTelemetry exporters to your metrics stack

### Optional Integrations
- Streaming: AWS IVS, Agora, Wowza (if not rolling pure WebRTC)
- Programmatic Ads: Google Ad Manager, SSP or DSP connectors
- Analytics: Mixpanel, Amplitude, GA4 for product analytics (aggregate)
- CRM and Marketing: Salesforce, HubSpot; email via SendGrid or Postmark

### Gateway Pattern
All third party API calls originate from integration services (server to server), using a secrets manager; no keys in clients. Retry and circuit breaker policies enabled.

## 28. Ad Sales Workflows (Venue and HQ)
### Roles
- Venue Seller: packages local sponsors
- HQ Ad Ops: reviews, traffics programmatic, QA
- Sponsor: uploads creative (optional portal)

### Workflows
1. Local Sponsorship  
   Seller selects inventory -> proposes rates -> contract signed -> invoice in Stripe -> creative uploaded -> placement scheduled -> live -> report.
2. Programmatic Fill  
   HQ defines zones eligible for programmatic -> connects GAM line items -> pacing and frequency caps -> realtime rotation.
3. Makegood or Replacement  
   If delivery shortfall, system auto reallocates impressions next event; seller notified.

### SLAs
- Creative QA < 24 hours; live swaps < 60 seconds; report T+6 hours.

## 29. Cloud Recording and Archival System (Internal Use)
### Goals
Private, durable storage for raw 360 captures and edited assets; searchable and shareable via signed links.

### Storage Tiers
- Hot (0 to 6 months): S3 or GCS Standard
- Warm (6 to 18 months): IA or Nearline
- Cold (18+ months): Glacier or Backblaze B2 Archive

### Foldering
`/property/season/event/camera/` with metadata records in DB.

### Upload Paths
- Manual: operator exports from camera -> admin upload
- Automated (Phase 2): watcher app auto uploads and tags; webhooks to transcoder

### Access Control
- RBAC plus signed URLs, watermark on review copies, audit logs on downloads.

## 30. Venue Readiness Checklist (Pre Event)
- Hardware: cameras mounted and leveled; batteries or power; spare media.
- Network: dedicated SSID; bandwidth >= 25 Mbps up per camera; latency < 100 ms; failover path tested.
- Auth: devices registered; time sync (NTP) OK.
- Client QA: account login; entitlement unlock; angles; zoom; sponsor zones render.
- Health Dashboard: all streams green; alerts configured.
- Runbook: escalation contacts; rollback creative prepared; promo codes loaded.

## 31. Beta Test Deployment Plan
### Scope
Two cameras (mid sideline, end zone), one event, 50 to 200 beta viewers.

### Success Metrics
- Time to first frame < 5 seconds
- Glass to glass < 1 second
- Rebuffer < 2 percent
- Crash free > 99.5 percent
- NPS >= 40

### Steps
1. Dry run in empty venue -> network soak test.
2. Staff rehearsal with zoom and ads.
3. Live beta -> collect telemetry and surveys.
4. Postmortem -> fix list -> go or no go for public launch.

## 32. Detailed Endpoint Schema (MVP)
**Auth**
- `POST /auth/signup {email, provider}` -> `{user_id}`
- `POST /auth/login {email|oauth}` -> `{access_token, refresh_token}`
- `POST /auth/magiclink {email}` -> `204`

**Catalog and Orders**
- `GET /catalog` -> `[{product_id, type: ticket|sub|addon, price, rules}]`
- `POST /orders {items:[{product_id, qty}], return_url}` -> `{checkout_url}`
- `POST /payments/webhook` (Stripe) -> `200`

**Entitlements**
- `GET /entitlements` -> `[{event_id, angles, expires_at}]`

**Events and Feeds**
- `GET /events?status=live|upcoming`
- `GET /events/{id}` -> `{venue, start, feeds}`
- `GET /events/{id}/feeds` -> `[{type:360, url, token, ttl_sec}]`

**Creative and Ads**
- `POST /creative/upload` (multipart) -> `{asset_id}`
- `POST /placements {event_id, anchor_id, asset_id, schedule}` -> `{placement_id}`
- `GET /ads/serve?event_id=&zone=` -> `{creative_url, duration, tracking}`

**Telemetry**
- `POST /metrics {session_id, metric, value, dims}` -> `204`

## 33. Data Contracts (Samples)
**Entitlement (JSON)**
```json
{
  "account_id": "u_123",
  "event_id": "evt_2025_10_18",
  "angles": ["sideline", "endzone", "broadcast"],
  "starts_at": "2025-10-18T18:00:00Z",
  "expires_at": "2025-10-20T18:00:00Z"
}
```

**Ad Serve Response**
```json
{
  "zone": "ribbon_1",
  "creative_url": "https://cdn.example.com/ads/acme_loop.mp4",
  "duration": 30,
  "priority": 90,
  "click_url": "https://acme.com/offer",
  "tracking": ["https://t.example.com/i?e=..."],
  "fallback": "https://cdn.example.com/ads/default.png"
}
```

## 34. QA and Test Plan
**Automated**
- API unit and contract tests
- Player performance tests (frame time, decode load)
- Synthetic ad rotation and revenue calc tests

**Manual**
- Venue end to end rehearsal
- Multi device login and entitlement checks
- Zoom artifact and motion comfort review

**Load**
- 5k concurrent session soak; chaos tests on feed failover

## 35. Risk Register (Top Items)
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Rights ambiguity | High | Execute rights addendum per venue or conference |
| RF interference | Medium | Wired primary plus bonded 5G backup |
| Motion sickness | Medium | Comfort defaults, reduced FOV toggle |
| IAP or subscription sync drift | Medium | Single source of truth plus webhook reconciliation |
| Ad quality variance | Low | Creative QA plus auto transcoding profiles |

## 36. Timeline and Budget Snapshot (MVP)
- Phase 0 (2 weeks): rights plus vendor selection
- Phase 1 (6 to 8 weeks): core APIs, admin, basic player
- Phase 2 (6 weeks): purchase, entitlements, party, ads v1
- Phase 3 (4 weeks): scale tests, security hardening, beta launch

- CapEx: cameras and mounts ($5k to $15k per venue)
- OpEx: cloud or CDN $0.03 to $0.08 per GB egress; auth or payments fees per transaction

## 37. Go To Market and Launch Checklist
- Pilot venue contracted; franchise or license executed
- Equipment installed; certification passed
- Free trial game scheduled; promo assets approved
- Pricing page and upgrade CTA live (web or mobile or VR)
- Sponsor packages loaded; ad rotations tested
- Support runbook and escalation matrix distributed
- Post event report templates configured
