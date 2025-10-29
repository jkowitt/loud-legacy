import { Link } from "react-router-dom";

import { PropertyCard } from "../components/PropertyCard";
import { mockListings } from "../data/mockListings";

export const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-background text-neutral-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <header className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent/70">Valora preview</p>
            <h1 className="mt-3 text-4xl font-semibold text-neutral-50">Explore live residential inventory</h1>
            <p className="mt-4 max-w-2xl text-sm text-neutral-400">
              Browse a snapshot of properties powered by VALORA valuations. This public view lets you gauge
              estimate accuracy and comps before creating an account.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-2 text-sm text-neutral-300 transition hover:text-accent"
            >
              Log in to console
            </Link>
            <Link
              to="/plans"
              className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20"
            >
              Start free trial
            </Link>
          </div>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} ctaLabel="View valuation summary" muted />
          ))}
        </section>

        <footer className="mt-16 rounded-2xl border border-brand-800 bg-brand-900/30 p-6 text-sm text-neutral-300">
          <p className="font-semibold text-neutral-100">Want deeper insight?</p>
          <p className="mt-2 text-neutral-400">
            Full subscribers unlock granular comps, explainability timelines, webhook alerts, and API access.
            Upgrade to VALORA Pro to automate your valuation workflows.
          </p>
        </footer>
      </div>
    </div>
  );
};
