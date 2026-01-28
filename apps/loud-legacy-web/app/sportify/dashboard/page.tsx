"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sample data
const upcomingEvents = [
  { id: 1, name: "Championship Finals", sport: "Basketball", date: "Jan 25, 2024", time: "7:00 PM", venue: "Main Arena", ticketsSold: 8500, capacity: 10000, status: "on-sale" },
  { id: 2, name: "Regional Playoffs", sport: "Football", date: "Jan 27, 2024", time: "3:00 PM", venue: "Stadium East", ticketsSold: 22000, capacity: 25000, status: "on-sale" },
  { id: 3, name: "Spring Tournament", sport: "Soccer", date: "Feb 3, 2024", time: "1:00 PM", venue: "Sports Complex", ticketsSold: 4200, capacity: 8000, status: "on-sale" },
  { id: 4, name: "Invitational Meet", sport: "Track & Field", date: "Feb 10, 2024", time: "9:00 AM", venue: "Athletic Center", ticketsSold: 1800, capacity: 5000, status: "upcoming" },
];

const teams = [
  { id: 1, name: "Eagles", sport: "Basketball", record: "18-4", standing: 1, nextGame: "Jan 25", logo: "🦅" },
  { id: 2, name: "Lions", sport: "Football", record: "12-2", standing: 1, nextGame: "Jan 27", logo: "🦁" },
  { id: 3, name: "Wolves", sport: "Soccer", record: "14-6-2", standing: 2, nextGame: "Feb 3", logo: "🐺" },
  { id: 4, name: "Hawks", sport: "Baseball", record: "0-0", standing: "-", nextGame: "Mar 15", logo: "🦅" },
  { id: 5, name: "Tigers", sport: "Hockey", record: "20-8", standing: 3, nextGame: "Jan 28", logo: "🐯" },
];

const recentResults = [
  { id: 1, event: "Basketball vs Panthers", result: "W 85-72", date: "Jan 20", attendance: 8200 },
  { id: 2, event: "Football vs Bears", result: "W 28-14", date: "Jan 18", attendance: 21500 },
  { id: 3, event: "Soccer vs United", result: "D 2-2", date: "Jan 15", attendance: 5100 },
  { id: 4, event: "Hockey vs Bruins", result: "L 2-3", date: "Jan 14", attendance: 6800 },
];

const staffMembers = [
  { id: 1, name: "Coach Williams", role: "Head Basketball Coach", status: "active" },
  { id: 2, name: "Coach Martinez", role: "Head Football Coach", status: "active" },
  { id: 3, name: "Sarah Johnson", role: "Athletic Director", status: "active" },
  { id: 4, name: "Mike Chen", role: "Equipment Manager", status: "active" },
];

