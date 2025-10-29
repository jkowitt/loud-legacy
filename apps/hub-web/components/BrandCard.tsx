"use client";

import Link from "next/link";
import { trackBrandCardClick } from "../lib/analytics";
import type { BrandDefinition } from "../lib/brands";

export function BrandCard({ brand }: { brand: BrandDefinition }) {
  return (
    <article className="card">
      <div className="badge" aria-label={`${brand.name} status`}>
        {brand.status === "live" ? "Live" : brand.status === "beta" ? "Private beta" : "Coming soon"}
      </div>
      <h3 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)" }}>{brand.name}</h3>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>{brand.description}</p>
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <Link className="button button--primary" href={brand.primaryCta.href} onClick={() => trackBrandCardClick(brand.key)} target={brand.primaryCta.href.startsWith("http") ? "_blank" : undefined} rel={brand.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}>
          {brand.primaryCta.label}
        </Link>
        {brand.secondaryCta ? (
          <Link className="button button--ghost" href={brand.secondaryCta.href} onClick={() => trackBrandCardClick(`${brand.key}-secondary`)} target={brand.secondaryCta.href.startsWith("http") ? "_blank" : undefined} rel={brand.secondaryCta.href.startsWith("http") ? "noreferrer" : undefined}>
            {brand.secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
