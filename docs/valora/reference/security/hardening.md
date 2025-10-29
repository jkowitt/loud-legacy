# VALORA Cybersecurity Hardening Guide

## API Protection

- **API Key Enforcement (Marketplace Service)**: Every routed endpoint now requires an `X-API-Key` header. Set `MARKETPLACE_API_KEY` in production secrets and rotate via AWS Secrets Manager. Missing or mismatched keys return HTTP 401.
- **Security Headers**: Gateway and Marketplace responses include `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a baseline CSP to prevent MIME sniffing and clickjacking. Ensure TLS termination passes through these headers.
- **CORS**: Restrictive defaults allow only hosted clients; tighten `allow_origins` via env overrides when deploying.

## Credential Handling

- Passwords hash with `pbkdf2_sha256` (Passlib) and never stored in plaintext. Minimum length validation enforced via Pydantic schemas; recommend additional password complexity checks at client-side.
- Secrets (API keys, DB credentials) pulled from environment variables. For AWS, place them in Secrets Manager/SSM Parameter Store and load via deployment pipeline.

## Data Security

- SQLAlchemy ORM prevents SQL injection, and statements execute with bound parameters. Enable RDS encryption-at-rest and TLS in production by setting `MARKETPLACE_DATABASE_URL` to an `postgresql+psycopg` URI with `sslmode=require`.
- Implement regular backups and PITR on the PostgreSQL instance. Apply least-privilege DB roles: application user with only CRUD on VALORA schema.

## Observability & Incident Response

- Log all authentication failures and critical actions (plan rotations, listing publishes). Forward logs to centralized platform (CloudWatch / Datadog) with alerting on anomalous patterns (e.g., repeated 401s).
- Maintain runbooks for key incidents (credential leaks, suspicious traffic). Reference `docs/runbooks` once populated.

## Future Enhancements

- Integrate JWT/OIDC for rich auth; API key layer remains as fallback.
- Add rate limiting (e.g., Redis-based sliding window) on gateway.
- Implement signed webhooks and mTLS between internal services.
- Expand penetration testing and dependency scanning (Snyk/GitHub Advanced Security) as part of CI pipeline.
