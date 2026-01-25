"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sample data
const teamMembers = [
  { id: 1, name: "Sarah Johnson", role: "Event Coordinator", department: "Operations", status: "active", certifications: 4, hireDate: "Mar 2023", avatar: "SJ" },
  { id: 2, name: "Marcus Chen", role: "Senior Analyst", department: "Finance", status: "active", certifications: 6, hireDate: "Jan 2022", avatar: "MC" },
  { id: 3, name: "Emily Rodriguez", role: "Marketing Lead", department: "Marketing", status: "active", certifications: 3, hireDate: "Jun 2023", avatar: "ER" },
  { id: 4, name: "James Wilson", role: "Operations Manager", department: "Operations", status: "active", certifications: 8, hireDate: "Sep 2021", avatar: "JW" },
  { id: 5, name: "Aisha Patel", role: "Junior Developer", department: "Technology", status: "onboarding", certifications: 2, hireDate: "Jan 2024", avatar: "AP" },
];

const openPositions = [
  { id: 1, title: "Event Staff Lead", department: "Operations", applicants: 23, posted: "Jan 10", priority: "high" },
  { id: 2, title: "Financial Analyst", department: "Finance", applicants: 45, posted: "Jan 5", priority: "medium" },
  { id: 3, title: "Content Creator", department: "Marketing", applicants: 67, posted: "Dec 28", priority: "low" },
];

const upcomingTrainings = [
  { id: 1, name: "Safety & Compliance", date: "Jan 28", attendees: 12, type: "required" },
  { id: 2, name: "Leadership Development", date: "Feb 5", attendees: 8, type: "optional" },
  { id: 3, name: "Customer Service Excellence", date: "Feb 12", attendees: 15, type: "required" },
];

const recentActivity = [
  { id: 1, action: "New hire completed onboarding", person: "Aisha Patel", time: "2 hours ago", type: "onboarding" },
  { id: 2, action: "Certification earned", person: "Marcus Chen", time: "Yesterday", type: "certification" },
  { id: 3, action: "Performance review completed", person: "Emily Rodriguez", time: "2 days ago", type: "review" },
  { id: 4, action: "Training registered", person: "James Wilson", time: "3 days ago", type: "training" },
];

const scheduleToday = [
  { id: 1, shift: "Morning", time: "6:00 AM - 2:00 PM", staffed: 8, required: 8, status: "covered" },
  { id: 2, shift: "Afternoon", time: "2:00 PM - 10:00 PM", staffed: 6, required: 8, status: "understaffed" },
  { id: 3, shift: "Evening Event", time: "6:00 PM - 11:00 PM", staffed: 12, required: 12, status: "covered" },
];

