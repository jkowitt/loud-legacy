## Marketplace & Subscription Database Schema (v0.1)

### Technology

- **Engine**: PostgreSQL in production; SQLite for local development.
- **ORM**: SQLAlchemy 2.0 with native typing and Pydantic response models.
- **Connections**: Managed via FastAPI dependency that yields a scoped session.

### Entities

| Table | Key Fields | Notes |
| --- | --- | --- |
| `users` | `id (uuid primary key)`, `email` (unique), `full_name`, `role` (`buyer`, `seller`, `dual`, `admin`), `password_hash`, `created_at` | Stores marketplace users. |
| `properties` | `id`, `address`, `city`, `state`, `postal_code`, `bedrooms`, `bathrooms`, `living_area_sqft`, `lot_size_sqft`, `year_built`, `description`, `created_at`, `owner_id` | Represents residential assets listed by sellers. |
| `valuations` | `id`, `property_id`, `estimate`, `confidence`, `valuation_method`, `created_at` | Captures valuation snapshots and links to property records. |
| `listings` | `id`, `property_id`, `seller_id`, `status` (`draft`, `active`, `under_contract`, `sold`), `asking_price`, `published_at` | Describes active listings on the marketplace. |
| `offers` | `id`, `listing_id`, `buyer_id`, `amount`, `status` (`submitted`, `accepted`, `declined`, `withdrawn`), `message`, `created_at` | Buyers can submit offers against listings. |
| `subscription_plans` | `id`, `code`, `name`, `monthly_price`, `annual_price`, `included_valuations`, `description`, `is_active` | Catalog of plans exposed on pricing page. |
| `subscriptions` | `id`, `user_id`, `plan_id`, `status` (`trialing`, `active`, `past_due`, `canceled`), `start_date`, `current_period_end`, `auto_renew` | Tracks tenant-level plan status. |
| `payments` | `id`, `subscription_id`, `amount`, `currency`, `provider`, `provider_ref`, `status` (`succeeded`, `pending`, `failed`), `processed_at` | Records payment attempts. |

### Relationships

- `users.id` → `properties.owner_id`, `listings.seller_id`, `offers.buyer_id`, `subscriptions.user_id`.
- `properties.id` → `valuations.property_id`, `listings.property_id`.
- `listings.id` → `offers.listing_id`.
- `subscription_plans.id` → `subscriptions.plan_id`.
- `subscriptions.id` → `payments.subscription_id`.

### Indexing

- `users.email` unique index for login.
- Composite index on `listings (status, published_at)` for marketplace filtering.
- Index on `valuations (property_id, created_at DESC)` for quick latest valuation lookup.
- Index on `subscriptions (user_id, status)` for billing jobs.

### Data Flow

1. Seller creates a property → system stores asset + optional valuation snapshot.
2. Seller publishes listing → triggers valuation orchestrator request to refresh estimate.
3. Buyers fetch listings, submit offers; sellers accept/decline.
4. Subscription plans determine usage entitlements via `included_valuations`; payments record Stripe/processor references.

### Migration Strategy

- Use Alembic migrations generated from SQLAlchemy metadata.
- Local development uses SQLite file `.marketplace.db` created automatically.
