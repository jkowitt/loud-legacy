import type { BrandKey } from "@loud-legacy/shared-analytics";

export type BrandDefinition = {
  key: BrandKey;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  status: "live" | "beta" | "roadmap";
};

export const brands: BrandDefinition[] = [
  {
    key: "valora",
    name: "Legacy RE",
    slug: "valora",
    tagline: "Legacy RE. Built to Last.",
    description:
      "AI-powered real estate intelligence platform combining valuations, underwriting, and portfolio management in one comprehensive system.",
    primaryCta: { label: "Explore Legacy RE", href: "/valora" },
    secondaryCta: { label: "Platform overview", href: "/brands/valora" },
    status: "beta"
  },
];
