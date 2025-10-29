import styles from "./EventHero.module.css";
import type { EventDetail } from "../lib/api";

type EventHeroProps = {
  event: EventDetail;
};

export function EventHero({ event }: EventHeroProps) {
  return (
    <section className={`surface ${styles.hero}`}>
      <div className={styles.meta}>
        <span className="badge">{event.league}</span>
        <h1>
          {event.home_team} vs {event.away_team}
        </h1>
        <p>{new Date(event.start_time).toLocaleString()}</p>
        <div className={styles.actions}>
          <button className={styles.primary}>Purchase Pass</button>
          <button className={styles.secondary}>Preview</button>
        </div>
      </div>
      <div className={styles.angles}>
        <h3>Available Angles</h3>
        <ul>
          {event.feeds.map((feed) => (
            <li key={feed.id}>
              <button type="button" disabled>
                {feed.id.replace("_", " ")}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
