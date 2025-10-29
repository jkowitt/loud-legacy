export type Product = {
  name: string;
  category: string;
  room: string;
  description: string;
  price: string;
  link: string;
  badge?: string;
};

export const products: Product[] = [
  {
    name: "Fix It Starter Toolkit",
    category: "Kits",
    room: "Whole Home",
    description: "Curated set of must-have tools for first-time homeowners tackling DIY repairs.",
    price: "$149",
    link: "#",
    badge: "Jason's Pick"
  },
  {
    name: "Milwaukee M12 Multi-Tool",
    category: "Power Tools",
    room: "Whole Home",
    description: "Oscillating multi-tool that cuts, sands, and scrapes in tight spaces.",
    price: "$129",
    link: "https://www.homedepot.com/p/Milwaukee-M12-12V-Lithium-Ion-Cordless-Multi-Tool-Kit-2426-21XC/203111688"
  },
  {
    name: "Moen Flo Smart Water Monitor",
    category: "Smart Home",
    room: "Plumbing",
    description: "Detect leaks early and shut off water remotely to prevent expensive damage.",
    price: "$499",
    link: "https://www.amazon.com/dp/B07H8P8F1J"
  },
  {
    name: "Klein Non-Contact Voltage Tester",
    category: "Electrical",
    room: "Kitchen",
    description: "Check outlets and switches for live voltage before you start repairs.",
    price: "$19",
    link: "https://www.amazon.com/dp/B00CXKBJI2"
  }
];
