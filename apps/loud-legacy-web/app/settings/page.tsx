"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

interface SettingsData {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    memberSince: string;
  };
  subscription: {
    id: string;
    plan: string;
    status: string;
    billingCycle: string;
    amount: number;
    currency: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    trialEnd: string | null;
    hasStripe: boolean;
  } | null;
  usage: { lookups: number };
  payments: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    last4: string | null;
    brand: string | null;
    paidAt: string | null;
    invoiceUrl: string | null;
    receiptUrl: string | null;
  }[];
  platforms: string[];
}

const PLAN_LABELS: Record<string, string> = {
  FREE: "Free",
  STARTER: "Starter",
  PROFESSIONAL: "Professional",
  ENTERPRISE: "Enterprise",
};

const PLAN_LOOKUP_LIMITS: Record<string, string> = {
  FREE: "0",
  STARTER: "25",
  PROFESSIONAL: "100",
  ENTERPRISE: "500",
};

export default function SettingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"account" | "billing" | "usage">("account");
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/settings")
        .then((r) => r.json())
        .then((d) => {
          setData(d);
          setEditName(d.user?.name || "");
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const handleSaveName = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });
      if (res.ok) {
        setData((prev) => prev ? { ...prev, user: { ...prev.user, name: editName } } : prev);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const openBillingPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const body = await res.json();
      if (body.url) {
        window.location.href = body.url;
      } else if (body.redirect) {
        router.push(body.redirect);
      } else {
        alert(body.error || "Could not open billing portal");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to open billing portal");
    }
    setPortalLoading(false);
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="settings-page">
          <div className="settings-container">
            <div className="settings-loading">Loading settings...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header />
        <div className="settings-page">
          <div className="settings-container">
            <div className="settings-loading">Failed to load settings. Please try again.</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const plan = data.subscription?.plan || "FREE";
  const planLabel = PLAN_LABELS[plan] || plan;
  const lookupLimit = PLAN_LOOKUP_LIMITS[plan] || "0";

  return (
    <>
      <Header />
      <div className="settings-page">
        <div className="settings-container">
          <div className="settings-header">
            <h1>Account Settings</h1>
            <p>Manage your account, subscription, and billing preferences</p>
          </div>

          <div className="settings-tabs">
            <button className={`settings-tab ${activeTab === "account" ? "active" : ""}`} onClick={() => setActiveTab("account")}>Account</button>
            <button className={`settings-tab ${activeTab === "billing" ? "active" : ""}`} onClick={() => setActiveTab("billing")}>Billing</button>
            <button className={`settings-tab ${activeTab === "usage" ? "active" : ""}`} onClick={() => setActiveTab("usage")}>Usage</button>
          </div>

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="settings-section">
              <div className="settings-card">
                <h3>Profile Information</h3>
                <div className="settings-field">
                  <label>Name</label>
                  {isEditing ? (
                    <div className="settings-edit-row">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="settings-input"
                      />
                      <button className="settings-btn primary" onClick={handleSaveName} disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button className="settings-btn secondary" onClick={() => { setIsEditing(false); setEditName(data.user.name || ""); }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="settings-edit-row">
                      <span className="settings-value">{data.user.name || "Not set"}</span>
                      <button className="settings-btn secondary" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                  )}
                </div>
                <div className="settings-field">
                  <label>Email</label>
                  <span className="settings-value">{data.user.email}</span>
                </div>
                <div className="settings-field">
                  <label>Role</label>
                  <span className="settings-badge">{data.user.role.replace("_", " ")}</span>
                </div>
                <div className="settings-field">
                  <label>Member Since</label>
                  <span className="settings-value">{formatDate(data.user.memberSince)}</span>
                </div>
              </div>

              <div className="settings-card">
                <h3>Current Plan</h3>
                <div className="settings-plan-card">
                  <div className="settings-plan-info">
                    <span className="settings-plan-name">{planLabel}</span>
                    <span className={`settings-plan-status ${data.subscription?.status?.toLowerCase() || "free"}`}>
                      {data.subscription?.status || "No active subscription"}
                    </span>
                  </div>
                  {data.subscription && (
                    <div className="settings-plan-details">
                      <span>{data.subscription.billingCycle === "YEARLY" ? "Annual" : "Monthly"} billing</span>
                      {data.subscription.amount > 0 && (
                        <span className="settings-plan-price">
                          {formatCurrency(data.subscription.amount)}/{data.subscription.billingCycle === "YEARLY" ? "yr" : "mo"}
                        </span>
                      )}
                    </div>
                  )}
                  {data.subscription?.cancelAtPeriodEnd && (
                    <div className="settings-plan-cancel-notice">
                      Cancels at end of period: {formatDate(data.subscription.currentPeriodEnd)}
                    </div>
                  )}
                </div>
                <div className="settings-plan-actions">
                  {!data.subscription || plan === "FREE" ? (
                    <button className="settings-btn primary" onClick={() => router.push("/pricing")}>
                      Upgrade Plan
                    </button>
                  ) : (
                    <button className="settings-btn primary" onClick={openBillingPortal} disabled={portalLoading}>
                      {portalLoading ? "Opening..." : "Manage Subscription"}
                    </button>
                  )}
                </div>
              </div>

              <div className="settings-card">
                <h3>Platform Access</h3>
                {data.platforms.length > 0 ? (
                  <div className="settings-platforms">
                    {data.platforms.map((p) => (
                      <span key={p} className="settings-platform-badge">{p.replace("_", " ")}</span>
                    ))}
                  </div>
                ) : (
                  <p className="settings-muted">No platform access configured. Upgrade your plan for full access.</p>
                )}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="settings-section">
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3>Payment Method</h3>
                  {data.subscription?.hasStripe && (
                    <button className="settings-btn secondary" onClick={openBillingPortal} disabled={portalLoading}>
                      {portalLoading ? "Opening..." : "Update Payment Method"}
                    </button>
                  )}
                </div>
                {data.payments.length > 0 && data.payments[0].last4 ? (
                  <div className="settings-payment-method">
                    <div className="settings-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                        <rect x="1" y="4" width="22" height="16" rx="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <span className="settings-card-brand">{(data.payments[0].brand || "Card").toUpperCase()}</span>
                      <span className="settings-card-number">&bull;&bull;&bull;&bull; {data.payments[0].last4}</span>
                    </div>
                  </div>
                ) : (
                  <p className="settings-muted">No payment method on file.{" "}
                    {!data.subscription?.hasStripe && (
                      <button className="settings-link-btn" onClick={() => router.push("/pricing")}>Add a plan to set up billing</button>
                    )}
                  </p>
                )}
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <h3>Billing History</h3>
                </div>
                {data.payments.length > 0 ? (
                  <div className="settings-billing-table">
                    <div className="settings-billing-row header">
                      <span>Date</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span>Receipt</span>
                    </div>
                    {data.payments.map((p) => (
                      <div key={p.id} className="settings-billing-row">
                        <span>{p.paidAt ? formatDate(p.paidAt) : "-"}</span>
                        <span>{formatCurrency(p.amount)}</span>
                        <span className={`settings-payment-status ${p.status.toLowerCase()}`}>{p.status}</span>
                        <span>
                          {p.receiptUrl ? (
                            <a href={p.receiptUrl} target="_blank" rel="noopener noreferrer" className="settings-link-btn">View</a>
                          ) : p.invoiceUrl ? (
                            <a href={p.invoiceUrl} target="_blank" rel="noopener noreferrer" className="settings-link-btn">Invoice</a>
                          ) : (
                            "-"
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="settings-muted">No billing history yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Usage Tab */}
          {activeTab === "usage" && (
            <div className="settings-section">
              <div className="settings-card">
                <h3>Property Lookups</h3>
                <p className="settings-usage-desc">
                  Property record and comparable sales lookups count against your monthly plan limit.
                  Each lookup beyond your plan limit costs $2.00.
                </p>
                <div className="settings-usage-bar-container">
                  <div className="settings-usage-bar-header">
                    <span>{data.usage.lookups} / {lookupLimit} lookups used this month</span>
                    <span className="settings-plan-name-sm">{planLabel} plan</span>
                  </div>
                  <div className="settings-usage-bar">
                    <div
                      className="settings-usage-bar-fill"
                      style={{
                        width: `${Math.min((data.usage.lookups / (parseInt(lookupLimit) || 1)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  {parseInt(lookupLimit) === 0 && (
                    <p className="settings-usage-upgrade">
                      Your current plan does not include property lookups.{" "}
                      <button className="settings-link-btn" onClick={() => router.push("/pricing")}>Upgrade to unlock</button>
                    </p>
                  )}
                </div>
              </div>

              {data.subscription && (
                <div className="settings-card">
                  <h3>Current Billing Period</h3>
                  <div className="settings-field">
                    <label>Period Start</label>
                    <span className="settings-value">{formatDate(data.subscription.currentPeriodStart)}</span>
                  </div>
                  <div className="settings-field">
                    <label>Period End</label>
                    <span className="settings-value">{formatDate(data.subscription.currentPeriodEnd)}</span>
                  </div>
                  <div className="settings-field">
                    <label>Billing Cycle</label>
                    <span className="settings-value">{data.subscription.billingCycle === "YEARLY" ? "Annual" : "Monthly"}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
