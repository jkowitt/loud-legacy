"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalValuations: 0,
    totalProperties: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch valuations count
        const valuationsRes = await fetch('/api/valuations?limit=1');
        const valuationsData = await valuationsRes.json();

        // Fetch properties count
        const propertiesRes = await fetch('/api/properties?limit=1');
        const propertiesData = await propertiesRes.json();

        setStats({
          totalValuations: valuationsData.pagination?.total || 0,
          totalProperties: propertiesData.pagination?.total || 0,
          recentActivity: [],
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}!</h1>
          <p>Here's what's happening with your real estate portfolio</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Total Valuations</div>
            <div className="stat-value">
              {loading ? '...' : stats.totalValuations}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-label">Properties</div>
            <div className="stat-value">
              {loading ? '...' : stats.totalProperties}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🤖</div>
          <div className="stat-content">
            <div className="stat-label">AI Analysis</div>
            <div className="stat-value">Ready</div>
          </div>
        </div>
      </div>

      <div className="dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link href="/dashboard/valuations?action=new" className="action-card">
            <span className="action-icon">➕</span>
            <div>
              <h3>New Valuation</h3>
              <p>Create a new property valuation</p>
            </div>
          </Link>

          <Link href="/dashboard/properties?action=new" className="action-card">
            <span className="action-icon">🏢</span>
            <div>
              <h3>Add Property</h3>
              <p>Add a new property to track</p>
            </div>
          </Link>

          <Link href="/dashboard/ai-tools" className="action-card">
            <span className="action-icon">📸</span>
            <div>
              <h3>Analyze Image</h3>
              <p>Use AI to analyze property photos</p>
            </div>
          </Link>

          <Link href="/dashboard/valuations" className="action-card">
            <span className="action-icon">📊</span>
            <div>
              <h3>View Reports</h3>
              <p>See all your valuations and reports</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="dashboard-getting-started">
        <h2>Getting Started with VALORA</h2>
        <div className="getting-started-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Add Your First Property</h3>
              <p>Start by adding a property you want to analyze</p>
              <Link href="/dashboard/properties?action=new">Add Property →</Link>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Create a Valuation</h3>
              <p>Build comprehensive financial models with P&L analysis</p>
              <Link href="/dashboard/valuations?action=new">Start Valuation →</Link>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Use AI Features</h3>
              <p>Analyze property images and get AI-powered recommendations</p>
              <Link href="/dashboard/ai-tools">Try AI Tools →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
