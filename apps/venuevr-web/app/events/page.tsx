import Link from "next/link";

import { Layout } from "../../components/Layout";
import type { EventSummary } from "../../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

const FALLBACK_EVENTS: EventSummary[] = [
  {
    id: "evt_demo",
    league: "Premier Five",
    home_team: "Metro Hawks",
    away_team: "River City Waves",
    start_time: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    status: "scheduled",
    venue: { id: "venue_demo", name: "Downtown Arena" }
  }
];

async function fetchEvents(): Promise<EventSummary[]> {
  try {
    const res = await fetch(`${API_BASE}/events`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (error) {
    console.warn("[events] Falling back to sample events:", error);
    return FALLBACK_EVENTS;
  }
}

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <Layout>
      <section className="surface">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <div>
            <h1>Events</h1>
            <p>Configure angles, replays, and sponsor zones per game.</p>
          </div>
          <button style={{ padding: "10px 16px", borderRadius: "10px", border: "none", background: "var(--color-primary)", color: "white" }}>
            New Event
          </button>
        </header>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Matchup</th>
              <th align="left">Start</th>
              <th align="left">Venue</th>
              <th align="left">Status</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                <td>{event.home_team} vs {event.away_team}</td>
                <td>{new Date(event.start_time).toLocaleString()}</td>
                <td>{event.venue.name}</td>
                <td>{event.status}</td>
                <td>
                  <Link href={`/events/${event.id}`}>Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!events.length && <p style={{ color: "var(--color-text-muted)" }}>No events scheduled.</p>}
      </section>
    </Layout>
  );
}
