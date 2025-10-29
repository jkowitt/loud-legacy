## Data Governance & Quality Plan

### Objectives

- Ensure every inbound feed has a documented contract (schema, SLA, license scope).
- Detect freshness or schema drift within 15 minutes for streaming feeds and 2 hours for batch feeds.
- Provide compliance and audit teams with traceable lineage for every valuation estimate.

### Data Contracts

- Contracts are stored in `contracts/{provider}/{dataset}.yaml` (to be populated per feed).
- Required fields: `licensor`, `permitted_usage`, `retention_limit_days`, `schema`, `refresh_frequency`, `quality_rules`.
- Ingestion jobs fail closed when contracts are missing or marked inactive.

### Quality Checks

- **Great Expectations** suites run pre-landing (validate raw file structure) and post-curation (validate business rules).
- Critical expectations: non-null primary keys, numeric bounds (e.g., square footage limits), referential integrity to lookup tables, geospatial validity.
- Failures raise PagerDuty incidents tagged `data-quality` and move records to an S3 quarantine bucket with retention for 30 days.

### Freshness Monitoring

- Glue jobs emit `freshness_lag_seconds` metrics per dataset. Alerts fire when lag exceeds SLA thresholds.
- Streaming feeds publish heartbeat events every 5 minutes; missing two consecutive heartbeats triggers investigation.

### Lineage

- All pipelines emit OpenLineage events (job start/complete, inputs, outputs, run facets).
- Metadata is centralised in a Marquez instance (or Databricks Unity Catalog if adopted).
- Valuation services attach `lineage_ref` (e.g., feature set version + model version) to every valuation record.

### Access Controls

- Lake Formation grants are scoped to IAM roles per persona:
  - Data scientists: read curated + feature zones, write sandbox tables.
  - Data engineers: manage ingestion zones, update contracts.
  - Compliance officers: read audit logs, contracts, lineage metadata.
- Field-level redaction enforced via LF tags and column-level KMS keys.

### Retention & Purging

- Implement S3 lifecycle rules based on contract retention limits.
- Support GDPR/CCPA deletes by mapping subjects to tokenised identifiers and orchestrating purges via Step Functions.

### Observability

- Data quality metrics are exported to CloudWatch/Prometheus dashboards.
- DQ incidents capture context (dataset, failure mode, scope) for post-incident reviews.
