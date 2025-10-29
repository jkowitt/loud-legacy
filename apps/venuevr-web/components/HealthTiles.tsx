import styles from "./HealthTiles.module.css";
import type { SystemHealth } from "../lib/api";

type HealthTilesProps = {
  health: SystemHealth | null;
};

export function HealthTiles({ health }: HealthTilesProps) {
  const tiles = [
    { label: "Ingest", status: health?.ingest.status ?? "unknown" },
    { label: "Encoder", status: health?.encoder.status ?? "unknown" },
    { label: "Playback", status: health?.playback.status ?? "unknown" }
  ];

  return (
    <section className="surface">
      <header className={styles.header}>
        <h2>Live Health</h2>
        <span className={styles.timestamp}>
          {health?.checked_at ? new Date(health.checked_at).toLocaleTimeString() : "Pending"}
        </span>
      </header>
      <div className={styles.grid}>
        {tiles.map((tile) => (
          <div key={tile.label} className={`${styles.tile} ${styles[tile.status] ?? ""}`}>
            <span>{tile.label}</span>
            <strong>{tile.status.toUpperCase()}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
