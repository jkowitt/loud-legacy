## VALORA Platform Architecture

VALORA is a modular, service-oriented valuation platform designed for rapid appraisal of multiple hard asset classes. The target deployment lives on AWS and balances synchronous APIs with asynchronous processing to achieve the stated latency, accuracy, and uptime goals.

### High-Level Topology

```mermaid
flowchart LR
    subgraph Client
        Web[React Web App]
        APIClient[External API Clients]
    end

    subgraph Edge
        WAF[CloudFront + WAF]
        APIGW[API Gateway]
    end

    subgraph CoreServices
        AuthCognito[Auth Service (Cognito/OIDC)]
        Orchestrator[Valuation Orchestrator]
        Pricing[Pricing & Plans]
        Billing[Billing (Stripe)]
        Admin[Admin & Tenant Mgmt]
        Usage[Usage Meter Service]
        DataFeeds[Market Data Feeds]
    end

    subgraph ValuationPipelines
        RealEstate[Real Estate Pipeline]
        Autos[Auto Pipeline]
    end

    subgraph DataPlane
        StreamIngest[Streaming Ingest (Kinesis/SNS)]
        BatchIngest[Batch Ingest (Glue ETL)]
        Lake[S3 Data Lake + Lake Formation]
        FeatureStore[SageMaker Feature Store / MLflow]
        Warehouse[Athena/Redshift Spectrum]
    end

    subgraph Observability
        Logs[CloudWatch Logs]
        Metrics[CloudWatch Metrics / Prometheus]
        Traces[X-Ray / OpenTelemetry]
    end

    Client -->|HTTPS| WAF --> APIGW
    APIGW --> AuthCognito
    APIGW --> Orchestrator
    APIGW --> Pricing
    APIGW --> Billing
    APIGW --> Admin
    APIGW --> Usage
    APIGW --> DataFeeds
    Orchestrator -->|Sync REST| RealEstate
    Orchestrator -->|Sync REST| Autos
    Orchestrator --> DataFeeds
    Orchestrator -->|Async Jobs| SNS[(SNS Topics)]
    SNS --> SQS[(SQS Queues)]
    SQS --> BatchIngest
    StreamIngest --> Lake
    BatchIngest --> Lake
    RealEstate --> FeatureStore
    Autos --> FeatureStore
    FeatureStore --> ModelServing[(Model Serving)]
    ModelServing --> RealEstate
    ModelServing --> Autos
    Lake --> Warehouse
    Metrics --> Observability
    Logs --> Observability
    Traces --> Observability
```

### Service Responsibilities

- **API Gateway & Auth** routes external traffic, enforces rate limits, and obtains JWTs from Cognito (or Auth0). All downstream services validate tokens and enforce tenant scopes.
- **Valuation Orchestrator** accepts valuation requests, normalises payloads, enforces plan quotas via the Pricing service, and dispatches to the correct asset pipeline. It also manages retries, fallbacks, and async job creation for bulk CSV uploads.
- **Asset Pipelines** (Real Estate, Autos) fetch feature vectors from the feature store, call the latest champion model in Model Serving, enrich with comparable selections, and assemble explainability payloads.
- **Model Serving** hosts versioned models behind `/predict` and `/explain` endpoints. Feature flags allow a candidate model to shadow live traffic before promotion.
- **Comparable Engine** indexes and ranks comps using geospatial search (H3 proximity) and similarity scoring. It subscribes to ingestion events to keep the index fresh.
- **Data Pipeline** owns ingestion, data contracts, and lineage. Batch jobs (Glue) pull assessor records; streaming jobs (Kinesis) capture near-real-time marketplace data. Great Expectations validates every dataset before landing in the curated zone.
- **Pricing & Plans** tracks plan entitlements, metered usage, and upgrades/downgrades. It integrates with Stripe via the Billing service.
- **Admin & Tenant Management** manages organisations, user roles, API keys, and webhook registrations. It exposes audit trails to compliance officers.
- **Observability Stack** centralises logs, metrics, and traces with alerting bound to SLOs (latency, error rate, saturation).
- **Market Data Feeds** proxies external APIs (interest rates, residential/commercial transactions) with caching and contract enforcement so downstream services can retrieve real-time market intelligence.

### Deployment Footprint

- **Networking**: All compute runs inside a multi-AZ VPC. Public subnets host the load balancer/API Gateway. Private subnets host Fargate tasks/EKS nodes, RDS, and ElastiCache.
- **Compute**: Stateless services run as containers on ECS Fargate initially. Model Serving can scale independently, with GPU-enabled profiles if needed. Batch jobs run on Glue or Step Functions-managed containers.
- **Data**: S3 data lake stratified into bronze/silver/gold zones. Lake Formation controls access. Athena answers ad hoc queries; Redshift Spectrum serves analytics dashboards. DynamoDB (or Aurora Serverless v2) stores operational data like valuations, comps, and usage records.
- **Security**: IAM roles with least privilege, Secrets Manager for credentials, and KMS CMKs for data at rest. WAF enforces IP and bot rules. Field-level encryption protects PII (e.g., street addresses).

### Availability & Performance

- Multi-AZ deployments with auto-scaling groups sized to handle 200 sustained valuations per second.
- Cached valuations for frequently requested assets are stored in ElastiCache/Redis with TTL to satisfy the 800 ms hot-path latency target.
- Bulk jobs run asynchronously with progress persisted to DynamoDB and results stored in S3 for download.

### Future Considerations

- Expand asset pipelines by adding new microservices registered with the Orchestrator.
- Evaluate event-driven valuations for webhook-triggered updates.
- Introduce canary deployments via CodeDeploy and feature flags to promote new models safely.
