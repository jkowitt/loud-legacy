"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sample data
const contacts = [
  { id: 1, name: "Sarah Mitchell", company: "TechVentures Inc", email: "sarah@techventures.com", phone: "(555) 123-4567", status: "hot", lastContact: "2024-01-18", value: 125000, avatar: "SM" },
  { id: 2, name: "Michael Chen", company: "Apex Partners", email: "mchen@apexpartners.com", phone: "(555) 234-5678", status: "warm", lastContact: "2024-01-15", value: 85000, avatar: "MC" },
  { id: 3, name: "Jennifer Walsh", company: "Summit Holdings", email: "jwalsh@summit.co", phone: "(555) 345-6789", status: "hot", lastContact: "2024-01-17", value: 200000, avatar: "JW" },
  { id: 4, name: "David Park", company: "Innovate Labs", email: "dpark@innovatelabs.io", phone: "(555) 456-7890", status: "cold", lastContact: "2024-01-05", value: 45000, avatar: "DP" },
  { id: 5, name: "Amanda Foster", company: "Growth Capital", email: "afoster@growthcap.com", phone: "(555) 567-8901", status: "warm", lastContact: "2024-01-12", value: 150000, avatar: "AF" },
];

const pipeline = [
  { stage: "Lead", count: 24, value: 480000, color: "#64748B" },
  { stage: "Qualified", count: 18, value: 720000, color: "#3B82F6" },
  { stage: "Proposal", count: 12, value: 960000, color: "#8B5CF6" },
  { stage: "Negotiation", count: 8, value: 640000, color: "#F59E0B" },
  { stage: "Closed", count: 15, value: 1200000, color: "#10B981" },
];

const activities = [
  { id: 1, type: "call", contact: "Sarah Mitchell", description: "Discussed Q1 partnership proposal", time: "2 hours ago" },
  { id: 2, type: "email", contact: "Michael Chen", description: "Sent follow-up on pricing details", time: "4 hours ago" },
  { id: 3, type: "meeting", contact: "Jennifer Walsh", description: "Strategy session for expansion", time: "Yesterday" },
  { id: 4, type: "note", contact: "David Park", description: "Added notes from trade show meeting", time: "Yesterday" },
  { id: 5, type: "task", contact: "Amanda Foster", description: "Schedule product demo", time: "2 days ago" },
];

const upcomingTasks = [
  { id: 1, title: "Call Sarah Mitchell", type: "call", dueDate: "Today, 2:00 PM", priority: "high" },
  { id: 2, title: "Send proposal to Jennifer Walsh", type: "email", dueDate: "Today, 5:00 PM", priority: "high" },
  { id: 3, title: "Follow up with Michael Chen", type: "call", dueDate: "Tomorrow, 10:00 AM", priority: "medium" },
  { id: 4, title: "Prepare quarterly review deck", type: "task", dueDate: "Jan 25, 2024", priority: "medium" },
];

