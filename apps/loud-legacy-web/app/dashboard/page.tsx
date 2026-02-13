"use client";

import Link from "next/link";
import { useRallyAuth } from "@/lib/rally-auth";

const quickActions = [
  { label: "Trivia", desc: "Test your knowledge", href: "/dashboard/gameday", icon: "?" },
  { label: "Predictions", desc: "Make your picks", href: "/dashboard/gameday", icon: "P" },
  { label: "Rewards", desc: "Browse rewards", href: "/dashboard/rewards", icon: "R" },
  { label: "Profile", desc: "View your stats", href: "/dashboard/profile", icon: "U" },
];

export default function DashboardPage() {
  const { user, trackEvent } = useRallyAuth();
  const firstName = user?.name?.split(" ")[0] || "Fan";

  return (
    <div className="rally-dash-page">
      {/* Welcome */}
      <div className="rally-dash-welcome">
        <div>
          <h1>Welcome back, {firstName}!</h1>
          <p className="rally-dash-subtitle">Here&apos;s what&apos;s happening with Rally today</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="rally-dash-stats">
        <div className="rally-dash-stat-card">
          <span className="rally-dash-stat-label">Points</span>
          <span className="rally-dash-stat-value">{(user?.points || 2450).toLocaleString()}</span>
          <span className="rally-dash-stat-change" style={{ color: "#34C759" }}>+125 this week</span>
        </div>
        <div className="rally-dash-stat-card">
          <span className="rally-dash-stat-label">Tier</span>
          <span className="rally-dash-stat-value rally-dash-stat-tier">{user?.tier || "Gold"}</span>
          <span className="rally-dash-stat-change">550 to Platinum</span>
        </div>
        <div className="rally-dash-stat-card">
          <span className="rally-dash-stat-label">Rank</span>
          <span className="rally-dash-stat-value">#12</span>
          <span className="rally-dash-stat-change" style={{ color: "#34C759" }}>Up 3 spots</span>
        </div>
        <div className="rally-dash-stat-card">
          <span className="rally-dash-stat-label">Games Attended</span>
          <span className="rally-dash-stat-value">8</span>
          <span className="rally-dash-stat-change">This season</span>
        </div>
      </div>

      {/* Next Game Card */}
      <div className="rally-dash-next-game">
        <div className="rally-dash-next-game-header">
          <span className="rally-dash-label">NEXT GAME</span>
          <span className="rally-dash-live-dot" />
        </div>
        <h2>Eagles vs Tigers</h2>
        <p>Saturday, Feb 15 &middot; 7:00 PM &middot; Cameron Indoor Stadium</p>
        <div className="rally-dash-countdown">
          <div className="rally-cd-box"><span>02</span><small>Days</small></div>
          <div className="rally-cd-box"><span>14</span><small>Hrs</small></div>
          <div className="rally-cd-box"><span>32</span><small>Min</small></div>
          <div className="rally-cd-box"><span>08</span><small>Sec</small></div>
        </div>
        <div className="rally-dash-game-actions">
          <span className="rally-dash-mobile-only">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Check-In available on mobile app only
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rally-dash-section">
        <h3>Quick Actions</h3>
        <div className="rally-dash-quick-grid">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="rally-dash-quick-card"
              onClick={() => trackEvent("quick_action", { action: action.label })}
            >
              <div className="rally-dash-quick-icon">{action.icon}</div>
              <div>
                <span className="rally-dash-quick-label">{action.label}</span>
                <span className="rally-dash-quick-desc">{action.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rally-dash-section">
        <h3>Recent Activity</h3>
        <div className="rally-dash-activity-list">
          {[
            { action: "Attended Duke vs UNC", points: "+100", time: "2 days ago" },
            { action: "Trivia Challenge: 8/10 correct", points: "+50", time: "3 days ago" },
            { action: "Score prediction: Eagles 78", points: "+25", time: "5 days ago" },
            { action: "Photo challenge submitted", points: "+30", time: "1 week ago" },
          ].map((item, i) => (
            <div key={i} className="rally-dash-activity-item">
              <span className="rally-dash-activity-text">{item.action}</span>
              <span className="rally-dash-activity-points">{item.points}</span>
              <span className="rally-dash-activity-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
