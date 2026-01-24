"use client";

import Link from "next/link";
import { useState } from "react";

// Demo talent data
const demoStats = {
  projectsCompleted: 8,
  totalEarnings: 4250,
  avgRating: 4.8,
  skillsVerified: 12,
};

const demoEngagements = [
  {
    id: "1",
    title: "Social Media Campaign",
    organization: "TechStart Inc.",
    status: "ACTIVE",
    progress: 65,
    dueDate: "2025-02-15",
    pay: 500,
  },
  {
    id: "2",
    title: "Data Analysis Report",
    organization: "Research Lab",
    status: "COMPLETED",
    progress: 100,
    dueDate: "2025-01-20",
    pay: 350,
  },
];

const demoApplications = [
  {
    id: "1",
    projectTitle: "Video Tutorial Series",
    organization: "EdTech Startup",
    status: "SHORTLISTED",
    appliedDate: "2025-01-22",
    matchScore: 92,
  },
  {
    id: "2",
    projectTitle: "Website Redesign",
    organization: "Local Nonprofit",
    status: "SUBMITTED",
    appliedDate: "2025-01-21",
    matchScore: 78,
  },
];

const demoSkills = [
  { name: "Social Media Marketing", proficiency: "ADVANCED", verified: true },
  { name: "Content Writing", proficiency: "EXPERT", verified: true },
  { name: "Graphic Design", proficiency: "INTERMEDIATE", verified: true },
  { name: "Video Editing", proficiency: "INTERMEDIATE", verified: false },
  { name: "Data Analysis", proficiency: "BEGINNER", verified: false },
  { name: "Excel", proficiency: "ADVANCED", verified: true },
];

const demoProofItems = [
  {
    id: "1",
    title: "Brand Campaign for StartupXYZ",
    type: "PROJECT",
    tags: ["Social Media", "Branding"],
    date: "2025-01-15",
  },
  {
    id: "2",
    title: "Google Analytics Certification",
    type: "CERTIFICATE",
    tags: ["Analytics", "Marketing"],
    date: "2024-12-01",
  },
  {
    id: "3",
    title: "Portfolio Website",
    type: "LINK",
    tags: ["Web Design", "Development"],
    date: "2024-11-20",
  },
];

