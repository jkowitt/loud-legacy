"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

// Platform icons as SVG components
const PlatformIcons = {
  valora: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="platform-icon-svg">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  sportify: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="platform-icon-svg">
      <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7" />
      <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 20M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 20" />
      <path d="M18 2H6v7a6 6 0 1012 0V2z" />
    </svg>
  ),
  "business-now": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="platform-icon-svg">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M6 8h.01M6 11h.01M6 14h.01" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 8h9M9 11h6M9 14h7" />
    </svg>
  ),
  "legacy-crm": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="platform-icon-svg">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M16 3.13a4 4 0 010 7.75" />
      <path d="M21 21v-2a4 4 0 00-3-3.85" />
    </svg>
  ),
  "loud-works": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="platform-icon-svg">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

// Activity icons
const ActivityIcons = {
  valuation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
      <path d="M12 11v4M9 13h6" strokeLinecap="round" />
    </svg>
  ),
  deal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  event: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  invoice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <path d="M12 11v6M9 14h6" strokeLinecap="round" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

const quickStartItems = [
  { icon: "valuation", label: "Create Property Valuation", href: "/valora/dashboard" },
  { icon: "deal", label: "Run Underwriting Analysis", href: "/valora/dashboard" },
  { icon: "valuation", label: "Browse Marketplace", href: "/valora/marketplace" },
  { icon: "valuation", label: "View Properties", href: "/valora/properties" },
  { icon: "valuation", label: "Broker Portal", href: "/valora/brokers" },
];

interface DashboardStats {
  properties: number;
  valuations: number;
  recentActivity: Array<{
    id: string;
    platform: string;
    action: string;
    item: string;
    time: string;
    type: string;
  }>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const firstName = user?.name?.split(" ")[0] || "there";

  // Fetch real dashboard stats
  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  const platform = {
    id: "valora",
    name: "Legacy RE",
    tagline: "Real Estate Intelligence",
    description: "AI-powered property valuations, underwriting, and portfolio management",
    color: "#1B2A4A",
    href: "/valora/dashboard",
    quickActions: [
      { label: "New Valuation", href: "/valora/dashboard" },
      { label: "View Properties", href: "/valora/properties" },
    ],
  };

  const getActivityIcon = (type: string) => {
    return ActivityIcons[type as keyof typeof ActivityIcons] || ActivityIcons.valuation;
  };

  const activity = stats?.recentActivity || [];

  return (
    <div className="hub-dashboard">
      {/* Header */}
      <section className="hub-header">
        <div className="container">
          <div className="hub-header-content">
            <div>
              <h1>Welcome back, {firstName}</h1>
              <p>Your Legacy RE command center</p>
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
          <h2 className="hub-section-title">Your Platform</h2>
          <div className="hub-platforms-grid">
            <div
              className={`hub-platform-card ${hoveredPlatform === platform.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredPlatform(platform.id)}
              onMouseLeave={() => setHoveredPlatform(null)}
              style={{ "--platform-color": platform.color } as React.CSSProperties}
            >
              <div className="hub-platform-header">
                <div className="hub-platform-icon-wrapper" style={{ backgroundColor: `${platform.color}15`, color: platform.color }}>
                  {PlatformIcons[platform.id as keyof typeof PlatformIcons]}
                </div>
                <div>
                  <h3>{platform.name}</h3>
                  <span className="hub-platform-tagline">{platform.tagline}</span>
                </div>
              </div>
              <p className="hub-platform-desc">{platform.description}</p>
              <div className="hub-platform-stats">
                <div className="hub-platform-stat">
                  <span className="hub-stat-value">{stats?.properties ?? '-'}</span>
                  <span className="hub-stat-label">Properties</span>
                </div>
                <div className="hub-platform-stat">
                  <span className="hub-stat-value">{stats?.valuations ?? '-'}</span>
                  <span className="hub-stat-label">Valuations</span>
                </div>
              </div>
              <div className="hub-platform-actions">
                <Link href={platform.href} className="hub-platform-btn primary">
                  Open Dashboard
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
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
                {activity.length === 0 && (
                  <div className="hub-activity-item" style={{ justifyContent: 'center', color: 'var(--text-secondary)' }}>
                    No activity yet. Create your first valuation to get started.
                  </div>
                )}
                {activity.map((item, i) => (
                  <div key={item.id || i} className="hub-activity-item">
                    <span className="hub-activity-icon">
                      {getActivityIcon(item.type)}
                    </span>
                    <div className="hub-activity-content">
                      <span className="hub-activity-action">
                        <strong>{item.platform}:</strong> {item.action}
                      </span>
                      {item.item && (
                        <span className="hub-activity-item-name">{item.item}</span>
                      )}
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
                  {quickStartItems.map((item, i) => (
                    <Link key={i} href={item.href} className="hub-quick-start-link">
                      <span className="hub-quick-start-icon">
                        {getActivityIcon(item.icon)}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hub-help-card">
                <div className="hub-help-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Need Help?</h3>
                <p>Our team is here to help you get the most out of Legacy RE.</p>
                <Link href="/contact" className="hub-help-btn">Contact Support</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