export default function LegacyCRMDashboard() {
  const [contactFilter, setContactFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const totalPipelineValue = pipeline.reduce((sum, p) => sum + p.value, 0);
  const totalContacts = contacts.length;
  const hotLeads = contacts.filter(c => c.status === "hot").length;
  const avgDealValue = Math.round(totalPipelineValue / pipeline.reduce((sum, p) => sum + p.count, 0));

  const filteredContacts = contacts.filter(c => {
    const matchesFilter = contactFilter === "all" || c.status === contactFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "#EF4444";
      case "warm": return "#F59E0B";
      case "cold": return "#64748B";
      default: return "#64748B";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return "📞";
      case "email": return "✉️";
      case "meeting": return "🤝";
      case "note": return "📝";
      case "task": return "✅";
      default: return "📋";
    }
  };

  return (
    <main className="lcrm-dashboard-page">
      <Header />

      {/* Dashboard Header */}
      <section className="lcrm-dash-header">
        <div className="container">
          <div className="lcrm-dash-header-content">
            <div>
              <div className="lcrm-breadcrumb">
                <Link href="/legacy-crm">Legacy CRM</Link>
                <span>/</span>
                <span>Dashboard</span>
              </div>
              <h1>Relationship Dashboard</h1>
              <p>Nurture relationships that drive your success.</p>
            </div>
            <div className="lcrm-dash-actions">
              <button className="lcrm-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import
              </button>
              <button className="lcrm-dash-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Contact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lcrm-dash-stats">
        <div className="container">
          <div className="lcrm-dash-stats-grid">
            <div className="lcrm-dash-stat">
              <div className="lcrm-dash-stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="lcrm-dash-stat-content">
                <span className="lcrm-dash-stat-value">${(totalPipelineValue / 1000000).toFixed(1)}M</span>
                <span className="lcrm-dash-stat-label">Pipeline Value</span>
              </div>
            </div>

            <div className="lcrm-dash-stat">
              <div className="lcrm-dash-stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className="lcrm-dash-stat-content">
                <span className="lcrm-dash-stat-value">{totalContacts}</span>
                <span className="lcrm-dash-stat-label">Total Contacts</span>
              </div>
            </div>

            <div className="lcrm-dash-stat">
              <div className="lcrm-dash-stat-icon red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <div className="lcrm-dash-stat-content">
                <span className="lcrm-dash-stat-value">{hotLeads}</span>
                <span className="lcrm-dash-stat-label">Hot Leads</span>
              </div>
            </div>

            <div className="lcrm-dash-stat">
              <div className="lcrm-dash-stat-icon purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="lcrm-dash-stat-content">
                <span className="lcrm-dash-stat-value">${(avgDealValue / 1000).toFixed(0)}K</span>
                <span className="lcrm-dash-stat-label">Avg Deal Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="lcrm-dash-main">
        <div className="container">
          <div className="lcrm-dash-layout">
            {/* Pipeline */}
            <div className="lcrm-dash-card full-width">
              <div className="lcrm-dash-card-header">
                <h3>Sales Pipeline</h3>
                <Link href="/legacy-crm/pipeline" className="lcrm-dash-link">View Full Pipeline</Link>
              </div>
              <div className="lcrm-pipeline-visual">
                {pipeline.map((stage, index) => (
                  <div key={stage.stage} className="lcrm-pipeline-stage">
                    <div
                      className="lcrm-pipeline-bar"
                      style={{
                        background: stage.color,
                        width: `${(stage.value / totalPipelineValue) * 100}%`,
                        minWidth: "80px"
                      }}
                    >
                      <span className="lcrm-pipeline-count">{stage.count}</span>
                    </div>
                    <div className="lcrm-pipeline-info">
                      <span className="lcrm-pipeline-name">{stage.stage}</span>
                      <span className="lcrm-pipeline-value">${(stage.value / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacts List */}
            <div className="lcrm-dash-card">
              <div className="lcrm-dash-card-header">
                <h3>Recent Contacts</h3>
                <div className="lcrm-contact-filters">
                  {["all", "hot", "warm", "cold"].map((filter) => (
                    <button
                      key={filter}
                      className={`lcrm-filter-btn ${contactFilter === filter ? "active" : ""}`}
                      onClick={() => setContactFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lcrm-contact-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="lcrm-contacts-list">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="lcrm-contact-row">
                    <div className="lcrm-contact-avatar" style={{ background: `linear-gradient(135deg, ${getStatusColor(contact.status)} 0%, ${getStatusColor(contact.status)}99 100%)` }}>
                      {contact.avatar}
                    </div>
                    <div className="lcrm-contact-info">
                      <span className="lcrm-contact-name">{contact.name}</span>
                      <span className="lcrm-contact-company">{contact.company}</span>
                    </div>
                    <div className="lcrm-contact-meta">
                      <span className="lcrm-contact-value">${(contact.value / 1000).toFixed(0)}K</span>
                      <span className={`lcrm-contact-status ${contact.status}`}>{contact.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/legacy-crm/contacts" className="lcrm-view-all-btn">
                View All Contacts
              </Link>
            </div>

            {/* Activity Feed */}
            <div className="lcrm-dash-card">
              <div className="lcrm-dash-card-header">
                <h3>Recent Activity</h3>
                <Link href="/legacy-crm/activities" className="lcrm-dash-link">View All</Link>
              </div>
              <div className="lcrm-activity-feed">
                {activities.map((activity) => (
                  <div key={activity.id} className="lcrm-activity-item">
                    <span className="lcrm-activity-icon">{getActivityIcon(activity.type)}</span>
                    <div className="lcrm-activity-content">
                      <span className="lcrm-activity-contact">{activity.contact}</span>
                      <span className="lcrm-activity-desc">{activity.description}</span>
                      <span className="lcrm-activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="lcrm-dash-card">
              <div className="lcrm-dash-card-header">
                <h3>Upcoming Tasks</h3>
                <button className="lcrm-add-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <div className="lcrm-upcoming-tasks">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="lcrm-upcoming-task">
                    <div className="lcrm-task-checkbox">
                      <input type="checkbox" />
                    </div>
                    <div className="lcrm-task-info">
                      <span className="lcrm-task-title">{task.title}</span>
                      <span className="lcrm-task-due">{task.dueDate}</span>
                    </div>
                    <span className={`lcrm-task-priority ${task.priority}`}>{task.priority}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lcrm-dash-card">
              <div className="lcrm-dash-card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="lcrm-quick-actions">
                <button className="lcrm-quick-action">
                  <span className="lcrm-qa-icon">📞</span>
                  <span>Log Call</span>
                </button>
                <button className="lcrm-quick-action">
                  <span className="lcrm-qa-icon">✉️</span>
                  <span>Send Email</span>
                </button>
                <button className="lcrm-quick-action">
                  <span className="lcrm-qa-icon">📅</span>
                  <span>Schedule Meeting</span>
                </button>
                <button className="lcrm-quick-action">
                  <span className="lcrm-qa-icon">📝</span>
                  <span>Add Note</span>
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
