export type Tool = {
  name: string;
  category: string;
  description: string;
  useCases: string[];
  recommendation: {
    name: string;
    link: string;
  };
  proTip: string;
};

export const tools: Tool[] = [
  {
    name: "Cordless Drill/Driver",
    category: "Power Tools",
    description: "Versatile drill/driver for hanging, fastening, and light-duty woodworking.",
    useCases: [
      "Pre-drilling pilot holes",
      "Driving screws quickly",
      "Mixing paint with a paddle attachment"
    ],
    recommendation: {
      name: "DEWALT 20V MAX Drill/Driver Kit",
      link: "https://www.homedepot.com/p/DEWALT-20V-MAX-Cordless-Drill-Driver-Kit-DCD771C2/204279858"
    },
    proTip: "Keep a set of impact-ready bits handy to avoid stripping screw heads."
  },
  {
    name: "Adjustable Wrench",
    category: "Plumbing",
    description: "Essential for tightening or loosening plumbing fixtures and fasteners.",
    useCases: ["Swap shower heads", "Replace supply lines", "Tighten loose pipe fittings"],
    recommendation: {
      name: "Crescent 10 in. Adjustable Wrench",
      link: "https://www.amazon.com/dp/B00002YVR6"
    },
    proTip: "Always snug the jaws tight to the fastener to avoid rounding off the edges."
  },
  {
    name: "Stud Finder",
    category: "Home Structure",
    description: "Locates studs and live wires to ensure safe drilling and mounting.",
    useCases: ["Mount TVs and shelves", "Hang heavy mirrors", "Plan electrical work"],
    recommendation: {
      name: "Zircon HD55 Stud Finder",
      link: "https://www.amazon.com/dp/B07K8J7Q8N"
    },
    proTip: "Mark the stud's edges, not just the center, for the most secure mounting."
  },
  {
    name: "Orbital Sander",
    category: "Finishing",
    description: "Removes material quickly while leaving a smooth surface.",
    useCases: ["Prep furniture for paint", "Smooth drywall patches", "Refresh deck boards"],
    recommendation: {
      name: "RYOBI ONE+ 18V Cordless Orbital Sander",
      link: "https://www.homedepot.com/p/RYOBI-ONE-18V-Cordless-5-in-Random-Orbit-Sander-PCL406B/319890520"
    },
    proTip: "Step down grits gradually—never jump from coarse to fine in one pass."
  }
];
