"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PlatformAccess {
  platform: string;
  enabled: boolean;
}

const PLATFORMS = [
  {
    id: 'VALORA',
    name: 'VALORA',
    description: 'Real Estate Valuation & Analysis',
    icon: '🏢',
    url: 'http://localhost:3007',
    color: '#4299e1',
    features: ['Property Valuation', 'AI Image Analysis', 'Market Data'],
  },
  {
    id: 'BUSINESS_NOW',
    name: 'Business Now',
    description: 'Business Management & Planning',
    icon: '📊',
    url: 'http://localhost:3001',
    color: '#48bb78',
    features: ['Project Management', 'Task Tracking', 'Business Plans'],
  },
  {
    id: 'LEGACY_CRM',
    name: 'Legacy CRM',
    description: 'Customer Relationship Management',
    icon: '👥',
    url: 'http://localhost:3002',
    color: '#ed8936',
    features: ['Sales Pipeline', 'Lead Management', 'Deal Tracking'],
  },
  {
    id: 'VENUEVR',
    name: 'VenueVR',
    description: 'VR Venue Tours & Events',
    icon: '🎭',
    url: 'http://localhost:3004',
    color: '#9f7aea',
    features: ['360° Tours', 'Event Planning', 'Virtual Experiences'],
  },
];

export default function HubDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [platformAccess, setPlatformAccess] = useState<PlatformAccess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchPlatformAccess();
    }
  }, [session]);

  const fetchPlatformAccess = async () => {
    try {
      const res = await fetch("/api/platform-access");
      if (res.ok) {
        const data = await res.json();
        setPlatformAccess(data.platformAccess);
      }
    } catch (error) {
      console.error("Failed to fetch platform access:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const accessiblePlatforms = PLATFORMS.filter(platform =>
    platformAccess.some(access => access.platform === platform.id && access.enabled)
  );

  const user = session.user as any;

  return (
    <div style={{ minHeight: "100vh", background: "#f7fafc" }}>
      {/* Header */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "1rem 2rem",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>🏠 LOUD Legacy Hub</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "#666", fontSize: "0.875rem" }}>{user?.name || user?.email}</span>
            <a
              href="/api/auth/signout"
              style={{
                padding: "0.5rem 1rem",
                background: "#f7fafc",
                color: "#4a5568",
                textDecoration: "none",
                borderRadius: "6px",
                fontSize: "0.875rem",
                border: "1px solid #e2e8f0",
              }}
            >
              Sign Out
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ margin: "0 0 0.5rem", fontSize: "2rem", fontWeight: "700" }}>
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h2>
          <p style={{ margin: 0, color: "#666", fontSize: "1.125rem" }}>
            Choose a platform to get started
          </p>
        </div>

        {/* Platform Cards */}
        {accessiblePlatforms.length === 0 ? (
          <div style={{
            padding: "3rem",
            background: "white",
            borderRadius: "12px",
            border: "2px dashed #cbd5e0",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "1rem" }}>
              No platforms accessible. Contact your administrator to grant access.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}>
            {accessiblePlatforms.map((platform) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "2rem",
                  background: "white",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = platform.color;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  {platform.icon}
                </div>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem", fontWeight: "700" }}>
                  {platform.name}
                </h3>
                <p style={{ margin: "0 0 1.5rem", color: "#666", fontSize: "0.875rem" }}>
                  {platform.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {platform.features.map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "0.75rem",
                        color: "#4a5568",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: platform.color }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem",
                    background: platform.color,
                    color: "white",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Open Platform →
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div style={{ marginTop: "3rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
            Your Access
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "#4299e1" }}>
                {accessiblePlatforms.length}
              </div>
              <div style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.875rem" }}>
                Platforms Accessible
              </div>
            </div>
            <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "#48bb78" }}>
                {user?.role || 'USER'}
              </div>
              <div style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.875rem" }}>
                Account Role
              </div>
            </div>
            <div style={{ padding: "1.5rem", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ed8936" }}>
                ∞
              </div>
              <div style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.875rem" }}>
                Storage Available
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ marginTop: "3rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
            Quick Links
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            <Link
              href="/dashboard/account"
              style={{
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                textDecoration: "none",
                color: "inherit",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚙️</div>
              <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Account Settings</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>Manage your profile</div>
            </Link>
            <Link
              href="/dashboard/billing"
              style={{
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                textDecoration: "none",
                color: "inherit",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💳</div>
              <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Billing</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>Manage subscriptions</div>
            </Link>
            <Link
              href="/dashboard/support"
              style={{
                padding: "1.5rem",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                textDecoration: "none",
                color: "inherit",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💬</div>
              <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Support</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>Get help</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
