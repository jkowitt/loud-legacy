import { notFound } from "next/navigation";

import { Layout } from "../../../components/Layout";
import { EventHero } from "../../../components/EventHero";
import { SponsorShowcase } from "../../../components/SponsorShowcase";
import { PartyPanel } from "../../../components/PartyPanel";
import type { CreativePlacement, EventDetail } from "../../../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

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

async function fetchEvent(eventId: string): Promise<EventDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/events/${eventId}`, { cache: "no-store" });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (error) {
    // API unavailable, falling back to sample event
    return { ...FALLBACK_EVENT, id: eventId };
  }
}

async function fetchPlacements(eventId: string): Promise<CreativePlacement[]> {
  try {
    const res = await fetch(`${API_BASE}/creative/events/${eventId}/placements`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (error) {
    // API unavailable, falling back to empty placements
    return [];
  }
}

type EventPageProps = {
  params: { id: string };
};

export default async function EventDetailPage({ params }: EventPageProps) {
  const event = await fetchEvent(params.id);
  if (!event) {
    notFound();
  }
  const placements = await fetchPlacements(params.id);
  return (
    <Layout>
      <EventHero event={event} />
      <div style={{ marginTop: "24px", display: "grid", gap: "24px", gridTemplateColumns: "2fr 1fr" }}>
        <SponsorShowcase placements={placements} />
        <PartyPanel eventId={event.id} />
      </div>
    </Layout>
  );
}
