"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  status: string;
  score: number | null;
  createdAt: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  currency: string;
  stage: string;
  probability: number | null;
  expectedCloseDate: string | null;
  lead: Lead | null;
}

export default function LegacyCRMDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const [leadsRes, dealsRes] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/deals"),
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads);
      }

      if (dealsRes.ok) {
        const dealsData = await dealsRes.json();
        setDeals(dealsData.deals);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
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

  // Calculate stats
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const qualifiedLeads = leads.filter(l => l.status === 'QUALIFIED').length;
  const activeDeals = deals.filter(d => !['CLOSED_WON', 'CLOSED_LOST'].includes(d.stage));
  const totalPipeline = activeDeals.reduce((sum, d) => sum + d.value, 0);
  const wonDeals = deals.filter(d => d.stage === 'CLOSED_WON').length;

  // Group deals by stage
  const dealsByStage = {
    PROSPECTING: deals.filter(d => d.stage === 'PROSPECTING'),
    QUALIFICATION: deals.filter(d => d.stage === 'QUALIFICATION'),
    PROPOSAL: deals.filter(d => d.stage === 'PROPOSAL'),
    NEGOTIATION: deals.filter(d => d.stage === 'NEGOTIATION'),
    CLOSED_WON: deals.filter(d => d.stage === 'CLOSED_WON'),
    CLOSED_LOST: deals.filter(d => d.stage === 'CLOSED_LOST'),
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "700" }}>Legacy CRM</h1>
          <p style={{ margin: "0.5rem 0", color: "#666" }}>
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link
            href="/dashboard/leads/new"
            style={{
              padding: "0.75rem 1.5rem",
              background: "#4299e1",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            + New Lead
          </Link>
          <Link
            href="/dashboard/deals/new"
            style={{
              padding: "0.75rem 1.5rem",
              background: "#48bb78",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            + New Deal
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#4299e1" }}>{leads.length}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Total Leads</div>
          <div style={{ fontSize: "0.875rem", color: "#48bb78", marginTop: "0.5rem" }}>{newLeads} new</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#48bb78" }}>{activeDeals.length}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Active Deals</div>
          <div style={{ fontSize: "0.875rem", color: "#4299e1", marginTop: "0.5rem" }}>${(totalPipeline / 1000).toFixed(0)}k pipeline</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ed8936" }}>{qualifiedLeads}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Qualified Leads</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#f7fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#9f7aea" }}>{wonDeals}</div>
          <div style={{ color: "#666", marginTop: "0.25rem" }}>Closed Won</div>
        </div>
      </div>

      {/* Sales Pipeline */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Sales Pipeline</h2>
        <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem" }}>
          {Object.entries(dealsByStage).map(([stage, stageDeals]) => {
            if (stage === 'CLOSED_WON' || stage === 'CLOSED_LOST') return null;

            const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div
                key={stage}
                style={{
                  minWidth: "250px",
                  padding: "1rem",
                  background: "#f7fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ fontWeight: "600", fontSize: "1rem" }}>
                    {stage.replace('_', ' ')}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.25rem" }}>
                    {stageDeals.length} deals • ${(stageValue / 1000).toFixed(0)}k
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {stageDeals.slice(0, 3).map((deal) => (
                    <Link
                      key={deal.id}
                      href={`/dashboard/deals/${deal.id}`}
                      style={{
                        padding: "0.75rem",
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        textDecoration: "none",
                        color: "inherit",
                        fontSize: "0.875rem",
                      }}
                    >
                      <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{deal.title}</div>
                      <div style={{ color: "#666" }}>${(deal.value / 1000).toFixed(1)}k</div>
                      {deal.probability && (
                        <div style={{ fontSize: "0.75rem", color: "#4299e1", marginTop: "0.25rem" }}>
                          {deal.probability}% probability
                        </div>
                      )}
                    </Link>
                  ))}
                  {stageDeals.length > 3 && (
                    <div style={{ padding: "0.5rem", textAlign: "center", fontSize: "0.75rem", color: "#666" }}>
                      +{stageDeals.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Leads */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Recent Leads</h2>

        {leads.length === 0 ? (
          <div style={{
            padding: "3rem",
            textAlign: "center",
            background: "#f7fafc",
            borderRadius: "8px",
            border: "2px dashed #cbd5e0",
          }}>
            <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "1rem" }}>
              No leads yet. Add your first lead to start building your pipeline!
            </p>
            <Link
              href="/dashboard/leads/new"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "#4299e1",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "500",
              }}
            >
              Add First Lead
            </Link>
          </div>
        ) : (
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f7fafc" }}>
                <tr>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem" }}>Name</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem" }}>Company</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem" }}>Score</th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 10).map((lead, index) => (
                  <tr key={lead.id} style={{ borderTop: index > 0 ? "1px solid #e2e8f0" : "none" }}>
                    <td style={{ padding: "1rem" }}>
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        style={{ color: "#4299e1", textDecoration: "none", fontWeight: "500" }}
                      >
                        {lead.firstName} {lead.lastName}
                      </Link>
                    </td>
                    <td style={{ padding: "1rem", color: "#666" }}>{lead.company || "-"}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        background: lead.status === 'QUALIFIED' ? '#c6f6d5' : lead.status === 'NEW' ? '#bee3f8' : '#e2e8f0',
                        color: lead.status === 'QUALIFIED' ? '#276749' : lead.status === 'NEW' ? '#2c5282' : '#4a5568',
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", color: "#666" }}>{lead.score || "-"}/100</td>
                    <td style={{ padding: "1rem", color: "#666", fontSize: "0.875rem" }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <Link
            href="/dashboard/leads/import"
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
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📥</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Import Leads</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Bulk import from CSV</div>
          </Link>
          <Link
            href="/dashboard/reports"
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
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Sales Reports</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>View pipeline analytics</div>
          </Link>
          <Link
            href="/dashboard/email"
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
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✉️</div>
            <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>Email Campaign</div>
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Send bulk emails</div>
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
            <div style={{ fontSize: "0.875rem", color: "#666" }}>Manage subscription</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
