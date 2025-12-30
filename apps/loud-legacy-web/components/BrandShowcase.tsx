"use client";

import { brandUrl } from "@/lib/brandLinks";

const brands = [
  {
    name: "VALORA",
    icon: "🏢",
    description: "Real estate platform for property management and analytics",
    href: () => brandUrl("valora"),
    color: "#3B82F6",
  },
  {
    name: "VenueVR",
    icon: "🎉",
    description: "Events and entertainment platform with VR experiences",
    href: () => brandUrl("venuevr"),
    color: "#8B5CF6",
  },
  {
    name: "Business Now",
    icon: "📈",
    description: "Coaching, courses, and growth tools for entrepreneurs",
    href: () => brandUrl("business"),
    color: "#10B981",
  },
  {
    name: "DIY Mr Fix It",
    icon: "🔧",
    description: "Tools, products, and tutorials for DIY enthusiasts",
    href: () => brandUrl("diy"),
    color: "#F59E0B",
  },
];

export function BrandShowcase() {
  return (
    <section id="brands" className="brand-showcase">
      <div className="container">
        <h2>Our Products</h2>
        <div className="brands-grid">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={typeof brand.href === 'function' ? brand.href() : brand.href}
              className="brand-card"
              style={{ borderTopColor: brand.color }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ fontSize: "3rem" }}>{brand.icon}</span>
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <span className="explore-link">Explore →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
