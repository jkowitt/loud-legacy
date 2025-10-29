## VALORA Data Dictionary (v0.1)

### Conventions

- **Primary keys** use UUID v7 (time sortable) unless noted.
- **Timestamps** are stored in UTC ISO-8601 with millisecond precision.
- Tenant isolation: every entity referencing customer-facing data carries a `tenant_id`.

### Asset

| Field | Type | Description |
| --- | --- | --- |
| asset_id | uuid | Primary key for the asset record. Shared across valuations and comps. |
| tenant_id | uuid | Owning tenant. |
| class | enum(`real_estate`,`auto`,`other`) | Asset class. |
| status | enum(`active`,`archived`) | Lifecycle status. |
| attributes | jsonb | Asset-specific attributes (bedrooms, VIN, etc.). |
| created_at | timestamp | Creation timestamp. |
| updated_at | timestamp | Last mutation timestamp. |

### Valuation

| Field | Type | Description |
| --- | --- | --- |
| valuation_id | uuid | Primary key. |
| tenant_id | uuid | Tenant scope. |
| asset_id | uuid | References `Asset.asset_id`. |
| model_version | text | Champion model identifier. |
| estimate | numeric(14,2) | Point estimate in USD. |
| currency | char(3) | ISO 4217 currency code. |
| confidence | numeric(4,2) | Confidence score (0-1). |
| interval_low | numeric(14,2) | Lower bound of confidence interval. |
| interval_high | numeric(14,2) | Upper bound. |
| status | enum(`completed`,`pending`,`failed`) | Processing state. |
| submitted_at | timestamp | Request submission time. |
| completed_at | timestamp | Completion time or null if incomplete. |
| request_payload | jsonb | Normalised request attributes. |
| explainability | jsonb | Explanation payload (e.g., SHAP contributions). |

### Comparable

| Field | Type | Description |
| --- | --- | --- |
| comparable_id | uuid | Primary key. |
| tenant_id | uuid | Tenant scope for private comps. |
| asset_id | uuid | Optional link back to tracked asset. |
| address | text | Formatted address. |
| geo_hash | text | H3 index for spatial queries. |
| sale_price | numeric(14,2) | Recorded sale price. |
| sale_date | date | Closing date. |
| source | text | Data source identifier. |
| features | jsonb | Normalised features (sqft, beds, etc.). |
| ingestion_batch_id | uuid | References ingestion lineage. |

### UsageRecord

| Field | Type | Description |
| --- | --- | --- |
| usage_id | uuid | Primary key. |
| tenant_id | uuid | Tenant. |
| plan_id | uuid | Active plan at the time. |
| feature | enum(`valuation.single`,`valuation.bulk`,`comps.search`) | Feature consumed. |
| quantity | integer | Units consumed. |
| recorded_at | timestamp | When the usage occurred. |
| correlator_id | text | Optional request identifier. |

### Plan

| Field | Type | Description |
| --- | --- | --- |
| plan_id | uuid | Primary key. |
| name | enum(`starter`,`pro`,`enterprise`) | Plan slug. |
| base_price | numeric(10,2) | Monthly base price (USD). |
| included_units | jsonb | Feature-to-allowance mapping. |
| overage_rates | jsonb | Feature-to-overage mapping. |
| created_at | timestamp | Creation timestamp. |
| updated_at | timestamp | Last update. |

### SourceDocument

| Field | Type | Description |
| --- | --- | --- |
| document_id | uuid | Primary key. |
| source_key | text | Upstream provider identifier. |
| dataset | text | Logical dataset name (e.g., `county_assessor`). |
| license_contract_id | uuid | References contract metadata. |
| checksum | text | Content hash for dedupe and lineage. |
| effective_date | date | Applicable date for the record. |
| payload | jsonb | Raw vendor payload. |
| ingested_at | timestamp | Timestamp of ingestion. |
| quality_status | enum(`passed`,`warning`,`failed`) | Result of quality checks. |

### Lineage Metadata

- Stored via OpenLineage-compatible events emitted during Glue/stream jobs.
- Key fields: `job_name`, `run_id`, `parent_run_id`, `inputs`, `outputs`, `facets`.

### Governance Notes

- All tables include `created_by` and `updated_by` for auditability.
- PII (e.g., homeowner name) is tokenised before landing in the curated zone. Tokens map to encrypted vault entries when necessary for compliance workflows.
- Data retention defaults to 7 years for valuation events unless a shorter vendor retention limit applies; enforce via lifecycle policies per dataset.
