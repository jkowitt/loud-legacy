import { Layout } from "../../components/Layout";
import { HealthTiles } from "../../components/HealthTiles";
import type { SystemHealth } from "../../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

async function fetchHealth(): Promise<SystemHealth | null> {
  const res = await fetch(`${API_BASE}/health/live`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function HealthPage() {
  const health = await fetchHealth();
  return (
    <Layout>
      <HealthTiles health={health} />
    </Layout>
  );
}
