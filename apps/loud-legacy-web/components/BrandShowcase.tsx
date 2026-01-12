"use client";

import Link from "next/link";

const brands = [
  {
    name: "VALORA",
    icon: "🏢",
    description: "Real estate valuation, underwriting, and decision intelligence. Built for investors who need trust, transparency, and confidence in every deal.",
    href: "/valora",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
    tagline: "Enterprise Intelligence"
  },
  {
    name: "Sportify",
    icon: "🎯",
    description: "Live event planning and execution for sports and entertainment. One operational record per event, zero missed cues.",
    href: "/sportify",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    tagline: "Operational Excellence"
  },
  {
    name: "Business Now",
    icon: "📊",
    description: "Practical business operating toolkit. Move from reaction to intention with structure for execution.",
    href: "/business-now",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    tagline: "Structured Execution"
  },
  {
    name: "Legacy CRM",
    icon: "🤝",
    description: "Relationship and opportunity management focused on discipline, not volume. Built for success through follow-up and trust.",
    href: "/legacy-crm",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    tagline: "Relationship Discipline"
  },
];

export function BrandShowcase() {
  return (
    <section id="products" className="brand-showcase">
      <div className="container">
        <h2>Four Products. One Philosophy.</h2>
        <p className="section-intro">
          Each product solves a specific operational problem and delivers long-term leverage.
        </p>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="brand-card"
              style={{
                borderTopColor: brand.color,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="brand-icon-wrapper" style={{ background: brand.gradient }}>
                <span style={{ fontSize: "2rem" }}>{brand.icon}</span>
              </div>
              <div className="brand-tagline" style={{ color: brand.color }}>
                {brand.tagline}
              </div>
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <span className="explore-link" style={{ color: brand.color }}>
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