export default function SportifyDashboard() {
  const [selectedSport, setSelectedSport] = useState("all");

  const totalTicketsSold = upcomingEvents.reduce((sum, e) => sum + e.ticketsSold, 0);
  const totalCapacity = upcomingEvents.reduce((sum, e) => sum + e.capacity, 0);
  const ticketRevenue = totalTicketsSold * 45; // avg $45/ticket
  const occupancyRate = Math.round((totalTicketsSold / totalCapacity) * 100);

  const filteredTeams = selectedSport === "all"
    ? teams
    : teams.filter(t => t.sport.toLowerCase() === selectedSport.toLowerCase());

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case "basketball":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10 15 15 0 014-10z" />
            <path d="M2 12h20" />
          </svg>
        );
      case "football":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <ellipse cx="12" cy="12" rx="10" ry="6" transform="rotate(45 12 12)" />
            <path d="M7 12l10 0M9.5 9.5l5 5M14.5 9.5l-5 5" />
          </svg>
        );
      case "soccer":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2l3 5h-6l3-5M12 22l-3-5h6l-3 5M2 12l5 3v-6l-5 3M22 12l-5-3v6l5-3" />
          </svg>
        );
      case "baseball":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2c-1.5 2.5-1.5 7-1.5 10s0 7.5 1.5 10M12 2c1.5 2.5 1.5 7 1.5 10s0 7.5-1.5 10" />
          </svg>
        );
      case "hockey":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <path d="M4 20h4v-6a4 4 0 014-4 4 4 0 014 4v6h4" />
            <circle cx="12" cy="5" r="3" />
          </svg>
        );
      case "track & field":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <circle cx="12" cy="5" r="3" />
            <path d="M6.5 22l3.5-5 4.5 1.5 3-3.5" />
            <path d="M14 14l-2-2-4.5 5" />
            <path d="M7 8l5 3 4-3" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sp-sport-svg">
            <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7" />
            <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 20M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 20" />
            <path d="M18 2H6v7a6 6 0 1012 0V2z" />
          </svg>
        );
    }
  };

  const getResultColor = (result: string) => {
    if (result.startsWith("W")) return "#10B981";
    if (result.startsWith("L")) return "#EF4444";
    return "#F59E0B";
  };

  return (
    <main className="sportify-dashboard-page">
      <Header />

      {/* Dashboard Header */}
      <section className="sp-dash-header">
        <div className="container">
          <div className="sp-dash-header-content">
            <div>
              <div className="sp-breadcrumb">
                <Link href="/sportify">Sportify</Link>
                <span>/</span>
                <span>Dashboard</span>
              </div>
              <h1>Athletics Command Center</h1>
              <p>Manage events, teams, and gameday operations.</p>
            </div>
            <div className="sp-dash-actions">
              <button className="sp-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Schedule
              </button>
              <button className="sp-dash-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-dash-stats">
        <div className="container">
          <div className="sp-dash-stats-grid">
            <div className="sp-dash-stat">
              <div className="sp-dash-stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="sp-dash-stat-content">
                <span className="sp-dash-stat-value">{upcomingEvents.length}</span>
                <span className="sp-dash-stat-label">Upcoming Events</span>
              </div>
            </div>

            <div className="sp-dash-stat">
              <div className="sp-dash-stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className="sp-dash-stat-content">
                <span className="sp-dash-stat-value">{(totalTicketsSold / 1000).toFixed(1)}K</span>
                <span className="sp-dash-stat-label">Tickets Sold</span>
              </div>
            </div>

            <div className="sp-dash-stat">
              <div className="sp-dash-stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="sp-dash-stat-content">
                <span className="sp-dash-stat-value">${(ticketRevenue / 1000000).toFixed(2)}M</span>
                <span className="sp-dash-stat-label">Ticket Revenue</span>
              </div>
            </div>

            <div className="sp-dash-stat">
              <div className="sp-dash-stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="sp-dash-stat-content">
                <span className="sp-dash-stat-value">{occupancyRate}%</span>
                <span className="sp-dash-stat-label">Avg Occupancy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="sp-dash-main">
        <div className="container">
          <div className="sp-dash-layout">
            {/* Upcoming Events */}
            <div className="sp-dash-card full-width">
              <div className="sp-dash-card-header">
                <h3>Upcoming Events</h3>
                <Link href="/sportify/events" className="sp-dash-link">View All Events</Link>
              </div>
              <div className="sp-events-table">
                <div className="sp-events-header">
                  <span>Event</span>
                  <span>Date & Time</span>
                  <span>Venue</span>
                  <span>Ticket Sales</span>
                  <span>Status</span>
                </div>
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="sp-event-row">
                    <div className="sp-event-info">
                      <div className="sp-event-sport">{getSportIcon(event.sport)}</div>
                      <div>
                        <span className="sp-event-name">{event.name}</span>
                        <span className="sp-event-type">{event.sport}</span>
                      </div>
                    </div>
                    <div className="sp-event-datetime">
                      <span className="sp-event-date">{event.date}</span>
                      <span className="sp-event-time">{event.time}</span>
                    </div>
                    <span className="sp-event-venue">{event.venue}</span>
                    <div className="sp-event-tickets">
                      <div className="sp-tickets-bar">
                        <div
                          className="sp-tickets-fill"
                          style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                        />
                      </div>
                      <span className="sp-tickets-text">
                        {(event.ticketsSold / 1000).toFixed(1)}K / {(event.capacity / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <span className={`sp-event-status ${event.status}`}>
                      {event.status === "on-sale" ? "On Sale" : "Upcoming"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teams */}
            <div className="sp-dash-card">
              <div className="sp-dash-card-header">
                <h3>Teams</h3>
                <div className="sp-sport-filters">
                  {["all", "basketball", "football", "soccer"].map((sport) => (
                    <button
                      key={sport}
                      className={`sp-filter-btn ${selectedSport === sport ? "active" : ""}`}
                      onClick={() => setSelectedSport(sport)}
                    >
                      {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sp-teams-list">
                {filteredTeams.map((team) => (
                  <div key={team.id} className="sp-team-row">
                    <div className="sp-team-logo">{team.logo}</div>
                    <div className="sp-team-info">
                      <span className="sp-team-name">{team.name}</span>
                      <span className="sp-team-sport">{team.sport}</span>
                    </div>
                    <div className="sp-team-record">
                      <span className="sp-record-value">{team.record}</span>
                      <span className="sp-record-label">Record</span>
                    </div>
                    <div className="sp-team-standing">
                      <span className="sp-standing-value">#{team.standing}</span>
                      <span className="sp-standing-label">Standing</span>
                    </div>
                    <div className="sp-team-next">
                      <span className="sp-next-value">{team.nextGame}</span>
                      <span className="sp-next-label">Next Game</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/sportify/teams" className="sp-view-all-btn">
                View All Teams
              </Link>
            </div>

            {/* Recent Results */}
            <div className="sp-dash-card">
              <div className="sp-dash-card-header">
                <h3>Recent Results</h3>
                <Link href="/sportify/events" className="sp-dash-link">View All</Link>
              </div>
              <div className="sp-results-list">
                {recentResults.map((result) => (
                  <div key={result.id} className="sp-result-row">
                    <div className="sp-result-info">
                      <span className="sp-result-event">{result.event}</span>
                      <span className="sp-result-date">{result.date}</span>
                    </div>
                    <div className="sp-result-meta">
                      <span
                        className="sp-result-score"
                        style={{ color: getResultColor(result.result) }}
                      >
                        {result.result}
                      </span>
                      <span className="sp-result-attendance">
                        {(result.attendance / 1000).toFixed(1)}K attended
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff */}
            <div className="sp-dash-card">
              <div className="sp-dash-card-header">
                <h3>Key Staff</h3>
                <Link href="/sportify/staff" className="sp-dash-link">Manage Staff</Link>
              </div>
              <div className="sp-staff-list">
                {staffMembers.map((staff) => (
                  <div key={staff.id} className="sp-staff-row">
                    <div className="sp-staff-avatar">
                      {staff.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="sp-staff-info">
                      <span className="sp-staff-name">{staff.name}</span>
                      <span className="sp-staff-role">{staff.role}</span>
                    </div>
                    <span className={`sp-staff-status ${staff.status}`}>
                      {staff.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="sp-dash-card">
              <div className="sp-dash-card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="sp-quick-actions">
                <button className="sp-quick-action">
                  <div className="sp-qa-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="M2 10h20" />
                      <circle cx="17" cy="14" r="2" />
                    </svg>
                  </div>
                  <span>Sell Tickets</span>
                </button>
                <button className="sp-quick-action">
                  <div className="sp-qa-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 20V10M12 20V4M6 20v-6" />
                    </svg>
                  </div>
                  <span>View Reports</span>
                </button>
                <button className="sp-quick-action">
                  <div className="sp-qa-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M19 10v4M12 3v18M5 10v4" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <span>Send Alert</span>
                </button>
                <button className="sp-quick-action">
                  <div className="sp-qa-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                      <path d="M9 21v-8h6v8" />
                    </svg>
                  </div>
                  <span>Venue Setup</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