export default function LoudWorksDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const totalEmployees = teamMembers.length;
  const activeEmployees = teamMembers.filter(m => m.status === "active").length;
  const totalCertifications = teamMembers.reduce((sum, m) => sum + m.certifications, 0);
  const retentionRate = 89;

  const filteredMembers = selectedDepartment === "all"
    ? teamMembers
    : teamMembers.filter(m => m.department.toLowerCase() === selectedDepartment.toLowerCase());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#22C55E";
      case "onboarding": return "#F97316";
      case "away": return "#EAB308";
      default: return "#6B7280";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "#EF4444";
      case "medium": return "#F97316";
      case "low": return "#22C55E";
      default: return "#6B7280";
    }
  };

  return (
    <main className="loud-works-page lw-dashboard-page">
      <Header />

      {/* Dashboard Header */}
      <section className="lw-dash-header">
        <div className="container">
          <div className="lw-dash-header-content">
            <div>
              <div className="lw-breadcrumb">
                <Link href="/loud-works">Loud Works</Link>
                <span>/</span>
                <span>Dashboard</span>
              </div>
              <h1>Workforce Command Center</h1>
              <p>Manage your team, track development, and optimize scheduling.</p>
            </div>
            <div className="lw-dash-actions">
              <button className="lw-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Export Report
              </button>
              <button className="lw-dash-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lw-dash-stats">
        <div className="container">
          <div className="lw-dash-stats-grid">
            <div className="lw-dash-stat">
              <div className="lw-dash-stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="lw-dash-stat-content">
                <span className="lw-dash-stat-value">{totalEmployees}</span>
                <span className="lw-dash-stat-label">Team Members</span>
              </div>
            </div>

            <div className="lw-dash-stat">
              <div className="lw-dash-stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <div className="lw-dash-stat-content">
                <span className="lw-dash-stat-value">{retentionRate}%</span>
                <span className="lw-dash-stat-label">Retention Rate</span>
              </div>
            </div>

            <div className="lw-dash-stat">
              <div className="lw-dash-stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 2,7 12,12 22,7" />
                  <polyline points="2,17 12,22 22,17" />
                  <polyline points="2,12 12,17 22,12" />
                </svg>
              </div>
              <div className="lw-dash-stat-content">
                <span className="lw-dash-stat-value">{totalCertifications}</span>
                <span className="lw-dash-stat-label">Certifications</span>
              </div>
            </div>

            <div className="lw-dash-stat">
              <div className="lw-dash-stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              </div>
              <div className="lw-dash-stat-content">
                <span className="lw-dash-stat-value">{openPositions.length}</span>
                <span className="lw-dash-stat-label">Open Positions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="lw-dash-main">
        <div className="container">
          <div className="lw-dash-layout">
            {/* Team Members */}
            <div className="lw-dash-card full-width">
              <div className="lw-dash-card-header">
                <h3>Team Directory</h3>
                <div className="lw-dept-filters">
                  {["all", "operations", "finance", "marketing", "technology"].map((dept) => (
                    <button
                      key={dept}
                      className={`lw-filter-btn ${selectedDepartment === dept ? "active" : ""}`}
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept.charAt(0).toUpperCase() + dept.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lw-team-table">
                <div className="lw-team-header">
                  <span>Employee</span>
                  <span>Department</span>
                  <span>Certifications</span>
                  <span>Hire Date</span>
                  <span>Status</span>
                </div>
                {filteredMembers.map((member) => (
                  <div key={member.id} className="lw-team-row">
                    <div className="lw-member-info">
                      <div className="lw-member-avatar">{member.avatar}</div>
                      <div>
                        <span className="lw-member-name">{member.name}</span>
                        <span className="lw-member-role">{member.role}</span>
                      </div>
                    </div>
                    <span className="lw-member-dept">{member.department}</span>
                    <div className="lw-member-certs">
                      <span className="lw-cert-count">{member.certifications}</span>
                      <span className="lw-cert-label">earned</span>
                    </div>
                    <span className="lw-member-hire">{member.hireDate}</span>
                    <span
                      className="lw-member-status"
                      style={{ color: getStatusColor(member.status) }}
                    >
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/loud-works/team" className="lw-view-all-btn">
                View Full Directory
              </Link>
            </div>

            {/* Today's Schedule */}
            <div className="lw-dash-card">
              <div className="lw-dash-card-header">
                <h3>Today&apos;s Coverage</h3>
                <Link href="/loud-works/schedule" className="lw-dash-link">Full Schedule</Link>
              </div>
              <div className="lw-schedule-list">
                {scheduleToday.map((shift) => (
                  <div key={shift.id} className="lw-schedule-row">
                    <div className="lw-shift-info">
                      <span className="lw-shift-name">{shift.shift}</span>
                      <span className="lw-shift-time">{shift.time}</span>
                    </div>
                    <div className="lw-shift-coverage">
                      <div className="lw-coverage-bar">
                        <div
                          className="lw-coverage-fill"
                          style={{
                            width: `${(shift.staffed / shift.required) * 100}%`,
                            background: shift.status === "covered" ? "#22C55E" : "#EF4444"
                          }}
                        />
                      </div>
                      <span className="lw-coverage-text">
                        {shift.staffed}/{shift.required} staffed
                      </span>
                    </div>
                    <span className={`lw-shift-status ${shift.status}`}>
                      {shift.status === "covered" ? "Covered" : "Needs Staff"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div className="lw-dash-card">
              <div className="lw-dash-card-header">
                <h3>Open Positions</h3>
                <Link href="/loud-works/recruiting" className="lw-dash-link">View All</Link>
              </div>
              <div className="lw-positions-list">
                {openPositions.map((position) => (
                  <div key={position.id} className="lw-position-row">
                    <div className="lw-position-info">
                      <span className="lw-position-title">{position.title}</span>
                      <span className="lw-position-dept">{position.department}</span>
                    </div>
                    <div className="lw-position-meta">
                      <span className="lw-position-applicants">{position.applicants} applicants</span>
                      <span
                        className="lw-position-priority"
                        style={{ background: getPriorityColor(position.priority) }}
                      >
                        {position.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Training */}
            <div className="lw-dash-card">
              <div className="lw-dash-card-header">
                <h3>Upcoming Training</h3>
                <Link href="/loud-works/training" className="lw-dash-link">Manage</Link>
              </div>
              <div className="lw-training-list">
                {upcomingTrainings.map((training) => (
                  <div key={training.id} className="lw-training-row">
                    <div className="lw-training-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12,2 2,7 12,12 22,7" />
                        <polyline points="2,17 12,22 22,17" />
                        <polyline points="2,12 12,17 22,12" />
                      </svg>
                    </div>
                    <div className="lw-training-info">
                      <span className="lw-training-name">{training.name}</span>
                      <span className="lw-training-meta">{training.date} &middot; {training.attendees} registered</span>
                    </div>
                    <span className={`lw-training-type ${training.type}`}>
                      {training.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lw-dash-card">
              <div className="lw-dash-card-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="lw-activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="lw-activity-row">
                    <div className={`lw-activity-icon ${activity.type}`}>
                      {activity.type === "onboarding" && "👋"}
                      {activity.type === "certification" && "🎓"}
                      {activity.type === "review" && "📋"}
                      {activity.type === "training" && "📚"}
                    </div>
                    <div className="lw-activity-info">
                      <span className="lw-activity-action">{activity.action}</span>
                      <span className="lw-activity-person">{activity.person}</span>
                    </div>
                    <span className="lw-activity-time">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lw-dash-card">
              <div className="lw-dash-card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="lw-quick-actions">
                <button className="lw-quick-action">
                  <span className="lw-qa-icon">👤</span>
                  <span>Add Employee</span>
                </button>
                <button className="lw-quick-action">
                  <span className="lw-qa-icon">📅</span>
                  <span>Edit Schedule</span>
                </button>
                <button className="lw-quick-action">
                  <span className="lw-qa-icon">📊</span>
                  <span>Run Reports</span>
                </button>
                <button className="lw-quick-action">
                  <span className="lw-qa-icon">🎯</span>
                  <span>Set Goals</span>
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
