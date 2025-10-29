export type PremiumModule = {
  slug: string;
  title: string;
  summary: string;
  lessons: string[];
  estimatedTime: string;
  deliverables: string[];
};

export const premiumModules: PremiumModule[] = [
  {
    slug: "home-maintenance-bootcamp",
    title: "30-Day Home Maintenance Bootcamp",
    summary:
      "Daily micro-lessons that walk you through every system in your home so you can prevent emergencies before they happen.",
    lessons: [
      "Water systems: mapping shut-offs, testing sump pumps",
      "Electrical safety: panel walkthrough and labeling",
      "HVAC tune-up: filter schedules, coil cleaning, and thermostat optimization",
      "Exterior defense: gutters, grading, and weatherproofing",
      "Appliance longevity: upkeep routines that add years of service"
    ],
    estimatedTime: "30 days · 20 minutes/day",
    deliverables: [
      "Printable seasonal maintenance calendar",
      "Emergency shutoff quick-reference sheet",
      "Maintenance tracker template compatible with Notion, Sheets, and Excel"
    ]
  },
  {
    slug: "pro-tool-mastery",
    title: "Pro Tool Mastery Lab",
    summary:
      "Video-first training on intermediate and pro-grade tools so you can work faster without sacrificing safety.",
    lessons: [
      "Impact vs. drill: torque settings, clutch control, and pro bits",
      "Oscillating multi-tool workflows for flush cuts and precision plunge cuts",
      "Laser levels and layout tricks for cabinets, tile, and framing",
      "Introduction to PEX expansion and crimp systems",
      "Dust collection upgrades for clean workspaces"
    ],
    estimatedTime: "5 modules · 90 minutes each",
    deliverables: [
      "Downloadable cut lists and measurement cheat sheets",
      "Discount codes on partner tool kits",
      "Access to office hours with the Mr. Fix It crew"
    ]
  },
  {
    slug: "flip-ready-renovations",
    title: "Flip-Ready Renovations",
    summary:
      "Project planning frameworks, budgets, and walkthroughs that get your next remodel investor-ready.",
    lessons: [
      "Scoping a remodel: due diligence checklist and vendor vetting",
      "Budget forecasting with contingency buffers",
      "Permit pathways and inspection prep",
      "Sourcing materials for quality + margin",
      "Punch list systems that keep contractors accountable"
    ],
    estimatedTime: "4 weeks · self-paced",
    deliverables: [
      "Editable renovation budget workbook",
      "Sample GC contract addendum",
      "Inspection day walk-through script"
    ]
  }
];
