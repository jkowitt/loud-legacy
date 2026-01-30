"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sample marketplace listings
const SAMPLE_LISTINGS = [
  {
    id: "1",
    address: "425 Oak Valley Drive",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    propertyType: "Multifamily",
    propertyIcon: "🏢",
    askingPrice: 2450000,
    estimatedValue: 2380000,
    units: 12,
    sqft: 9600,
    yearBuilt: 1998,
    capRate: 6.2,
    noi: 151900,
    occupancy: 92,
    daysOnMarket: 14,
    seller: "Private Owner",
    images: ["/placeholder-property.jpg"],
    highlights: ["Value-Add Opportunity", "Below Market Rents", "Strong Location"],
  },
  {
    id: "2",
    address: "1200 Commerce Street",
    city: "Dallas",
    state: "TX",
    zipCode: "75201",
    propertyType: "Office",
    propertyIcon: "🏛️",
    askingPrice: 5800000,
    estimatedValue: 5650000,
    units: 1,
    sqft: 28000,
    yearBuilt: 2005,
    capRate: 7.1,
    noi: 411800,
    occupancy: 88,
    daysOnMarket: 28,
    seller: "Investment Group",
    images: ["/placeholder-property.jpg"],
    highlights: ["Class A Building", "Parking Included", "Recent Renovations"],
  },
  {
    id: "3",
    address: "890 Industrial Parkway",
    city: "Houston",
    state: "TX",
    zipCode: "77001",
    propertyType: "Industrial",
    propertyIcon: "🏭",
    askingPrice: 3200000,
    estimatedValue: 3150000,
    units: 1,
    sqft: 45000,
    yearBuilt: 2010,
    capRate: 7.8,
    noi: 249600,
    occupancy: 100,
    daysOnMarket: 7,
    seller: "Private Owner",
    images: ["/placeholder-property.jpg"],
    highlights: ["NNN Lease", "5 Years Remaining", "Credit Tenant"],
  },
  {
    id: "4",
    address: "567 Retail Plaza",
    city: "San Antonio",
    state: "TX",
    zipCode: "78201",
    propertyType: "Retail",
    propertyIcon: "🛒",
    askingPrice: 1850000,
    estimatedValue: 1900000,
    units: 6,
    sqft: 12000,
    yearBuilt: 2001,
    capRate: 6.5,
    noi: 120250,
    occupancy: 83,
    daysOnMarket: 45,
    seller: "Trust",
    images: ["/placeholder-property.jpg"],
    highlights: ["High Traffic Location", "National Tenants", "Price Reduced"],
  },
  {
    id: "5",
    address: "234 Sunrise Apartments",
    city: "Fort Worth",
    state: "TX",
    zipCode: "76101",
    propertyType: "Multifamily",
    propertyIcon: "🏢",
    askingPrice: 4100000,
    estimatedValue: 4250000,
    units: 24,
    sqft: 19200,
    yearBuilt: 1985,
    capRate: 5.9,
    noi: 241900,
    occupancy: 96,
    daysOnMarket: 3,
    seller: "Private Owner",
    images: ["/placeholder-property.jpg"],
    highlights: ["Fully Renovated", "Stabilized Asset", "New Listing"],
  },
];

const PROPERTY_TYPES = [
  { id: "all", name: "All Types" },
  { id: "multifamily", name: "Multifamily" },
  { id: "office", name: "Office" },
  { id: "industrial", name: "Industrial" },
  { id: "retail", name: "Retail" },
  { id: "mixed-use", name: "Mixed Use" },
];

