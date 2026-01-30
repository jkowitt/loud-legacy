"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  mediaItems: number;
  activeBanners: number;
  totalImpressions: number;
  totalClicks: number;
  ctr: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 12,
    publishedPages: 10,
    draftPages: 2,
    mediaItems: 48,
    activeBanners: 5,
    totalImpressions: 125400,
    totalClicks: 3420,
    ctr: 2.73,
  });

  const [recentActivity] = useState([
    { type: "page", action: "edited", item: "Business Now", user: "Admin", time: "2 minutes ago" },
    { type: "media", action: "uploaded", item: "hero-banner.jpg", user: "Admin", time: "15 minutes ago" },
    { type: "banner", action: "created", item: "Legacy CRM Promo", user: "Admin", time: "1 hour ago" },
    { type: "page", action: "published", item: "Legacy CRM Demo", user: "Admin", time: "3 hours ago" },
    { type: "settings", action: "updated", item: "Site Colors", user: "Admin", time: "Yesterday" },
  ]);

  const quickActions = [
    { label: "Edit Homepage", href: "/admin/pages/edit?path=/", icon: "edit" },
    { label: "Upload Media", href: "/admin/media?upload=true", icon: "upload" },
    { label: "Create Banner", href: "/admin/banners/new", icon: "banner" },
    { label: "Site Settings", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">{stats.totalPages}</div>
          <div className="admin-stat-label">Total Pages</div>
          <div className="admin-stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
            </svg>
            {stats.publishedPages} published
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">{stats.mediaItems}</div>
          <div className="admin-stat-label">Media Files</div>
          <div className="admin-stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
            </svg>
            +12 this week
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon yellow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="10" rx="2" />
                <path d="M12 7V4" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">{stats.activeBanners}</div>
          <div className="admin-stat-label">Active Banners</div>
          <div className="admin-stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
            </svg>
            {stats.ctr.toFixed(2)}% CTR
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
          <div className="admin-stat-value">{(stats.totalImpressions / 1000).toFixed(1)}K</div>
          <div className="admin-stat-label">Total Impressions</div>
          <div className="admin-stat-change positive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
            </svg>
            {stats.totalClicks.toLocaleString()} clicks
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Actions</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="admin-btn admin-btn-secondary"
                style={{ justifyContent: "flex-start", padding: "1rem" }}
              >
                <span className="admin-btn-icon">
                  {action.icon === "edit" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  )}
                  {action.icon === "upload" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17,8 12,3 7,8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  )}
                  {action.icon === "banner" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="10" rx="2" />
                      <path d="M12 7V4" />
                    </svg>
                  )}
                  {action.icon === "settings" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                  )}
                </span>
                {action.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--admin-border)" }}>
            <h4 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "1rem" }}>Edit Live Pages</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { name: "Homepage", path: "/" },
                { name: "Business Now", path: "/business-now" },
                { name: "Legacy CRM", path: "/legacy-crm" },
                { name: "Sportify", path: "/sportify" },
                { name: "Legacy RE", path: "/valora" },
              ].map((page) => (
                <Link
                  key={page.path}
                  href={`/admin/pages/edit?path=${encodeURIComponent(page.path)}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    background: "var(--admin-bg)",
                    borderRadius: "8px",
                    color: "var(--admin-text)",
                    textDecoration: "none",
                    fontSize: "0.9375rem",
                  }}
                >
                  <span>{page.name}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Activity</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  paddingBottom: index < recentActivity.length - 1 ? "1rem" : 0,
                  borderBottom: index < recentActivity.length - 1 ? "1px solid var(--admin-border)" : "none",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background:
                      activity.type === "page"
                        ? "rgba(59, 130, 246, 0.1)"
                        : activity.type === "media"
                          ? "rgba(16, 185, 129, 0.1)"
                          : activity.type === "banner"
                            ? "rgba(245, 158, 11, 0.1)"
                            : "rgba(139, 92, 246, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {activity.type === "page" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" width="16" height="16">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    </svg>
                  )}
                  {activity.type === "media" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" width="16" height="16">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                    </svg>
                  )}
                  {activity.type === "banner" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="16" height="16">
                      <rect x="2" y="7" width="20" height="10" rx="2" />
                    </svg>
                  )}
                  {activity.type === "settings" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" width="16" height="16">
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.9375rem", color: "var(--admin-text)" }}>
                    <strong>{activity.item}</strong> was {activity.action}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", marginTop: "0.25rem" }}>
                    {activity.user} • {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
