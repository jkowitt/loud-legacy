"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const session: any = null;
  const router = useRouter();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');

  const userRole = (session?.user as any)?.role;

  useEffect(() => {
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      router.push('/dashboard');
      return;
    }

    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/admin/analytics?period=30');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [userRole, router]);

  if (!session || (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN')) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Platform management and analytics</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button
          className={`tab ${activeTab === 'cms' ? 'active' : ''}`}
          onClick={() => setActiveTab('cms')}
        >
          ✏️ CMS
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
      </div>

      {activeTab === 'analytics' && (
        <div className="admin-content">
          {loading ? (
            <div className="loading-state">Loading analytics...</div>
          ) : analytics ? (
            <>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <div className="stat-label">Total Users</div>
                    <div className="stat-value">{analytics.overview.totalUsers}</div>
                    <div className="stat-change">
                      +{analytics.overview.newUsersInPeriod} this month
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-content">
                    <div className="stat-label">Total Valuations</div>
                    <div className="stat-value">{analytics.overview.totalValuations}</div>
                    <div className="stat-change">
                      +{analytics.overview.valuationsInPeriod} this month
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🏢</div>
                  <div className="stat-content">
                    <div className="stat-label">Total Properties</div>
                    <div className="stat-value">{analytics.overview.totalProperties}</div>
                    <div className="stat-change">
                      +{analytics.overview.propertiesInPeriod} this month
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <div className="stat-label">Active Users</div>
                    <div className="stat-value">{analytics.overview.activeUsers}</div>
                    <div className="stat-change">Last 30 days</div>
                  </div>
                </div>
              </div>

              {analytics.topUsers && analytics.topUsers.length > 0 && (
                <div className="admin-section">
                  <h2>Most Active Users</h2>
                  <div className="data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.topUsers.slice(0, 10).map((userActivity: any) => (
                          <tr key={userActivity.userId}>
                            <td>{userActivity.user?.name || 'Unknown'}</td>
                            <td>{userActivity.user?.email || '-'}</td>
                            <td>
                              <span className="role-badge">
                                {userActivity.user?.role || '-'}
                              </span>
                            </td>
                            <td>{userActivity._count.id} actions</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {analytics.popularActions && analytics.popularActions.length > 0 && (
                <div className="admin-section">
                  <h2>Popular Actions</h2>
                  <div className="actions-list">
                    {analytics.popularActions.slice(0, 10).map((action: any) => (
                      <div key={action.action} className="action-item">
                        <span className="action-name">{action.action}</span>
                        <span className="action-count">{action.count} times</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>Failed to load analytics</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'cms' && (
        <div className="admin-content">
          <div className="admin-section">
            <h2>Content Management System</h2>
            <p>Edit site content directly without code changes</p>
            <button className="button button--primary">
              Add New Content
            </button>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="admin-content">
          <div className="admin-section">
            <h2>User Management</h2>
            <p>Manage users, roles, and permissions</p>
            <button className="button button--primary">
              Add New User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
