export type EventSummary = {
  id: string;
  league: string;
  home_team: string;
  away_team: string;
  start_time: string;
  status: "draft" | "scheduled" | "live" | "ended";
  venue: {
    id: string;
    name: string;
  };
};

export type EventFeed = {
  id: string;
  type: string;
  url?: string;
  token?: string;
  ttl_sec?: number;
};

export type EventDetail = EventSummary & {
  feeds: EventFeed[];
};

export type CatalogItem = {
  product_id: string;
  type: "ticket" | "subscription" | "addon";
  name: string;
  price_cents: number;
  currency: string;
  rules: Record<string, unknown>;
};

export type CreativePlacement = {
  id: string;
  event_id: string;
  anchor_ref: string;
  asset_id: string;
  start_ts: string;
  end_ts: string;
  status: string;
  rules: Record<string, unknown>;
};

export type SystemHealth = {
  status: string;
  checked_at: string;
  ingest: { status: string };
  encoder: { status: string };
  playback: { status: string };
};

export type UserProfile = {
  id: string;
  email: string;
  display_name?: string;
  roles: string[];
  entitlements?: string[];
};
