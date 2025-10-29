import { Building2, Compass, MapPin } from "lucide-react";

import type { MockListing } from "../data/mockListings";

interface PropertyCardProps {
  listing: MockListing;
  ctaLabel?: string;
  onCtaClick?: () => void;
  muted?: boolean;
}

export const PropertyCard = ({ listing, ctaLabel, onCtaClick, muted = false }: PropertyCardProps) => {
  return (
    <article
      className={`rounded-2xl border ${
        muted ? "border-brand-800/60 bg-brand-900/30" : "border-brand-800 bg-surface/70 shadow-hard"
      } transition hover:border-accent/40`}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <img
          src={listing.photo}
          alt={listing.address}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full border border-accent/60 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          Confidence {listing.confidence}
        </span>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <p className="text-lg font-semibold text-neutral-100">{listing.address}</p>
          <p className="text-sm text-neutral-500">
            {listing.city}, {listing.state} {listing.zip}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm text-neutral-300">
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-accent" />
            {listing.beds} bd
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            {listing.baths} ba
          </span>
          <span className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-accent" />
            {listing.sqft.toLocaleString()} sqft
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-neutral-300">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">Asking</p>
            <p className="text-lg font-semibold text-neutral-100">{listing.price}</p>
          </div>
            <div>
            <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">VALORA</p>
            <p className="text-lg font-semibold text-accent">{listing.estimate}</p>
          </div>
        </div>
        {ctaLabel && (
          <button
            className="w-full rounded-lg border border-brand-800 bg-brand-900/40 px-4 py-2 text-sm text-neutral-200 transition hover:text-accent"
            onClick={onCtaClick}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </article>
  );
};
