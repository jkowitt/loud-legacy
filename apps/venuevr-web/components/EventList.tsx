import Link from "next/link";
import styles from "./EventList.module.css";
import type { EventSummary } from "../lib/api";

type EventListProps = {
  events: EventSummary[];
};

export function EventList({ events }: EventListProps) {
  if (!events.length) {
    return (
      <section className="surface">
        <h2>Upcoming Events</h2>
        <p className={styles.empty}>No events yet. Check back after schedule upload.</p>
      </section>
    );
  }

  return (
    <section className="surface">
      <header className={styles.header}>
        <h2>Upcoming Events</h2>
        <Link href="/events">See all</Link>
      </header>
      <div className={styles.list}>
        {events.map((event) => (
          <article key={event.id} className={styles.card}>
            <div>
              <span className="badge">{event.league}</span>
              <h3>
                {event.home_team} vs {event.away_team}
              </h3>
              <p>{new Date(event.start_time).toLocaleString()}</p>
            </div>
            <div className={styles.meta}>
              <span>{event.venue.name}</span>
              <Link href={`/events/${event.id}`}>Preview</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
