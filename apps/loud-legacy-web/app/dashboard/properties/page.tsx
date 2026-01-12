"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        setProperties(data.properties || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Properties</h1>
          <p>Manage your real estate property portfolio</p>
        </div>
        <button className="button button--primary">
          ➕ Add Property
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div>Loading properties...</div>
        </div>
      ) : properties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏢</div>
          <h2>No properties yet</h2>
          <p>Add your first property to start tracking and valuation</p>
          <button className="button button--primary">
            Add First Property
          </button>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                {property.images?.[0] ? (
                  <img src={property.images[0].url} alt={property.address} />
                ) : (
                  <div className="property-placeholder">🏢</div>
                )}
              </div>
              <div className="property-content">
                <h3>{property.address}</h3>
                <p className="property-location">
                  {property.city}, {property.state} {property.zip}
                </p>
                <div className="property-meta">
                  <span className="property-type">{property.propertyType}</span>
                  {property.squareFeet && (
                    <span>{property.squareFeet.toLocaleString()} sq ft</span>
                  )}
                  {property.units && (
                    <span>{property.units} units</span>
                  )}
                </div>
                {property.aiConditionScore && (
                  <div className="property-ai-score">
                    <span>AI Condition Score:</span>
                    <span className="score">{property.aiConditionScore}/100</span>
                  </div>
                )}
                <div className="property-actions">
                  <Link href={`/dashboard/properties/${property.id}`} className="button button--secondary">
                    View Details
                  </Link>
                  <button className="button button--primary">
                    Create Valuation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