export default function MarketplacePage() {
  const [listings] = useState(SAMPLE_LISTINGS);
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [capRateRange, setCapRateRange] = useState({ min: "", max: "" });
  const [selectedListing, setSelectedListing] = useState<typeof SAMPLE_LISTINGS[0] | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });

  // Filter listings
  const filteredListings = listings.filter(listing => {
    if (selectedType !== "all" && listing.propertyType.toLowerCase() !== selectedType) return false;
    if (priceRange.min && listing.askingPrice < parseFloat(priceRange.min)) return false;
    if (priceRange.max && listing.askingPrice > parseFloat(priceRange.max)) return false;
    if (capRateRange.min && listing.capRate < parseFloat(capRateRange.min)) return false;
    if (capRateRange.max && listing.capRate > parseFloat(capRateRange.max)) return false;
    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "newest": return a.daysOnMarket - b.daysOnMarket;
      case "oldest": return b.daysOnMarket - a.daysOnMarket;
      case "price-low": return a.askingPrice - b.askingPrice;
      case "price-high": return b.askingPrice - a.askingPrice;
      case "cap-high": return b.capRate - a.capRate;
      case "cap-low": return a.capRate - b.capRate;
      default: return 0;
    }
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Inquiry sent for ${selectedListing?.address}! A representative will contact you shortly.`);
    setShowContactModal(false);
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="valora-dashboard-page">
      <Header />

      {/* Page Header */}
      <section className="val-dash-header">
        <div className="container">
          <div className="val-dash-header-content">
            <div>
              <div className="val-breadcrumb">
                <Link href="/valora">Legacy RE</Link>
                <span>/</span>
                <span>Marketplace</span>
              </div>
              <h1>Property Marketplace</h1>
              <p>Browse investment properties listed for sale by verified sellers</p>
            </div>
            <div className="val-dash-actions">
              <Link href="/valora/dashboard" className="val-dash-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                My Valuations
              </Link>
              <button className="val-dash-btn primary" onClick={() => setShowFilters(!showFilters)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <div className="val-marketplace-main">
        <div className="container">
          {/* Stats Bar */}
          <div className="val-mkt-stats">
            <div className="val-mkt-stat">
              <span className="stat-value">{listings.length}</span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="val-mkt-stat">
              <span className="stat-value">{formatCurrency(listings.reduce((sum, l) => sum + l.askingPrice, 0) / listings.length)}</span>
              <span className="stat-label">Avg. Price</span>
            </div>
            <div className="val-mkt-stat">
              <span className="stat-value">{(listings.reduce((sum, l) => sum + l.capRate, 0) / listings.length).toFixed(1)}%</span>
              <span className="stat-label">Avg. Cap Rate</span>
            </div>
            <div className="val-mkt-stat">
              <span className="stat-value">{listings.filter(l => l.daysOnMarket <= 7).length}</span>
              <span className="stat-label">New This Week</span>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="val-mkt-filters">
              <div className="val-mkt-filter-group">
                <label>Price Range</label>
                <div className="val-mkt-filter-row">
                  <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} />
                  <span>to</span>
                  <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} />
                </div>
              </div>
              <div className="val-mkt-filter-group">
                <label>Cap Rate (%)</label>
                <div className="val-mkt-filter-row">
                  <input type="number" placeholder="Min" value={capRateRange.min} onChange={(e) => setCapRateRange({ ...capRateRange, min: e.target.value })} />
                  <span>to</span>
                  <input type="number" placeholder="Max" value={capRateRange.max} onChange={(e) => setCapRateRange({ ...capRateRange, max: e.target.value })} />
                </div>
              </div>
              <button className="val-mkt-clear-btn" onClick={() => { setPriceRange({ min: "", max: "" }); setCapRateRange({ min: "", max: "" }); }}>
                Clear Filters
              </button>
            </div>
          )}

          {/* Controls */}
          <div className="val-mkt-controls">
            <div className="val-mkt-type-filters">
              {PROPERTY_TYPES.map(type => (
                <button key={type.id} className={`val-mkt-type-btn ${selectedType === type.id ? "active" : ""}`} onClick={() => setSelectedType(type.id)}>
                  {type.name}
                </button>
              ))}
            </div>
            <div className="val-mkt-sort">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="cap-high">Cap Rate: High to Low</option>
                <option value="cap-low">Cap Rate: Low to High</option>
              </select>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="val-mkt-grid">
            {sortedListings.map(listing => (
              <div key={listing.id} className="val-mkt-card" onClick={() => setSelectedListing(listing)}>
                <div className="val-mkt-card-image">
                  <div className="val-mkt-card-placeholder">
                    <span className="property-icon">{listing.propertyIcon}</span>
                  </div>
                  {listing.daysOnMarket <= 7 && <span className="val-mkt-new-badge">New</span>}
                  <span className="val-mkt-type-badge">{listing.propertyType}</span>
                </div>
                <div className="val-mkt-card-content">
                  <div className="val-mkt-card-header">
                    <h3>{listing.address}</h3>
                    <p>{listing.city}, {listing.state} {listing.zipCode}</p>
                  </div>
                  <div className="val-mkt-card-price">
                    <span className="asking">{formatCurrency(listing.askingPrice)}</span>
                    <span className="estimate">Est. Value: {formatCurrency(listing.estimatedValue)}</span>
                  </div>
                  <div className="val-mkt-card-metrics">
                    <div className="metric"><span className="label">Cap Rate</span><span className="value">{listing.capRate}%</span></div>
                    <div className="metric"><span className="label">NOI</span><span className="value">{formatCurrency(listing.noi)}</span></div>
                    <div className="metric"><span className="label">Units</span><span className="value">{listing.units}</span></div>
                    <div className="metric"><span className="label">Sq Ft</span><span className="value">{listing.sqft.toLocaleString()}</span></div>
                  </div>
                  <div className="val-mkt-card-highlights">
                    {listing.highlights.slice(0, 2).map((h, i) => <span key={i}>{h}</span>)}
                  </div>
                  <div className="val-mkt-card-footer">
                    <span className="days">{listing.daysOnMarket} days on market</span>
                    <button className="val-mkt-view-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedListings.length === 0 && (
            <div className="val-mkt-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
              <h3>No Listings Found</h3>
              <p>Adjust your filters to see more properties</p>
            </div>
          )}
        </div>
      </div>

      {/* Listing Detail Modal */}
      {selectedListing && (
        <div className="val-modal-overlay" onClick={() => setSelectedListing(null)}>
          <div className="val-mkt-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="val-modal-header">
              <h3>{selectedListing.address}</h3>
              <button onClick={() => setSelectedListing(null)}>×</button>
            </div>
            <div className="val-mkt-detail-content">
              <div className="val-mkt-detail-image">
                <div className="val-mkt-card-placeholder large">
                  <span className="property-icon">{selectedListing.propertyIcon}</span>
                </div>
              </div>
              <div className="val-mkt-detail-info">
                <p className="location">{selectedListing.city}, {selectedListing.state} {selectedListing.zipCode}</p>
                <div className="val-mkt-detail-price">
                  <div className="price-main">
                    <span className="label">Asking Price</span>
                    <span className="value">{formatCurrency(selectedListing.askingPrice)}</span>
                  </div>
                  <div className="price-estimate">
                    <span className="label">Legacy RE Estimate</span>
                    <span className="value">{formatCurrency(selectedListing.estimatedValue)}</span>
                  </div>
                </div>
                <div className="val-mkt-detail-metrics">
                  <div className="metric"><span>Property Type</span><span>{selectedListing.propertyType}</span></div>
                  <div className="metric"><span>Cap Rate</span><span>{selectedListing.capRate}%</span></div>
                  <div className="metric"><span>NOI</span><span>{formatCurrency(selectedListing.noi)}</span></div>
                  <div className="metric"><span>Units</span><span>{selectedListing.units}</span></div>
                  <div className="metric"><span>Square Feet</span><span>{selectedListing.sqft.toLocaleString()}</span></div>
                  <div className="metric"><span>Year Built</span><span>{selectedListing.yearBuilt}</span></div>
                  <div className="metric"><span>Occupancy</span><span>{selectedListing.occupancy}%</span></div>
                  <div className="metric"><span>Seller</span><span>{selectedListing.seller}</span></div>
                </div>
                <div className="val-mkt-detail-highlights">
                  <h4>Highlights</h4>
                  <ul>
                    {selectedListing.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
                <div className="val-mkt-detail-actions">
                  <button className="val-mkt-contact-btn" onClick={() => setShowContactModal(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Contact Seller
                  </button>
                  <Link href="/valora/dashboard" className="val-mkt-analyze-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Run Full Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedListing && (
        <div className="val-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="val-modal" onClick={(e) => e.stopPropagation()}>
            <div className="val-modal-header">
              <h3>Contact Seller</h3>
              <button onClick={() => setShowContactModal(false)}>×</button>
            </div>
            <div className="val-modal-content">
              <p>Send an inquiry about <strong>{selectedListing.address}</strong></p>
              <form onSubmit={handleContactSubmit} className="val-mkt-contact-form">
                <div className="form-row">
                  <label>Your Name</label>
                  <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
                </div>
                <div className="form-row">
                  <label>Email</label>
                  <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                </div>
                <div className="form-row">
                  <label>Phone</label>
                  <input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
                </div>
                <div className="form-row">
                  <label>Message</label>
                  <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={4} placeholder="I'm interested in this property..."></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel" onClick={() => setShowContactModal(false)}>Cancel</button>
                  <button type="submit" className="submit">Send Inquiry</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
