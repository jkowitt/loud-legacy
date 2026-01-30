"use client";

import Link from "next/link";
import Image from "next/image";

const features = [
  {
    name: "AI-Powered Valuations",
    icon: "🤖",
    description: "Upload property photos and let AI automatically identify conditions, estimate values, and generate comprehensive reports across all property types.",
    color: "#1B2A4A",
    gradient: "linear-gradient(135deg, #1B2A4A 0%, #2C3E5A 100%)",
  },
  {
    name: "Underwriting Engine",
    icon: "📊",
    description: "Build comprehensive financial models with full customization, rent rolls, P&L statements, and real-time scenario analysis for smarter deals.",
    color: "#D4A843",
    gradient: "linear-gradient(135deg, #D4A843 0%, #B8922E 100%)",
  },
  {
    name: "Market Intelligence",
    icon: "🏘️",
    description: "Access real-time comparable sales, market trends, cap rates, and neighborhood analytics to ground your valuations in reality.",
    color: "#1B2A4A",
    gradient: "linear-gradient(135deg, #1B2A4A 0%, #2C3E5A 100%)",
  },
  {
    name: "Portfolio Management",
    icon: "📚",
    description: "Organize, track, and analyze all your property valuations in one centralized system with full version history and team collaboration.",
    color: "#D4A843",
    gradient: "linear-gradient(135deg, #D4A843 0%, #B8922E 100%)",
  },
];

export function BrandShowcase() {
  return (
    <section id="products" className="brand-showcase">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Image
            src="/logos/legacy-re-icon.svg"
            alt="Legacy RE"
            width={64}
            height={64}
            style={{ borderRadius: "12px" }}
          />
        </div>
        <h2>Legacy RE. Built to Last.</h2>
        <p className="section-intro">
          One platform for real estate intelligence—valuations, underwriting, and portfolio management.
        </p>
        <div className="brands-grid">
          {features.map((feature, index) => (
            <Link
              key={feature.name}
              href="/valora"
              className="brand-card"
              style={{
                borderTopColor: feature.color,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="brand-icon-wrapper" style={{ background: feature.gradient }}>
                <span style={{ fontSize: "2rem" }}>{feature.icon}</span>
              </div>
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
              <span className="explore-link" style={{ color: feature.color }}>
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
