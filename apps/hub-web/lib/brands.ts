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
    name: "VALORA",
    slug: "valora",
    tagline: "Asset valuation that moves as fast as your deals",
    description:
      "Model valuations, collaborate with teams, and pipe API outputs directly into your underwriting and deal rooms.",
    primaryCta: { label: "Explore VALORA", href: "https://valora.ai" },
    secondaryCta: { label: "Platform overview", href: "/brands/valora" },
    status: "beta"
  },
  {
    key: "venuevr",
    name: "VenueVR",
    slug: "venuevr",
    tagline: "Immersive sports for every seat in the house",
    description:
      "Deliver premium virtual venues, live feeds, and sponsor activations with one pipeline for capture, encoding, and playback.",
    primaryCta: { label: "Dive into VenueVR", href: "https://venuevr.com" },
    secondaryCta: { label: "For venue partners", href: "/brands/venuevr" },
    status: "beta"
  },
  {
    key: "business-now",
    name: "Business Now",
    slug: "business-now",
    tagline: "Operators-first playbooks and tools",
    description:
      "Courses, templates, and coaching that turn small business hustle into repeatable growth systems.",
    primaryCta: { label: "View Courses", href: "/brands/business-now" },
    status: "live"
  },
  {
    key: "sportify",
    name: "Sportify",
    slug: "sportify",
    tagline: "Live event execution without the chaos",
    description:
      "Plan run of shows, track sponsor activations, and execute game day moments from one operational record.",
    primaryCta: { label: "Explore Sportify", href: "/sportify" },
    secondaryCta: { label: "Request access", href: "mailto:hello@loud-legacy.com" },
    status: "beta"
  },
  {
    key: "legacy-crm",
    name: "Legacy CRM",
    slug: "legacy-crm",
    tagline: "Relationship management built for operators",
    description:
      "Track contacts, companies, and deals across all your ventures. Included free with any Loud Legacy subscription.",
    primaryCta: { label: "Open CRM", href: "/crm" },
    status: "live"
  }
];
