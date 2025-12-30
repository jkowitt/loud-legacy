"use client";

import Link from "next/link";

const brands = [
  {
    name: "VALORA",
    icon: "🏢",
    description: "Real estate platform for property management and analytics",
    href: "/valora",
    color: "#3B82F6",
  },
  {
    name: "VenueVR",
    icon: "🎉",
    description: "Events and entertainment platform with VR experiences",
    href: "/venuevr",
    color: "#8B5CF6",
  },
  {
    name: "Business Now",
    icon: "📈",
    description: "Coaching, courses, and growth tools for entrepreneurs",
    href: "/business-now",
    color: "#10B981",
  },
  {
    name: "DIY Mr Fix It",
    icon: "🔧",
    description: "Tools, products, and tutorials for DIY enthusiasts",
    href: "/diy",
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
            <Link
              key={brand.name}
              href={brand.href}
              className="brand-card"
              style={{ borderTopColor: brand.color }}
            >
              <span style={{ fontSize: "3rem" }}>{brand.icon}</span>
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <span className="explore-link">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