export default function TalentDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "skills" | "proof">("overview");

  return (
    <div className="talent-page">
      <header className="talent-header">
        <div className="talent-header__nav">
          <Link href="https://loud-legacy.com" className="home-link">
            Loud Legacy Home
          </Link>
          <Link href="/" className="brand-link">
            <span className="brand-icon">W</span>
            Loud Works
          </Link>
        </div>
        <div className="talent-header__actions">
          <Link href="/projects" className="btn btn-outline">Browse Projects</Link>
          <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
        </div>
      </header>

      <div className="talent-layout">
        <aside className="talent-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">JD</div>
            <h2>Jordan Davis</h2>
            <p className="profile-headline">Marketing & Content Specialist</p>
            <p className="profile-location">Chicago, IL</p>
            <div className="profile-availability">
              <span className="availability-dot"></span>
              Available 20 hrs/week
            </div>
            <button className="btn btn-outline btn-sm">Edit Profile</button>
          </div>

          <nav className="talent-nav">
            <button
              className={`talent-nav__item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`talent-nav__item ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              My Projects
            </button>
            <button
              className={`talent-nav__item ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button
              className={`talent-nav__item ${activeTab === "proof" ? "active" : ""}`}
              onClick={() => setActiveTab("proof")}
            >
              Proof Vault
            </button>
          </nav>

          <div className="quick-stats">
            <div className="quick-stat">
              <span className="quick-stat__value">{demoStats.projectsCompleted}</span>
              <span className="quick-stat__label">Projects</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat__value">${(demoStats.totalEarnings / 1000).toFixed(1)}k</span>
              <span className="quick-stat__label">Earned</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat__value">{demoStats.avgRating}</span>
              <span className="quick-stat__label">Rating</span>
            </div>
          </div>
        </aside>

        <main className="talent-main">
          {activeTab === "overview" && (
            <div className="tab-content">
              <section className="section">
                <h3>Active Engagements</h3>
                <div className="engagements-list">
                  {demoEngagements.filter(e => e.status === "ACTIVE").map((engagement) => (
                    <div key={engagement.id} className="engagement-card">
                      <div className="engagement-info">
                        <h4>{engagement.title}</h4>
                        <p>{engagement.organization}</p>
                      </div>
                      <div className="engagement-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${engagement.progress}%` }}></div>
                        </div>
                        <span>{engagement.progress}% complete</span>
                      </div>
                      <div className="engagement-meta">
                        <span className="engagement-pay">${engagement.pay}</span>
                        <span className="engagement-due">Due {engagement.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="section">
                <h3>Pending Applications</h3>
                <div className="applications-list">
                  {demoApplications.map((app) => (
                    <div key={app.id} className="application-card">
                      <div className="application-info">
                        <h4>{app.projectTitle}</h4>
                        <p>{app.organization}</p>
                      </div>
                      <div className="application-meta">
                        <span className={`status-badge status-badge--${app.status.toLowerCase()}`}>
                          {app.status}
                        </span>
                        <span className="match-score">{app.matchScore}% match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="section">
                <div className="section-header">
                  <h3>Recent Proof Items</h3>
                  <Link href="#" className="view-all">View All</Link>
                </div>
                <div className="proof-grid">
                  {demoProofItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="proof-card">
                      <span className="proof-type">{item.type}</span>
                      <h4>{item.title}</h4>
                      <div className="proof-tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="tab-content">
              <section className="section">
                <h3>All Engagements</h3>
                <div className="engagements-list">
                  {demoEngagements.map((engagement) => (
                    <div key={engagement.id} className="engagement-card engagement-card--full">
                      <div className="engagement-info">
                        <h4>{engagement.title}</h4>
                        <p>{engagement.organization}</p>
                      </div>
                      <div className="engagement-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${engagement.progress}%` }}></div>
                        </div>
                        <span>{engagement.progress}%</span>
                      </div>
                      <span className={`status-badge status-badge--${engagement.status.toLowerCase()}`}>
                        {engagement.status}
                      </span>
                      <span className="engagement-pay">${engagement.pay}</span>
                      <button className="btn btn-sm btn-outline">View</button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="section">
                <h3>Applications</h3>
                <div className="applications-list">
                  {demoApplications.map((app) => (
                    <div key={app.id} className="application-card application-card--full">
                      <div className="application-info">
                        <h4>{app.projectTitle}</h4>
                        <p>{app.organization}</p>
                      </div>
                      <span className="match-score">{app.matchScore}%</span>
                      <span className={`status-badge status-badge--${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                      <span className="application-date">{app.appliedDate}</span>
                      <button className="btn btn-sm btn-outline">View</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="tab-content">
              <section className="section">
                <div className="section-header">
                  <h3>My Skills</h3>
                  <button className="btn btn-sm btn-primary">Add Skill</button>
                </div>
                <div className="skills-grid">
                  {demoSkills.map((skill) => (
                    <div key={skill.name} className="skill-card">
                      <div className="skill-header">
                        <h4>{skill.name}</h4>
                        {skill.verified && <span className="verified-badge">Verified</span>}
                      </div>
                      <div className="skill-level">
                        <span className={`proficiency proficiency--${skill.proficiency.toLowerCase()}`}>
                          {skill.proficiency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "proof" && (
            <div className="tab-content">
              <section className="section">
                <div className="section-header">
                  <h3>Proof Vault</h3>
                  <button className="btn btn-sm btn-primary">Add Proof</button>
                </div>
                <div className="proof-grid proof-grid--full">
                  {demoProofItems.map((item) => (
                    <div key={item.id} className="proof-card proof-card--full">
                      <span className="proof-type">{item.type}</span>
                      <h4>{item.title}</h4>
                      <p className="proof-date">Added {item.date}</p>
                      <div className="proof-tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="proof-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-outline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .talent-page {
          min-height: 100vh;
          background: var(--color-background);
        }

        .talent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
        }

        .talent-header__nav {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .home-link {
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
        }

        .brand-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .brand-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--font-size-sm);
        }

        .talent-header__actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .talent-layout {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--spacing-xl);
          gap: var(--spacing-xl);
        }

        .talent-sidebar {
          width: 280px;
          flex-shrink: 0;
        }

        .profile-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          text-align: center;
          margin-bottom: var(--spacing-lg);
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-2xl);
          font-weight: 700;
          margin: 0 auto var(--spacing-md);
        }

        .profile-card h2 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-xs);
        }

        .profile-headline {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xs);
        }

        .profile-location {
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-sm);
        }

        .profile-availability {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          font-size: var(--font-size-sm);
          color: var(--color-secondary);
          margin-bottom: var(--spacing-md);
        }

        .availability-dot {
          width: 8px;
          height: 8px;
          background: var(--color-secondary);
          border-radius: var(--radius-full);
        }

        .talent-nav {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: var(--spacing-lg);
        }

        .talent-nav__item {
          display: block;
          width: 100%;
          padding: var(--spacing-md);
          background: none;
          border: none;
          text-align: left;
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          cursor: pointer;
          transition: all 0.2s;
        }

        .talent-nav__item:hover {
          background: var(--color-surface-elevated);
          color: var(--color-text-primary);
        }

        .talent-nav__item.active {
          background: var(--color-primary);
          color: white;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-sm);
        }

        .quick-stat {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm);
          text-align: center;
        }

        .quick-stat__value {
          display: block;
          font-size: var(--font-size-lg);
          font-weight: 700;
          color: var(--color-primary-light);
        }

        .quick-stat__label {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
        }

        .talent-main {
          flex: 1;
          min-width: 0;
        }

        .section {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .section h3 {
          margin-bottom: var(--spacing-lg);
          font-size: var(--font-size-lg);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .section-header h3 {
          margin-bottom: 0;
        }

        .view-all {
          font-size: var(--font-size-sm);
          color: var(--color-primary-light);
        }

        .engagement-card {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: var(--spacing-lg);
          align-items: center;
          padding: var(--spacing-md);
          background: var(--color-surface-elevated);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-sm);
        }

        .engagement-card--full {
          grid-template-columns: 1fr 150px auto auto auto;
        }

        .engagement-info h4 {
          font-size: var(--font-size-base);
          margin-bottom: var(--spacing-xs);
        }

        .engagement-info p {
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
        }

        .engagement-progress {
          text-align: center;
        }

        .progress-bar {
          width: 100px;
          height: 6px;
          background: var(--color-border);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: var(--spacing-xs);
        }

        .progress-fill {
          height: 100%;
          background: var(--color-secondary);
          border-radius: var(--radius-full);
        }

        .engagement-progress span {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
        }

        .engagement-meta {
          text-align: right;
        }

        .engagement-pay {
          display: block;
          font-weight: 600;
          color: var(--color-secondary);
        }

        .engagement-due {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
        }

        .application-card {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: var(--spacing-lg);
          align-items: center;
          padding: var(--spacing-md);
          background: var(--color-surface-elevated);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-sm);
        }

        .application-card--full {
          grid-template-columns: 1fr auto auto auto auto;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: 500;
        }

        .status-badge--active,
        .status-badge--shortlisted {
          background: rgba(16, 185, 129, 0.2);
          color: var(--color-secondary);
        }

        .status-badge--submitted {
          background: rgba(59, 130, 246, 0.2);
          color: var(--color-info);
        }

        .status-badge--completed {
          background: rgba(34, 197, 94, 0.2);
          color: var(--color-success);
        }

        .match-score {
          font-size: var(--font-size-sm);
          color: var(--color-primary-light);
          font-weight: 500;
        }

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
        }

        .proof-grid--full {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .proof-card {
          background: var(--color-surface-elevated);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
        }

        .proof-type {
          font-size: var(--font-size-xs);
          color: var(--color-primary-light);
          font-weight: 500;
        }

        .proof-card h4 {
          font-size: var(--font-size-sm);
          margin: var(--spacing-xs) 0;
        }

        .proof-date {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-sm);
        }

        .proof-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .tag {
          font-size: var(--font-size-xs);
          padding: 2px 8px;
          background: var(--color-surface);
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
        }

        .proof-actions {
          display: flex;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-md);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }

        .skill-card {
          background: var(--color-surface-elevated);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-sm);
        }

        .skill-header h4 {
          font-size: var(--font-size-sm);
        }

        .verified-badge {
          font-size: var(--font-size-xs);
          padding: 2px 6px;
          background: rgba(16, 185, 129, 0.2);
          color: var(--color-secondary);
          border-radius: var(--radius-sm);
        }

        .proficiency {
          font-size: var(--font-size-xs);
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .proficiency--beginner {
          background: rgba(148, 163, 184, 0.2);
          color: var(--color-text-muted);
        }

        .proficiency--intermediate {
          background: rgba(59, 130, 246, 0.2);
          color: var(--color-info);
        }

        .proficiency--advanced {
          background: rgba(16, 185, 129, 0.2);
          color: var(--color-secondary);
        }

        .proficiency--expert {
          background: rgba(245, 158, 11, 0.2);
          color: var(--color-warning);
        }

        .btn-sm {
          padding: var(--spacing-xs) var(--spacing-md);
          font-size: var(--font-size-sm);
        }

        @media (max-width: 1024px) {
          .talent-layout {
            flex-direction: column;
          }

          .talent-sidebar {
            width: 100%;
          }

          .quick-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .proof-grid {
            grid-template-columns: 1fr;
          }

          .engagement-card,
          .application-card {
            grid-template-columns: 1fr;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  );
}
