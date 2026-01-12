"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ValuationsPage() {
  const [valuations, setValuations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchValuations() {
      try {
        const response = await fetch('/api/valuations');
        const data = await response.json();
        setValuations(data.valuations || []);
      } catch (error) {
        console.error('Error fetching valuations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchValuations();
  }, []);

  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Valuations</h1>
          <p>Manage your property valuations and financial models</p>
        </div>
        <button className="button button--primary">
          ➕ New Valuation
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div>Loading valuations...</div>
        </div>
      ) : valuations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💰</div>
          <h2>No valuations yet</h2>
          <p>Create your first valuation to start analyzing properties</p>
          <button className="button button--primary">
            Create First Valuation
          </button>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Property</th>
                <th>Purchase Price</th>
                <th>NOI</th>
                <th>Cap Rate</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {valuations.map((valuation) => (
                <tr key={valuation.id}>
                  <td>
                    <Link href={`/dashboard/valuations/${valuation.id}`}>
                      {valuation.name}
                    </Link>
                  </td>
                  <td>{valuation.property?.address || '-'}</td>
                  <td>{formatCurrency(valuation.purchasePrice)}</td>
                  <td>{formatCurrency(valuation.noi)}</td>
                  <td>
                    {valuation.capRate ? `${valuation.capRate.toFixed(2)}%` : '-'}
                  </td>
                  <td>
                    <span className={`status-badge status-${valuation.status.toLowerCase()}`}>
                      {valuation.status}
                    </span>
                  </td>
                  <td>{formatDate(valuation.updatedAt)}</td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/dashboard/valuations/${valuation.id}`}>
                        View
                      </Link>
                      <button>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
