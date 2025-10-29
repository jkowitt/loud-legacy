import styles from "./SponsorShowcase.module.css";
import type { CreativePlacement } from "../lib/api";

type SponsorShowcaseProps = {
  placements: CreativePlacement[];
};

export function SponsorShowcase({ placements }: SponsorShowcaseProps) {
  return (
    <section className={`surface ${styles.showcase}`}>
      <header>
        <h2>Sponsor Activations</h2>
        <p>Live creative rotation pulls from dynamic ad engine with instant rollback.</p>
      </header>
      <div className={styles.grid}>
        {placements.map((placement) => (
          <article key={placement.id} className={styles.card}>
            <div className={styles.tagline}>
              <span className="badge">{placement.anchor_ref}</span>
              <span>{placement.status}</span>
            </div>
            <h3>{placement.asset_id}</h3>
            <p>Window: {formatWindow(placement.start_ts, placement.end_ts)}</p>
          </article>
        ))}
        {!placements.length && <p className={styles.empty}>No sponsor zones configured yet.</p>}
      </div>
    </section>
  );
}

function formatWindow(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}
