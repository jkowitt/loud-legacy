"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const properties = [
  {
    id: 1,
    name: "Riverside Office Tower",
    type: "Office",
    address: "123 River Dr, Austin, TX",
    sqft: 185000,
    units: 12,
    occupancy: 94,
    noi: 2850000,
    capRate: 6.2,
    value: 45967742,
    acquired: "Mar 2021",
    status: "stabilized",
    image: "🏢"
  },
  {
    id: 2,
    name: "Eastside Apartments",
    type: "Multifamily",
    address: "456 Oak Ave, Dallas, TX",
    sqft: 220000,
    units: 180,
    occupancy: 97,
    noi: 3200000,
    capRate: 5.8,
    value: 55172414,
    acquired: "Jun 2020",
    status: "stabilized",
    image: "🏨"
  },
  {
    id: 3,
    name: "Harbor Industrial Park",
    type: "Industrial",
    address: "789 Port Blvd, Houston, TX",
    sqft: 450000,
    units: 8,
    occupancy: 100,
    noi: 4100000,
    capRate: 6.8,
    value: 60294118,
    acquired: "Sep 2022",
    status: "stabilized",
    image: "🏭"
  },
  {
    id: 4,
    name: "Westgate Retail Center",
    type: "Retail",
    address: "321 Main St, San Antonio, TX",
    sqft: 125000,
    units: 24,
    occupancy: 88,
    noi: 1650000,
    capRate: 7.2,
    value: 22916667,
    acquired: "Jan 2023",
    status: "lease-up",
    image: "🏬"
  },
  {
    id: 5,
    name: "Tech Campus Phase 1",
    type: "Office",
    address: "555 Innovation Way, Austin, TX",
    sqft: 320000,
    units: 6,
    occupancy: 82,
    noi: 4800000,
    capRate: 5.5,
    value: 87272727,
    acquired: "Dec 2021",
    status: "stabilized",
    image: "🏢"
  },
  {
    id: 6,
    name: "Lakeside Medical Plaza",
    type: "Medical Office",
    address: "888 Health Pkwy, Plano, TX",
    sqft: 95000,
    units: 15,
    occupancy: 100,
    noi: 1900000,
    capRate: 6.0,
    value: 31666667,
    acquired: "Feb 2022",
    status: "stabilized",
    image: "🏥"
  },
];

const tenants = [
  { id: 1, name: "TechCorp Inc.", property: "Riverside Office Tower", sqft: 45000, rent: 52, lease_end: "Dec 2026", status: "current" },
  { id: 2, name: "Global Finance LLC", property: "Riverside Office Tower", sqft: 32000, rent: 48, lease_end: "Mar 2025", status: "expiring" },
  { id: 3, name: "Healthcare Partners", property: "Lakeside Medical Plaza", sqft: 28000, rent: 42, lease_end: "Jun 2027", status: "current" },
  { id: 4, name: "Amazon Distribution", property: "Harbor Industrial Park", sqft: 180000, rent: 12, lease_end: "Sep 2028", status: "current" },
  { id: 5, name: "Retail Brand Co.", property: "Westgate Retail Center", sqft: 15000, rent: 38, lease_end: "Jan 2024", status: "expiring" },
];

