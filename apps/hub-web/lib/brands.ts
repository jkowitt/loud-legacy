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
    status: "roadmap"
  },
  {
    key: "diy-mr-fix-it",
    name: "DIY Mr Fix It",
    slug: "diy-mr-fix-it",
    tagline: "Project confidence for every room in the house",
    description:
      "Step-by-step projects, calculators, and pro tips that keep DIY on time, on budget, and stress free.",
    primaryCta: { label: "Start building", href: "https://diymrfixit.com" },
    secondaryCta: { label: "Tools & calculators", href: "/brands/diy" },
    status: "live"
  }
];
