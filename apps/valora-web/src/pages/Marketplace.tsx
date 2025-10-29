import { DollarSign } from "lucide-react";

import { DataPanel } from "../components/DataPanel";
import { PropertyCard } from "../components/PropertyCard";
import { ValoraMap } from "../components/ValoraMap";
import { mockListings } from "../data/mockListings";

export const MarketplacePage = () => {
  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">marketplace</p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-100">Residential deals in flight</h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-400">
            Compare live listings with instant VALORA valuations. Sellers can push updates, buyers can request
            precision comps, and both sides stay in sync with confidence bands.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20">
          <DollarSign className="h-4 w-4" />
          Create seller listing
        </button>
      </header>

      <ValoraMap />

      <div className="grid gap-6 lg:grid-cols-3">
        {mockListings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} ctaLabel="Request diligence pack" />
        ))}
      </div>

      <DataPanel title="How it works" subtitle="buyers & sellers">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-4 text-sm text-neutral-300">
            <p className="font-semibold text-neutral-100">1. Seller posts asset</p>
            <p className="mt-2 text-neutral-400">Sync property details and upload imagery. VALORA refreshes valuations within seconds.</p>
          </div>
          <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-4 text-sm text-neutral-300">
            <p className="font-semibold text-neutral-100">2. Buyers review comps</p>
            <p className="mt-2 text-neutral-400">Request explainability, comparable set, and rent rolls before making an offer.</p>
          </div>
          <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-4 text-sm text-neutral-300">
            <p className="font-semibold text-neutral-100">3. Close with confidence</p>
            <p className="mt-2 text-neutral-400">Tracked offers, escrow milestones, and automated valuation updates to closing.</p>
          </div>
        </div>
      </DataPanel>
    </div>
  );
};
