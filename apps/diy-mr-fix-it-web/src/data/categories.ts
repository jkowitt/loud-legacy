export type ProjectCategory = {
  slug: string;
  name: string;
  description: string;
  featuredGuides: string[];
};

export const projectCategories: ProjectCategory[] = [
  {
    slug: "plumbing",
    name: "Plumbing",
    description: "Stop leaks, improve water pressure, and keep fixtures running smoothly.",
    featuredGuides: [
      "Fix a Leaky Faucet in 10 Minutes",
      "Unclog a Slow Shower Drain",
      "Install a New Kitchen Faucet"
    ]
  },
  {
    slug: "electrical",
    name: "Electrical",
    description: "Diagnose breakers, swap switches, and stay safe while working with electricity.",
    featuredGuides: [
      "Reset a Tripped Breaker Safely",
      "Replace a Light Switch",
      "Install a Smart Thermostat"
    ]
  },
  {
    slug: "painting",
    name: "Painting & Finishing",
    description: "From drywall patching to perfect trim lines, make every room look refreshed.",
    featuredGuides: [
      "Patch and Paint Nail Holes",
      "Prep a Wall for Paint Like a Pro",
      "Refinish a Front Door"
    ]
  },
  {
    slug: "outdoor",
    name: "Outdoor & Lawn",
    description: "Maintain your yard, deck, and exterior so curb appeal lasts all year.",
    featuredGuides: [
      "Reseed Bare Lawn Spots",
      "Fix Sticking Fence Gates",
      "Pressure Wash a Deck"
    ]
  },
  {
    slug: "appliances",
    name: "Appliances",
    description: "Troubleshoot washers, dryers, and kitchen appliances before calling a tech.",
    featuredGuides: [
      "Quiet a Noisy Washer",
      "Clean Refrigerator Coils",
      "Reset a Dishwasher"
    ]
  },
  {
    slug: "flooring",
    name: "Flooring",
    description: "Repair scratches, replace tiles, and maintain hardwoods and vinyl flooring.",
    featuredGuides: [
      "Repair a Squeaky Floorboard",
      "Replace a Damaged Laminate Plank",
      "Grout Repair 101"
    ]
  },
  {
    slug: "seasonal",
    name: "Seasonal Maintenance",
    description: "Stay ahead of each season with timely checklists and preventative upkeep.",
    featuredGuides: [
      "Spring Home Maintenance Checklist",
      "Winterize Outdoor Faucets",
      "Summer Storm Prep"
    ]
  }
];
