"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sample data
const properties = [
  { id: 1, name: "Downtown Office Tower", type: "Commercial", address: "123 Main St, New York", value: 45000000, sqft: 150000, capRate: 6.2, status: "active", change: 3.2 },
  { id: 2, name: "Riverside Apartments", type: "Multifamily", address: "456 River Rd, Boston", value: 28000000, sqft: 95000, capRate: 5.8, status: "active", change: 2.1 },
  { id: 3, name: "Tech Campus Building A", type: "Commercial", address: "789 Innovation Blvd, Austin", value: 62000000, sqft: 200000, capRate: 5.5, status: "under-review", change: 4.5 },
  { id: 4, name: "Harbor View Retail", type: "Retail", address: "321 Waterfront Dr, Miami", value: 18500000, sqft: 45000, capRate: 7.1, status: "active", change: -1.2 },
  { id: 5, name: "Industrial Park West", type: "Industrial", address: "555 Commerce Way, Phoenix", value: 35000000, sqft: 250000, capRate: 6.8, status: "active", change: 2.8 },
];

const recentDeals = [
  { id: 1, name: "Metropolitan Plaza", type: "Acquisition", value: 52000000, date: "Jan 20, 2024", status: "closed" },
  { id: 2, name: "Suburban Office Park", type: "Disposition", value: 18500000, date: "Jan 15, 2024", status: "closed" },
  { id: 3, name: "Lakeview Residences", type: "Refinance", value: 32000000, date: "Jan 12, 2024", status: "pending" },
  { id: 4, name: "Airport Logistics Hub", type: "Acquisition", value: 75000000, date: "Jan 8, 2024", status: "in-progress" },
];

const marketTrends = [
  { sector: "Office", trend: "down", change: -2.3, forecast: "cautious" },
  { sector: "Multifamily", trend: "up", change: 4.1, forecast: "positive" },
  { sector: "Industrial", trend: "up", change: 6.8, forecast: "strong" },
  { sector: "Retail", trend: "stable", change: 0.5, forecast: "neutral" },
];

const tasks = [
  { id: 1, title: "Review Tech Campus appraisal", property: "Tech Campus Building A", due: "Today", priority: "high" },
  { id: 2, title: "Update Harbor View financials", property: "Harbor View Retail", due: "Tomorrow", priority: "medium" },
  { id: 3, title: "Prepare investor presentation", property: "Portfolio", due: "Jan 26", priority: "high" },
  { id: 4, title: "Site visit - Industrial Park", property: "Industrial Park West", due: "Jan 28", priority: "low" },
];

