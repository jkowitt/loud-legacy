"use client";

import Link from "next/link";
import { useState } from "react";

// Demo projects data
const demoProjects = [
  {
    id: "1",
    title: "Social Media Content Creation",
    organization: "TechStart Inc.",
    category: "Marketing Support",
    locationType: "REMOTE",
    payType: "FIXED",
    payAmount: 500,
    estimatedHours: 20,
    description: "Create engaging social media content for our product launch. Includes graphics, copy, and scheduling for Instagram, Twitter, and LinkedIn.",
    requirements: ["Social Media", "Graphic Design", "Copywriting"],
    status: "LIVE",
    applicants: 12,
    postedDays: 3,
  },
  {
    id: "2",
    title: "Event Photography & Videography",
    organization: "Community Foundation",
    category: "Event Operations",
    locationType: "ONSITE",
    payType: "HOURLY",
    payAmount: 35,
    estimatedHours: 8,
    description: "Capture photos and video of our annual fundraising gala. Deliverables include edited highlights reel and 50+ event photos.",
    requirements: ["Photography", "Video Editing", "Adobe Premiere"],
    status: "LIVE",
    applicants: 7,
    postedDays: 1,
  },
  {
    id: "3",
    title: "Data Entry & CRM Cleanup",
    organization: "Sales Pro Agency",
    category: "Data & Analytics",
    locationType: "REMOTE",
    payType: "FIXED",
    payAmount: 300,
    estimatedHours: 15,
    description: "Clean and organize our CRM database. Merge duplicates, standardize formatting, and update missing contact information.",
    requirements: ["Data Entry", "Excel", "Attention to Detail"],
    status: "LIVE",
    applicants: 23,
    postedDays: 5,
  },
  {
    id: "4",
    title: "Website Redesign Assistance",
    organization: "Local Nonprofit",
    category: "Marketing Support",
    locationType: "HYBRID",
    payType: "FIXED",
    payAmount: 800,
    estimatedHours: 30,
    description: "Help redesign our organization's website using WordPress. Includes new layout, updated content, and mobile optimization.",
    requirements: ["WordPress", "Web Design", "UI/UX"],
    status: "LIVE",
    applicants: 9,
    postedDays: 2,
  },
  {
    id: "5",
    title: "Research Report Compilation",
    organization: "University Research Lab",
    category: "Research",
    locationType: "REMOTE",
    payType: "HOURLY",
    payAmount: 25,
    estimatedHours: 40,
    description: "Compile and summarize academic research papers for our literature review. Create annotated bibliography and summary document.",
    requirements: ["Research", "Academic Writing", "Citation Management"],
    status: "LIVE",
    applicants: 15,
    postedDays: 4,
  },
  {
    id: "6",
    title: "Video Tutorial Production",
    organization: "EdTech Startup",
    category: "Video Production",
    locationType: "REMOTE",
    payType: "FIXED",
    payAmount: 600,
    estimatedHours: 25,
    description: "Create 5 tutorial videos explaining our software features. Includes scripting, screen recording, voiceover, and basic editing.",
    requirements: ["Video Production", "Screen Recording", "Clear Communication"],
    status: "LIVE",
    applicants: 11,
    postedDays: 6,
  },
];

const categories = [
  "All Categories",
  "Marketing Support",
  "Event Operations",
  "Data & Analytics",
  "Video Production",
  "Research",
  "Community Outreach",
];

const locationTypes = ["All Locations", "Remote", "Onsite", "Hybrid"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = demoProjects.filter((project) => {
    const matchesCategory = selectedCategory === "All Categories" || project.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || project.locationType === selectedLocation.toUpperCase();
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="projects-header__nav">
          <Link href="https://loud-legacy.com" className="home-link">
            Loud Legacy Home
          </Link>
          <Link href="/" className="brand-link">
            <span className="brand-icon">W</span>
            Loud Works
          </Link>
        </div>
        <div className="projects-header__actions">
          <Link href="/talent" className="btn btn-outline">My Profile</Link>
          <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
        </div>
      </header>

      <main className="projects-main">
        <div className="projects-hero">
          <h1>Find Your Next Project</h1>
          <p>Browse paid opportunities from verified partner organizations</p>
        </div>

        <div className="projects-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search projects, skills, or organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input search-input"
            />
          </div>

          <div className="filter-row">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input filter-select"
            >
              {locationTypes.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <span className="results-count">{filteredProjects.length} projects found</span>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card__header">
                <span className="project-category">{project.category}</span>
                <span className={`project-location project-location--${project.locationType.toLowerCase()}`}>
                  {project.locationType}
                </span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-org">{project.organization}</p>
              <p className="project-desc">{project.description}</p>

              <div className="project-skills">
                {project.requirements.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>

              <div className="project-meta">
                <div className="project-pay">
                  <span className="pay-amount">
                    ${project.payAmount}{project.payType === "HOURLY" ? "/hr" : ""}
                  </span>
                  <span className="pay-type">
                    {project.payType === "HOURLY" ? `~${project.estimatedHours} hrs` : "Fixed"}
                  </span>
                </div>
                <div className="project-stats">
                  <span>{project.applicants} applicants</span>
                  <span>{project.postedDays}d ago</span>
                </div>
              </div>

              <Link href={`/projects/${project.id}`} className="btn btn-primary project-apply">
                View & Apply
              </Link>
            </article>
          ))}
        </div>
      </main>

      <style jsx>{`
        .projects-page {
          min-height: 100vh;
          background: var(--color-background);
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .projects-header__nav {
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

        .projects-header__actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .projects-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-xl);
        }

        .projects-hero {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }

        .projects-hero h1 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-sm);
        }

        .projects-hero p {
          color: var(--color-text-secondary);
        }

        .projects-filters {
          margin-bottom: var(--spacing-xl);
        }

        .search-box {
          margin-bottom: var(--spacing-md);
        }

        .search-input {
          font-size: var(--font-size-base);
          padding: var(--spacing-md);
        }

        .filter-row {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .filter-select {
          width: auto;
          min-width: 180px;
        }

        .results-count {
          margin-left: auto;
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-lg);
        }

        .project-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s;
        }

        .project-card:hover {
          border-color: var(--color-primary);
        }

        .project-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .project-category {
          font-size: var(--font-size-xs);
          color: var(--color-primary-light);
          font-weight: 500;
        }

        .project-location {
          font-size: var(--font-size-xs);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          background: var(--color-surface-elevated);
        }

        .project-location--remote {
          background: rgba(16, 185, 129, 0.2);
          color: var(--color-secondary);
        }

        .project-location--onsite {
          background: rgba(245, 158, 11, 0.2);
          color: var(--color-warning);
        }

        .project-location--hybrid {
          background: rgba(59, 130, 246, 0.2);
          color: var(--color-info);
        }

        .project-title {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-xs);
        }

        .project-org {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-sm);
        }

        .project-desc {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: var(--spacing-md);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-skills {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-md);
        }

        .skill-tag {
          font-size: var(--font-size-xs);
          padding: 4px 10px;
          background: var(--color-surface-elevated);
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--color-border);
          margin-top: auto;
        }

        .project-pay {
          display: flex;
          flex-direction: column;
        }

        .pay-amount {
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--color-secondary);
        }

        .pay-type {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
        }

        .project-stats {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
        }

        .project-apply {
          width: 100%;
        }

        @media (max-width: 768px) {
          .filter-row {
            flex-wrap: wrap;
          }

          .filter-select {
            flex: 1;
            min-width: 140px;
          }

          .results-count {
            width: 100%;
            text-align: center;
            margin-top: var(--spacing-sm);
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
