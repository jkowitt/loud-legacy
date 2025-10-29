import { Layout } from "../components/Layout";
import { EventHero } from "../components/EventHero";
import { EventList } from "../components/EventList";
import { SponsorShowcase } from "../components/SponsorShowcase";
import { CatalogList } from "../components/CatalogList";
import { HealthTiles } from "../components/HealthTiles";
import { PartyPanel } from "../components/PartyPanel";
import type { CatalogItem, CreativePlacement, EventDetail, EventSummary, SystemHealth } from "../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    cache: "no-store"
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return (await response.json()) as T;
}

function logFetchError(path: string, error: unknown) {
  console.warn(`[home] Falling back because request to ${path} failed:`, error);
}

const FALLBACK_EVENT: EventDetail = {
  id: "evt_demo",
  league: "Premier Five",
  home_team: "Metro Hawks",
  away_team: "River City Waves",
  start_time: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
  status: "scheduled",
  venue: { id: "venue_demo", name: "Downtown Arena" },
  feeds: [
    { id: "feed_360_a", type: "360" },
    { id: "feed_360_b", type: "360" },
    { id: "feed_audio", type: "audio" }
  ]
};

const FALLBACK_CATALOG: CatalogItem[] = [
  {
    product_id: "ticket_evt_demo",
    type: "ticket",
    name: "Event Pass",
    price_cents: 500,
    currency: "USD",
    rules: { trial_minutes: 20 }
  },
  {
    product_id: "sub_premium",
    type: "subscription",
    name: "Season Premium",
    price_cents: 10000,
    currency: "USD",
    rules: { access: "all_events" }
  }
];

export default async function HomePage() {
  const [events, catalog, placements, health] = await Promise.all([
    fetchJson<EventSummary[]>("/events").catch((error) => {
      logFetchError("/events", error);
      return [FALLBACK_EVENT];
    }),
    fetchJson<CatalogItem[]>("/catalog").catch((error) => {
      logFetchError("/catalog", error);
      return FALLBACK_CATALOG;
    }),
    fetchJson<CreativePlacement[]>("/creative/events/evt_demo/placements").catch((error) => {
      logFetchError("/creative/events/evt_demo/placements", error);
      return [];
    }),
    fetchJson<SystemHealth>("/health/live").catch((error) => {
      logFetchError("/health/live", error);
      return null;
    })
  ]);

  const featuredEvent = (events[0] as EventDetail | undefined) ?? FALLBACK_EVENT;

  return (
    <Layout>
      <>
        <EventHero event={{ ...featuredEvent, feeds: featuredEvent.feeds ?? [] }} />
        <div style={{ marginTop: "24px", display: "grid", gap: "24px", gridTemplateColumns: "2fr 1fr" }}>
          <EventList events={events} />
          <PartyPanel eventId={featuredEvent.id} />
        </div>
      </>
      <div style={{ marginTop: "24px", display: "grid", gap: "24px" }}>
        <CatalogList items={catalog} />
        <SponsorShowcase placements={placements} />
        <HealthTiles health={health} />
      </div>
    </Layout>
  );
}
