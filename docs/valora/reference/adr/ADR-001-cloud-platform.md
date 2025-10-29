# ADR-001: Deploy VALORA on AWS with Managed Services

- **Date:** 2025-05-26
- **Status:** Proposed
- **Context:** VALORA requires low operational overhead, strong data governance tooling, and native ML ops support. The platform must ingest public records, host real-time APIs, and manage sensitive PII with auditability.
- **Decision:** Use AWS as the primary cloud provider, leveraging fully managed services (ECS Fargate, API Gateway, Cognito, Glue, S3, Lake Formation, SageMaker) wherever they meet requirements.
- **Consequences:**
  - Pros: Mature ecosystem, integrated IAM, FedRAMP & SOC reports, first-class eventing and ML services, cost transparency.
  - Cons: Risk of vendor lock-in; team must skill up on AWS specifics; some services (e.g., Cognito) have UX trade-offs that may need customisation.
  - Mitigations: Document service abstraction boundaries, maintain infrastructure-as-code (Terraform/CDK) to enable portability, and periodically assess alternatives for critical components.
