import { Layout } from "../../components/Layout";
import { SponsorShowcase } from "../../components/SponsorShowcase";
import type { CreativePlacement } from "../../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

async function fetchPlacements(): Promise<CreativePlacement[]> {
  const res = await fetch(`${API_BASE}/creative/events/evt_demo/placements`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function SponsorsPage() {
  const placements = await fetchPlacements();
  return (
    <Layout>
      <SponsorShowcase placements={placements} />
    </Layout>
  );
}
