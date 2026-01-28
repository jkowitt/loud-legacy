"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const platforms = [
  {
    id: "valora",
    name: "VALORA",
    tagline: "Real Estate Intelligence",
    description: "AI-powered property valuations and market analysis",
    icon: "🏢",
    color: "#3B82F6",
    href: "/valora/dashboard",
    stats: [
      { label: "Properties", value: "12" },
      { label: "Valuations", value: "28" },
    ],
    quickActions: [
      { label: "New Valuation", href: "/valora/dashboard" },
      { label: "View Properties", href: "/valora/properties" },
    ],
  },
  {
    id: "sportify",
    name: "Sportify",
    tagline: "Event Management",
    description: "Streamline athletic events and team coordination",
    icon: "🏆",
    color: "#10B981",
    href: "/sportify/dashboard",
    stats: [
      { label: "Events", value: "8" },
      { label: "Teams", value: "24" },
    ],
    quickActions: [
      { label: "Manage Events", href: "/sportify/events" },
      { label: "View Teams", href: "/sportify/teams" },
    ],
  },
  {
    id: "business-now",
    name: "Business Now",
    tagline: "Operations Hub",
    description: "Financial tools and operational management",
    icon: "💼",
    color: "#F59E0B",
    href: "/business-now/dashboard",
    stats: [
      { label: "Invoices", value: "34" },
      { label: "This Month", value: "$12.4K" },
    ],
    quickActions: [
      { label: "Create Invoice", href: "/business-now/invoices" },
      { label: "View Reports", href: "/business-now/reports" },
    ],
  },
  {
    id: "legacy-crm",
    name: "Legacy CRM",
    tagline: "Relationship Management",
    description: "Build and maintain meaningful business relationships",
    icon: "🤝",
    color: "#8B5CF6",
    href: "/legacy-crm/dashboard",
    stats: [
      { label: "Contacts", value: "156" },
      { label: "Deals", value: "18" },
    ],
    quickActions: [
      { label: "View Contacts", href: "/legacy-crm/contacts" },
      { label: "Sales Pipeline", href: "/legacy-crm/pipeline" },
    ],
  },
  {
    id: "loud-works",
    name: "Loud Works",
    tagline: "Workforce Intelligence",
    description: "Optimize team scheduling and development",
    icon: "👥",
    color: "#F97316",
    href: "/loud-works/dashboard",
    stats: [
      { label: "Team Members", value: "32" },
      { label: "Active Projects", value: "7" },
    ],
    quickActions: [
      { label: "View Team", href: "/loud-works/team" },
      { label: "Scheduling", href: "/loud-works/schedule" },
    ],
  },
];

const recentActivity = [
  { platform: "VALORA", action: "New valuation created", item: "123 Main St", time: "2 hours ago", icon: "🏢" },
  { platform: "Legacy CRM", action: "Deal moved to Negotiation", item: "Acme Corp", time: "4 hours ago", icon: "🤝" },
  { platform: "Sportify", action: "Event scheduled", item: "Spring Tournament", time: "Yesterday", icon: "🏆" },
  { platform: "Business Now", action: "Invoice sent", item: "INV-2024-034", time: "Yesterday", icon: "💼" },
  { platform: "Loud Works", action: "New team member added", item: "Sarah Johnson", time: "2 days ago", icon: "👥" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="hub-dashboard">
      {/* Header */}
      <section className="hub-header">
        <div className="container">
          <div className="hub-header-content">
            <div>
              <h1>Welcome back, {firstName}!</h1>
              <p>Your command center for all Loud Legacy platforms</p>
            </div>
            <div className="hub-header-actions">
              <Link href="/admin" className="hub-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                Settings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="hub-platforms">
        <div className="container">
          <h2 className="hub-section-title">Your Platforms</h2>
          <div className="hub-platforms-grid">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`hub-platform-card ${hoveredPlatform === platform.id ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredPlatform(platform.id)}
                onMouseLeave={() => setHoveredPlatform(null)}
                style={{ "--platform-color": platform.color } as React.CSSProperties}
              >
                <div className="hub-platform-header">
                  <span className="hub-platform-icon">{platform.icon}</span>
                  <div>
                    <h3>{platform.name}</h3>
                    <span className="hub-platform-tagline">{platform.tagline}</span>
                  </div>
                </div>
                <p className="hub-platform-desc">{platform.description}</p>
                <div className="hub-platform-stats">
                  {platform.stats.map((stat, i) => (
                    <div key={i} className="hub-platform-stat">
                      <span className="hub-stat-value">{stat.value}</span>
                      <span className="hub-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="hub-platform-actions">
                  <Link href={platform.href} className="hub-platform-btn primary">
                    Open Dashboard
                  </Link>
                  <div className="hub-quick-links">
                    {platform.quickActions.map((action, i) => (
                      <Link key={i} href={action.href} className="hub-quick-link">
                        {action.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="hub-activity">
        <div className="container">
          <div className="hub-activity-grid">
            <div className="hub-activity-main">
              <h2 className="hub-section-title">Recent Activity</h2>
              <div className="hub-activity-list">
                {recentActivity.map((item, i) => (
                  <div key={i} className="hub-activity-item">
                    <span className="hub-activity-icon">{item.icon}</span>
                    <div className="hub-activity-content">
                      <span className="hub-activity-action">
                        <strong>{item.platform}:</strong> {item.action}
                      </span>
                      <span className="hub-activity-item-name">{item.item}</span>
                    </div>
                    <span className="hub-activity-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hub-activity-sidebar">
              <div className="hub-quick-start">
                <h3>Quick Start</h3>
                <div className="hub-quick-start-links">
                  <Link href="/valora/dashboard" className="hub-quick-start-link">
                    <span>🏢</span> Create Property Valuation
                  </Link>
                  <Link href="/business-now/invoices" className="hub-quick-start-link">
                    <span>📄</span> Generate Invoice
                  </Link>
                  <Link href="/legacy-crm/contacts" className="hub-quick-start-link">
                    <span>👤</span> Add New Contact
                  </Link>
                  <Link href="/sportify/events" className="hub-quick-start-link">
                    <span>📅</span> Schedule Event
                  </Link>
                  <Link href="/loud-works/team" className="hub-quick-start-link">
                    <span>👥</span> Manage Team
                  </Link>
                </div>
              </div>

              <div className="hub-help-card">
                <h3>Need Help?</h3>
                <p>Our team is here to help you get the most out of Loud Legacy.</p>
                <Link href="/contact" className="hub-help-btn">Contact Support</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
