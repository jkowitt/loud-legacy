# ADR-002: Adopt Domain-Oriented Microservices for Valuation Workflows

- **Date:** 2025-05-26
- **Status:** Proposed
- **Context:** VALORA must support multiple asset classes, distinct ingestion sources, and independent model lifecycles. Monolithic codebases hinder parallel development by data science, platform, and product teams. Service isolation simplifies regulatory audits and enables staged rollouts.
- **Decision:** Partition the platform into domain-oriented services (API Gateway/Auth, Valuation Orchestrator, Comparable Engine, Pricing/Billing, Admin/Tenant, Observability) with explicit REST and event contracts. Shared libraries are limited to cross-cutting concerns (auth, telemetry, schemas).
- **Consequences:**
  - Pros: Autonomous teams, clearer ownership, isolated deployability, targeted scaling (e.g., Model Serving on GPU nodes).
  - Cons: Increased operational complexity, need for observability-by-default, potential for integration drift.
  - Mitigations: Maintain API specs in a shared repository, enforce contract testing, and invest early in platform tooling (provisioning templates, CI/CD pipelines, runbooks).