export default function ValoraDisboard() {
  const [propertyFilter, setPropertyFilter] = useState("all");

  const totalPortfolioValue = properties.reduce((sum, p) => sum + p.value, 0);
  const totalSqft = properties.reduce((sum, p) => sum + p.sqft, 0);
  const avgCapRate = (properties.reduce((sum, p) => sum + p.capRate, 0) / properties.length).toFixed(1);
  const activeDeals = recentDeals.filter(d => d.status !== "closed").length;

  const filteredProperties = propertyFilter === "all"
    ? properties
    : properties.filter(p => p.type.toLowerCase() === propertyFilter.toLowerCase());

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "commercial": return "🏢";
      case "multifamily": return "🏠";
      case "retail": return "🛒";
      case "industrial": return "🏭";
      default: return "📍";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↑";
      case "down": return "↓";
      default: return "→";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "#22C55E";
      case "down": return "#EF4444";
      default: return "#64748B";
    }
  };

  return (
    <main className="valora-dashboard-page">
      <Header />

      {/* Dashboard Header */}
      <section className="val-dash-header">
        <div className="container">
          <div className="val-dash-header-content">
            <div>
              <div className="val-breadcrumb">
                <Link href="/valora">VALORA</Link>
                <span>/</span>
                <span>Dashboard</span>
              </div>
              <h1>Portfolio Intelligence</h1>
              <p>Real-time insights for smarter real estate decisions.</p>
            </div>
            <div className="val-dash-actions">
              <button className="val-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export
              </button>
              <button className="val-dash-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="val-dash-stats">
        <div className="container">
          <div className="val-dash-stats-grid">
            <div className="val-dash-stat">
              <div className="val-dash-stat-icon emerald">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">${(totalPortfolioValue / 1000000).toFixed(0)}M</span>
                <span className="val-dash-stat-label">Portfolio Value</span>
              </div>
            </div>

            <div className="val-dash-stat">
              <div className="val-dash-stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">{(totalSqft / 1000).toFixed(0)}K</span>
                <span className="val-dash-stat-label">Total Sq Ft</span>
              </div>
            </div>

            <div className="val-dash-stat">
              <div className="val-dash-stat-icon amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">{avgCapRate}%</span>
                <span className="val-dash-stat-label">Avg Cap Rate</span>
              </div>
            </div>

            <div className="val-dash-stat">
              <div className="val-dash-stat-icon violet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </div>
              <div className="val-dash-stat-content">
                <span className="val-dash-stat-value">{activeDeals}</span>
                <span className="val-dash-stat-label">Active Deals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="val-dash-main">
        <div className="container">
          <div className="val-dash-layout">
            {/* Properties Table */}
            <div className="val-dash-card full-width">
              <div className="val-dash-card-header">
                <h3>Property Portfolio</h3>
                <div className="val-property-filters">
                  {["all", "commercial", "multifamily", "retail", "industrial"].map((filter) => (
                    <button
                      key={filter}
                      className={`val-filter-btn ${propertyFilter === filter ? "active" : ""}`}
                      onClick={() => setPropertyFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="val-properties-table">
                <div className="val-properties-header">
                  <span>Property</span>
                  <span>Type</span>
                  <span>Value</span>
                  <span>Sq Ft</span>
                  <span>Cap Rate</span>
                  <span>Change</span>
                  <span>Status</span>
                </div>
                {filteredProperties.map((property) => (
                  <div key={property.id} className="val-property-row">
                    <div className="val-property-info">
                      <span className="val-property-icon">{getTypeIcon(property.type)}</span>
                      <div>
                        <span className="val-property-name">{property.name}</span>
                        <span className="val-property-address">{property.address}</span>
                      </div>
                    </div>
                    <span className="val-property-type">{property.type}</span>
                    <span className="val-property-value">${(property.value / 1000000).toFixed(1)}M</span>
                    <span className="val-property-sqft">{(property.sqft / 1000).toFixed(0)}K</span>
                    <span className="val-property-cap">{property.capRate}%</span>
                    <span className={`val-property-change ${property.change >= 0 ? "positive" : "negative"}`}>
                      {property.change >= 0 ? "+" : ""}{property.change}%
                    </span>
                    <span className={`val-property-status ${property.status}`}>
                      {property.status === "active" ? "Active" : "Under Review"}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/valora/properties" className="val-view-all-btn">
                View All Properties
              </Link>
            </div>

            {/* Recent Deals */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Recent Deals</h3>
                <Link href="/valora/deals" className="val-dash-link">View All</Link>
              </div>
              <div className="val-deals-list">
                {recentDeals.map((deal) => (
                  <div key={deal.id} className="val-deal-row">
                    <div className="val-deal-info">
                      <span className="val-deal-name">{deal.name}</span>
                      <span className="val-deal-date">{deal.date}</span>
                    </div>
                    <div className="val-deal-meta">
                      <span className="val-deal-type">{deal.type}</span>
                      <span className="val-deal-value">${(deal.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <span className={`val-deal-status ${deal.status}`}>
                      {deal.status === "closed" ? "Closed" : deal.status === "pending" ? "Pending" : "In Progress"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Market Trends</h3>
                <Link href="/valora/market" className="val-dash-link">Full Report</Link>
              </div>
              <div className="val-trends-list">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="val-trend-row">
                    <span className="val-trend-sector">{trend.sector}</span>
                    <div className="val-trend-indicator">
                      <span
                        className="val-trend-arrow"
                        style={{ color: getTrendColor(trend.trend) }}
                      >
                        {getTrendIcon(trend.trend)}
                      </span>
                      <span
                        className="val-trend-change"
                        style={{ color: getTrendColor(trend.trend) }}
                      >
                        {trend.change > 0 ? "+" : ""}{trend.change}%
                      </span>
                    </div>
                    <span className={`val-trend-forecast ${trend.forecast}`}>
                      {trend.forecast.charAt(0).toUpperCase() + trend.forecast.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Action Items</h3>
                <button className="val-add-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <div className="val-tasks-list">
                {tasks.map((task) => (
                  <div key={task.id} className="val-task-row">
                    <div className="val-task-checkbox">
                      <input type="checkbox" />
                    </div>
                    <div className="val-task-info">
                      <span className="val-task-title">{task.title}</span>
                      <span className="val-task-property">{task.property}</span>
                    </div>
                    <div className="val-task-meta">
                      <span className="val-task-due">{task.due}</span>
                      <span className={`val-task-priority ${task.priority}`}>{task.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tools */}
            <div className="val-dash-card">
              <div className="val-dash-card-header">
                <h3>Analysis Tools</h3>
              </div>
              <div className="val-quick-tools">
                <button className="val-quick-tool">
                  <span className="val-tool-icon">📊</span>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Valuation Model</span>
                    <span className="val-tool-desc">Run DCF analysis</span>
                  </div>
                </button>
                <button className="val-quick-tool">
                  <span className="val-tool-icon">📈</span>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Comp Analysis</span>
                    <span className="val-tool-desc">Find comparables</span>
                  </div>
                </button>
                <button className="val-quick-tool">
                  <span className="val-tool-icon">🗺️</span>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Market Map</span>
                    <span className="val-tool-desc">Location insights</span>
                  </div>
                </button>
                <button className="val-quick-tool">
                  <span className="val-tool-icon">📑</span>
                  <div className="val-tool-text">
                    <span className="val-tool-name">Report Builder</span>
                    <span className="val-tool-desc">Generate reports</span>
                  </div>
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