export default function VALORAPropertiesPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filteredProperties = selectedType === "all"
    ? properties
    : properties.filter(p => p.type.toLowerCase().includes(selectedType.toLowerCase()));

  const totalValue = properties.reduce((sum, p) => sum + p.value, 0);
  const totalSqft = properties.reduce((sum, p) => sum + p.sqft, 0);
  const totalNOI = properties.reduce((sum, p) => sum + p.noi, 0);
  const avgOccupancy = Math.round(properties.reduce((sum, p) => sum + p.occupancy, 0) / properties.length);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <main className="valora-page val-properties-page">
      <Header />

      {/* Page Header */}
      <section className="val-page-header">
        <div className="container">
          <div className="val-page-header-content">
            <div>
              <div className="val-breadcrumb">
                <Link href="/valora">VALORA</Link>
                <span>/</span>
                <Link href="/valora/dashboard">Dashboard</Link>
                <span>/</span>
                <span>Properties</span>
              </div>
              <h1>Property Portfolio</h1>
              <p>Manage and analyze your real estate holdings</p>
            </div>
            <div className="val-page-actions">
              <button className="val-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Export
              </button>
              <button className="val-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="val-portfolio-stats">
        <div className="container">
          <div className="val-stats-grid">
            <div className="val-stat-card">
              <span className="val-stat-label">Total Portfolio Value</span>
              <span className="val-stat-value">{formatCurrency(totalValue)}</span>
              <span className="val-stat-change positive">+12.4% YoY</span>
            </div>
            <div className="val-stat-card">
              <span className="val-stat-label">Total Square Feet</span>
              <span className="val-stat-value">{(totalSqft / 1000).toFixed(0)}K SF</span>
              <span className="val-stat-sub">Across {properties.length} properties</span>
            </div>
            <div className="val-stat-card">
              <span className="val-stat-label">Annual NOI</span>
              <span className="val-stat-value">{formatCurrency(totalNOI)}</span>
              <span className="val-stat-change positive">+8.2% YoY</span>
            </div>
            <div className="val-stat-card">
              <span className="val-stat-label">Avg Occupancy</span>
              <span className="val-stat-value">{avgOccupancy}%</span>
              <span className="val-stat-sub">Portfolio-wide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="val-filters-section">
        <div className="container">
          <div className="val-filters-bar">
            <div className="val-type-filters">
              {["all", "office", "multifamily", "industrial", "retail", "medical"].map((type) => (
                <button
                  key={type}
                  className={`val-filter-btn ${selectedType === type ? "active" : ""}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <div className="val-view-toggle">
              <button
                className={`val-view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                className={`val-view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid/Table */}
      <section className="val-properties-section">
        <div className="container">
          {viewMode === "grid" ? (
            <div className="val-properties-grid">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="val-property-card"
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="val-property-image">
                    <span>{property.image}</span>
                    <span className={`val-property-status ${property.status}`}>
                      {property.status === "stabilized" ? "Stabilized" : "Lease-Up"}
                    </span>
                  </div>
                  <div className="val-property-content">
                    <h3>{property.name}</h3>
                    <p className="val-property-address">{property.address}</p>
                    <div className="val-property-type-badge">{property.type}</div>
                    <div className="val-property-metrics">
                      <div className="val-metric">
                        <span className="val-metric-value">{formatCurrency(property.value)}</span>
                        <span className="val-metric-label">Value</span>
                      </div>
                      <div className="val-metric">
                        <span className="val-metric-value">{property.occupancy}%</span>
                        <span className="val-metric-label">Occupied</span>
                      </div>
                      <div className="val-metric">
                        <span className="val-metric-value">{property.capRate}%</span>
                        <span className="val-metric-label">Cap Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="val-properties-table">
              <div className="val-table-header">
                <span>Property</span>
                <span>Type</span>
                <span>Sq Ft</span>
                <span>Occupancy</span>
                <span>NOI</span>
                <span>Cap Rate</span>
                <span>Value</span>
              </div>
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="val-table-row"
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="val-table-property">
                    <span className="val-table-icon">{property.image}</span>
                    <div>
                      <span className="val-table-name">{property.name}</span>
                      <span className="val-table-address">{property.address}</span>
                    </div>
                  </div>
                  <span className="val-table-type">{property.type}</span>
                  <span>{(property.sqft / 1000).toFixed(0)}K</span>
                  <span className={property.occupancy >= 95 ? "positive" : property.occupancy >= 85 ? "" : "warning"}>
                    {property.occupancy}%
                  </span>
                  <span>{formatCurrency(property.noi)}</span>
                  <span>{property.capRate}%</span>
                  <span className="val-table-value">{formatCurrency(property.value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tenant Overview */}
      <section className="val-tenants-section">
        <div className="container">
          <div className="val-section-card">
            <div className="val-section-header">
              <h2>Top Tenants</h2>
              <Link href="/valora/tenants" className="val-link">View All Tenants</Link>
            </div>
            <div className="val-tenants-table">
              <div className="val-tenants-header">
                <span>Tenant</span>
                <span>Property</span>
                <span>Sq Ft</span>
                <span>Rent/SF</span>
                <span>Lease End</span>
                <span>Status</span>
              </div>
              {tenants.map((tenant) => (
                <div key={tenant.id} className="val-tenant-row">
                  <span className="val-tenant-name">{tenant.name}</span>
                  <span className="val-tenant-property">{tenant.property}</span>
                  <span>{(tenant.sqft / 1000).toFixed(0)}K</span>
                  <span>${tenant.rent}</span>
                  <span>{tenant.lease_end}</span>
                  <span className={`val-tenant-status ${tenant.status}`}>
                    {tenant.status === "current" ? "Current" : "Expiring Soon"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="val-modal-overlay" onClick={() => setSelectedProperty(null)}>
          <div className="val-modal" onClick={(e) => e.stopPropagation()}>
            <button className="val-modal-close" onClick={() => setSelectedProperty(null)}>×</button>
            <div className="val-modal-header">
              <span className="val-modal-icon">{selectedProperty.image}</span>
              <div>
                <h2>{selectedProperty.name}</h2>
                <p>{selectedProperty.address}</p>
              </div>
            </div>
            <div className="val-modal-stats">
              <div className="val-modal-stat">
                <span className="val-modal-stat-value">{formatCurrency(selectedProperty.value)}</span>
                <span className="val-modal-stat-label">Current Value</span>
              </div>
              <div className="val-modal-stat">
                <span className="val-modal-stat-value">{formatCurrency(selectedProperty.noi)}</span>
                <span className="val-modal-stat-label">Annual NOI</span>
              </div>
              <div className="val-modal-stat">
                <span className="val-modal-stat-value">{selectedProperty.capRate}%</span>
                <span className="val-modal-stat-label">Cap Rate</span>
              </div>
              <div className="val-modal-stat">
                <span className="val-modal-stat-value">{selectedProperty.occupancy}%</span>
                <span className="val-modal-stat-label">Occupancy</span>
              </div>
            </div>
            <div className="val-modal-details">
              <div className="val-modal-detail">
                <span className="val-modal-detail-label">Property Type</span>
                <span className="val-modal-detail-value">{selectedProperty.type}</span>
              </div>
              <div className="val-modal-detail">
                <span className="val-modal-detail-label">Square Feet</span>
                <span className="val-modal-detail-value">{selectedProperty.sqft.toLocaleString()} SF</span>
              </div>
              <div className="val-modal-detail">
                <span className="val-modal-detail-label">Units/Suites</span>
                <span className="val-modal-detail-value">{selectedProperty.units}</span>
              </div>
              <div className="val-modal-detail">
                <span className="val-modal-detail-label">Acquired</span>
                <span className="val-modal-detail-value">{selectedProperty.acquired}</span>
              </div>
            </div>
            <div className="val-modal-actions">
              <button className="val-btn secondary">Run Valuation</button>
              <button className="val-btn secondary">View Comps</button>
              <button className="val-btn primary">Edit Property</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
