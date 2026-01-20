"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "template";
  format: "PDF" | "Excel";
  downloadUrl: string;
  previewUrl?: string;
  isFree: boolean;
}

const guides: Resource[] = [
  {
    id: "business-overview",
    title: "Business Overview Framework",
    description: "Define what your business is, who it serves, and how it makes money. A foundational document every operator needs.",
    type: "guide",
    format: "PDF",
    downloadUrl: "/downloads/business-now/guides/business-overview-framework.pdf",
    isFree: true,
  },
  {
    id: "goal-setting",
    title: "Goal Setting & Priority Framework",
    description: "Learn how to set meaningful goals and prioritize ruthlessly. Stop chasing everything and start finishing what matters.",
    type: "guide",
    format: "PDF",
    downloadUrl: "/downloads/business-now/guides/goal-setting-framework.pdf",
    isFree: false,
  },
  {
    id: "weekly-planning",
    title: "Weekly Planning System Guide",
    description: "The complete system for planning your week with intention. Includes the exact process we use to maintain consistency.",
    type: "guide",
    format: "PDF",
    downloadUrl: "/downloads/business-now/guides/weekly-planning-system.pdf",
    isFree: false,
  },
  {
    id: "cash-flow",
    title: "Cash Flow Management Guide",
    description: "Understand your numbers without being an accountant. Simple frameworks for tracking money in and money out.",
    type: "guide",
    format: "PDF",
    downloadUrl: "/downloads/business-now/guides/cash-flow-management.pdf",
    isFree: false,
  },
  {
    id: "kpi-selection",
    title: "KPI Selection Guide",
    description: "How to choose the 3-5 metrics that actually matter for your business. Avoid vanity metrics and focus on drivers.",
    type: "guide",
    format: "PDF",
    downloadUrl: "/downloads/business-now/guides/kpi-selection-guide.pdf",
    isFree: false,
  },
  {
    id: "execution-playbook",
    title: "Execution Discipline Playbook",
    description: "Build systems for consistent action. This playbook covers habits, routines, and accountability structures.",
    type: "guide",
    format: "PDF",
    downloadUrl: "/downloads/business-now/guides/execution-discipline-playbook.pdf",
    isFree: false,
  },
];

const templates: Resource[] = [
  {
    id: "business-canvas",
    title: "Business Overview Canvas",
    description: "One-page template to document your business model, value proposition, and revenue streams.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/business-overview-canvas.xlsx",
    isFree: true,
  },
  {
    id: "goal-tracker",
    title: "Goal & Priority Tracker",
    description: "Track quarterly, monthly, and weekly goals with built-in progress indicators and priority scoring.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/goal-priority-tracker.xlsx",
    isFree: false,
  },
  {
    id: "weekly-planner",
    title: "Weekly Planning Template",
    description: "Plan your week with time blocks, priorities, and reflection sections. Print or use digitally.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/weekly-planning-template.xlsx",
    isFree: false,
  },
  {
    id: "income-expense",
    title: "Income & Expense Tracker",
    description: "Simple monthly tracker for all income and expenses with automatic categorization and totals.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/income-expense-tracker.xlsx",
    isFree: true,
  },
  {
    id: "cash-flow-projector",
    title: "12-Month Cash Flow Projector",
    description: "Project your cash flow for the next 12 months. Includes scenarios for best, expected, and worst cases.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/cash-flow-projector.xlsx",
    isFree: false,
  },
  {
    id: "kpi-dashboard",
    title: "KPI Dashboard Template",
    description: "Track up to 10 KPIs with weekly/monthly views, trend indicators, and target comparisons.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/kpi-dashboard.xlsx",
    isFree: false,
  },
  {
    id: "monthly-review",
    title: "Monthly Financial Review",
    description: "End-of-month review template covering revenue, expenses, profitability, and key insights.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/monthly-financial-review.xlsx",
    isFree: false,
  },
  {
    id: "pricing-calculator",
    title: "Pricing & Margins Calculator",
    description: "Calculate optimal pricing based on costs, desired margins, and market positioning.",
    type: "template",
    format: "Excel",
    downloadUrl: "/downloads/business-now/templates/pricing-calculator.xlsx",
    isFree: false,
  },
];

export default function BusinessNowResourcesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "guides" | "templates">("all");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Simulated subscription status - in production, this would come from auth/session
  const isSubscribed = false;

  const handleDownload = (resource: Resource) => {
    if (resource.isFree || isSubscribed) {
      // Trigger download
      window.open(resource.downloadUrl, "_blank");
    } else {
      setSelectedResource(resource);
      setShowSubscribeModal(true);
    }
  };

  const filteredResources = activeTab === "all"
    ? [...guides, ...templates]
    : activeTab === "guides"
      ? guides
      : templates;

  return (
    <main className="business-now-page">
      <Header />

      {/* Hero Section */}
      <section className="bn-resources-hero">
        <div className="container">
          <Link href="/business-now" className="bn-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Business Now
          </Link>
          <div className="bn-resources-header">
            <span className="bn-section-label">Resources</span>
            <h1>Tools for Structured Execution</h1>
            <p>
              Download our how-to guides and financial templates to implement the Business Now
              framework in your business. Free resources available—premium content with subscription.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bn-resources-filters">
        <div className="container">
          <div className="bn-filter-tabs">
            <button
              className={`bn-filter-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Resources ({guides.length + templates.length})
            </button>
            <button
              className={`bn-filter-tab ${activeTab === "guides" ? "active" : ""}`}
              onClick={() => setActiveTab("guides")}
            >
              How-To Guides ({guides.length})
            </button>
            <button
              className={`bn-filter-tab ${activeTab === "templates" ? "active" : ""}`}
              onClick={() => setActiveTab("templates")}
            >
              Excel Templates ({templates.length})
            </button>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="bn-resources-grid-section">
        <div className="container">
          <div className="bn-resources-grid">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bn-resource-card">
                <div className="bn-resource-header">
                  <div className="bn-resource-icon">
                    {resource.format === "PDF" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="3" y1="9" x2="21" y2="9"/>
                        <line x1="3" y1="15" x2="21" y2="15"/>
                        <line x1="9" y1="3" x2="9" y2="21"/>
                        <line x1="15" y1="3" x2="15" y2="21"/>
                      </svg>
                    )}
                  </div>
                  <div className="bn-resource-badges">
                    <span className={`bn-format-badge ${resource.format.toLowerCase()}`}>
                      {resource.format}
                    </span>
                    {resource.isFree ? (
                      <span className="bn-free-badge">Free</span>
                    ) : (
                      <span className="bn-premium-badge">Premium</span>
                    )}
                  </div>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <button
                  className={`bn-download-btn ${resource.isFree || isSubscribed ? "" : "locked"}`}
                  onClick={() => handleDownload(resource)}
                >
                  {resource.isFree || isSubscribed ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download {resource.format}
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                      Unlock with Subscription
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      {!isSubscribed && (
        <section className="bn-subscription-cta">
          <div className="container">
            <div className="bn-subscription-card">
              <div className="bn-subscription-content">
                <h2>Unlock All Resources</h2>
                <p>
                  Get access to all how-to guides, Excel templates, and future resources
                  with a Business Now subscription. New content added monthly.
                </p>
                <ul className="bn-subscription-benefits">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    All 6 How-To Guides (PDF)
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    All 8 Excel Templates
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Monthly New Resources
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    Email Support
                  </li>
                </ul>
              </div>
              <div className="bn-subscription-pricing">
                <div className="bn-price">
                  <span className="bn-price-amount">$19</span>
                  <span className="bn-price-period">/month</span>
                </div>
                <p className="bn-price-note">or $149/year (save 35%)</p>
                <Link href="/pricing" className="button bn-button-primary bn-button-large">
                  Subscribe Now
                </Link>
                <p className="bn-guarantee">30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Subscribe Modal */}
      {showSubscribeModal && selectedResource && (
        <div className="bn-modal-overlay" onClick={() => setShowSubscribeModal(false)}>
          <div className="bn-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bn-modal-close" onClick={() => setShowSubscribeModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="bn-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3>Unlock "{selectedResource.title}"</h3>
            <p>
              This resource is available to Business Now subscribers. Get instant access
              to this and all other premium resources.
            </p>
            <div className="bn-modal-actions">
              <Link href="/pricing" className="button bn-button-primary">
                View Subscription Plans
              </Link>
              <button
                className="button bn-button-ghost"
                onClick={() => setShowSubscribeModal(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
