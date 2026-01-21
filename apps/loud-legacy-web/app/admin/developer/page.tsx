"use client";

import { useState, useEffect } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  source: string;
  metadata?: Record<string, any>;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed?: string;
  createdAt: string;
  isActive: boolean;
}

interface DatabaseTable {
  name: string;
  rowCount: number;
  size: string;
}

// Demo data
const demoLogs: LogEntry[] = [
  { id: "1", timestamp: new Date().toISOString(), level: "info", message: "Server started successfully", source: "system" },
  { id: "2", timestamp: new Date(Date.now() - 60000).toISOString(), level: "info", message: "User login: admin@loud-legacy.com", source: "auth" },
  { id: "3", timestamp: new Date(Date.now() - 120000).toISOString(), level: "warn", message: "Rate limit approaching for API key: dev_xxx", source: "api" },
  { id: "4", timestamp: new Date(Date.now() - 180000).toISOString(), level: "error", message: "Failed to connect to external service", source: "integration" },
  { id: "5", timestamp: new Date(Date.now() - 240000).toISOString(), level: "debug", message: "Cache invalidated for key: homepage_content", source: "cache" },
];

const demoAPIKeys: APIKey[] = [
  { id: "1", name: "Development Key", key: "dev_sk_live_xxxxxxxxxxxxxxxxxxxxxxxx", permissions: ["read", "write"], lastUsed: new Date().toISOString(), createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), isActive: true },
  { id: "2", name: "Production Key", key: "prod_sk_live_xxxxxxxxxxxxxxxxxxxxxxxx", permissions: ["read", "write", "admin"], createdAt: new Date(Date.now() - 86400000 * 60).toISOString(), isActive: true },
  { id: "3", name: "Read-Only Key", key: "ro_sk_live_xxxxxxxxxxxxxxxxxxxxxxxx", permissions: ["read"], createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), isActive: false },
];

const demoTables: DatabaseTable[] = [
  { name: "User", rowCount: 1247, size: "2.4 MB" },
  { name: "Organization", rowCount: 89, size: "156 KB" },
  { name: "Valuation", rowCount: 3421, size: "8.7 MB" },
  { name: "Property", rowCount: 2156, size: "4.2 MB" },
  { name: "CRMLead", rowCount: 5678, size: "3.1 MB" },
  { name: "CRMDeal", rowCount: 1234, size: "1.8 MB" },
  { name: "Subscription", rowCount: 456, size: "245 KB" },
  { name: "Payment", rowCount: 2341, size: "1.2 MB" },
  { name: "ActivityLog", rowCount: 45672, size: "12.4 MB" },
  { name: "MediaAsset", rowCount: 892, size: "523 KB" },
];

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState<"database" | "api" | "logs" | "env" | "webhooks">("database");
  const [logs, setLogs] = useState<LogEntry[]>(demoLogs);
  const [apiKeys, setApiKeys] = useState<APIKey[]>(demoAPIKeys);
  const [tables] = useState<DatabaseTable[]>(demoTables);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM \"User\" LIMIT 10;");
  const [isQuerying, setIsQuerying] = useState(false);
  const [logFilter, setLogFilter] = useState<string>("all");
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(["read"]);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Environment variables (safe to display)
  const envVars = [
    { key: "NODE_ENV", value: process.env.NODE_ENV || "development", sensitive: false },
    { key: "NEXTAUTH_URL", value: "https://loud-legacy.com", sensitive: false },
    { key: "DATABASE_URL", value: "postgresql://****:****@****:5432/loud_legacy", sensitive: true },
    { key: "NEXTAUTH_SECRET", value: "••••••••••••••••", sensitive: true },
    { key: "GOOGLE_CLIENT_ID", value: "******.apps.googleusercontent.com", sensitive: true },
    { key: "STRIPE_SECRET_KEY", value: "sk_live_••••••••••••", sensitive: true },
    { key: "ADMIN_SETUP_SECRET", value: "••••••••••••••••", sensitive: true },
  ];

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const runQuery = async () => {
    setIsQuerying(true);
    // Simulate query execution
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo results based on table
    const demoResults = [
      { id: "cuid1", email: "admin@loud-legacy.com", name: "Admin User", role: "SUPER_ADMIN", createdAt: new Date().toISOString() },
      { id: "cuid2", email: "john@example.com", name: "John Doe", role: "USER", createdAt: new Date().toISOString() },
      { id: "cuid3", email: "jane@example.com", name: "Jane Smith", role: "ADMIN", createdAt: new Date().toISOString() },
    ];
    setQueryResult(demoResults);
    setIsQuerying(false);
    setToast({ message: "Query executed successfully", type: "success" });
  };

  const createAPIKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions: newKeyPermissions,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    setApiKeys([newKey, ...apiKeys]);
    setShowNewKeyModal(false);
    setNewKeyName("");
    setNewKeyPermissions(["read"]);
    setToast({ message: "API key created successfully", type: "success" });
  };

  const toggleKeyStatus = (id: string) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, isActive: !k.isActive } : k));
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    setToast({ message: "API key deleted", type: "success" });
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredLogs = logFilter === "all" ? logs : logs.filter(l => l.level === logFilter);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "error": return "#EF4444";
      case "warn": return "#F59E0B";
      case "info": return "#3B82F6";
      case "debug": return "#8B5CF6";
      default: return "#6B7280";
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="admin-tabs">
        {[
          { id: "database", label: "Database", icon: "🗄️" },
          { id: "api", label: "API Keys", icon: "🔑" },
          { id: "logs", label: "System Logs", icon: "📋" },
          { id: "env", label: "Environment", icon: "⚙️" },
          { id: "webhooks", label: "Webhooks", icon: "🔗" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <span style={{ marginRight: "0.5rem" }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Database Tab */}
      {activeTab === "database" && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.5rem" }}>
          {/* Tables List */}
          <div className="admin-card">
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 600 }}>Database Tables</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {tables.map((table) => (
                <button
                  key={table.name}
                  onClick={() => {
                    setSelectedTable(table.name);
                    setSqlQuery(`SELECT * FROM "${table.name}" LIMIT 10;`);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem",
                    background: selectedTable === table.name ? "rgba(59, 130, 246, 0.1)" : "transparent",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.2s",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 500, color: "var(--admin-text)" }}>{table.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)" }}>
                      {table.rowCount.toLocaleString()} rows
                    </div>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)" }}>{table.size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Query Editor */}
          <div className="admin-card">
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={{ fontWeight: 600, color: "var(--admin-text)" }}>SQL Query</label>
                <span style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)" }}>
                  Read-only access • Prisma PostgreSQL
                </span>
              </div>
              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "120px",
                  padding: "1rem",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  border: "1px solid var(--admin-border)",
                  borderRadius: "8px",
                  background: "#1E293B",
                  color: "#E2E8F0",
                  resize: "vertical",
                }}
                placeholder="Enter SQL query..."
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <button onClick={runQuery} className="admin-btn admin-btn-primary" disabled={isQuerying}>
                {isQuerying ? "Running..." : "Run Query"}
              </button>
              <button onClick={() => setQueryResult(null)} className="admin-btn admin-btn-secondary">
                Clear Results
              </button>
            </div>

            {/* Query Results */}
            {queryResult && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h4 style={{ margin: 0, fontSize: "0.9375rem" }}>Results ({queryResult.length} rows)</h4>
                  <button className="admin-btn admin-btn-secondary" style={{ padding: "0.375rem 0.75rem", fontSize: "0.8125rem" }}>
                    Export CSV
                  </button>
                </div>
                <div style={{ overflowX: "auto", border: "1px solid var(--admin-border)", borderRadius: "8px" }}>
                  <table className="admin-table" style={{ margin: 0 }}>
                    <thead>
                      <tr>
                        {Object.keys(queryResult[0] || {}).map((key) => (
                          <th key={key} style={{ whiteSpace: "nowrap" }}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val: any, j) => (
                            <td key={j} style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>
                              {typeof val === "object" ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.125rem" }}>API Keys</h3>
              <p style={{ margin: "0.25rem 0 0", color: "var(--admin-text-secondary)", fontSize: "0.875rem" }}>
                Manage API keys for programmatic access to Loud Legacy APIs
              </p>
            </div>
            <button onClick={() => setShowNewKeyModal(true)} className="admin-btn admin-btn-primary">
              Create New Key
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {apiKeys.map((key) => (
              <div
                key={key.id}
                style={{
                  padding: "1.25rem",
                  background: "var(--admin-bg)",
                  borderRadius: "8px",
                  border: "1px solid var(--admin-border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <h4 style={{ margin: 0, fontSize: "1rem" }}>{key.name}</h4>
                      <span className={`admin-badge ${key.isActive ? "admin-badge-success" : "admin-badge-warning"}`}>
                        {key.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <code style={{
                        padding: "0.375rem 0.75rem",
                        background: "#1E293B",
                        color: "#E2E8F0",
                        borderRadius: "4px",
                        fontSize: "0.8125rem",
                        fontFamily: "monospace",
                      }}>
                        {key.key.substring(0, 20)}••••••••
                      </code>
                      <button
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                      >
                        {copiedKey === key.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>
                      <span>Permissions: {key.permissions.join(", ")}</span>
                      <span>Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                      {key.lastUsed && <span>Last used: {new Date(key.lastUsed).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => toggleKeyStatus(key.id)}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "0.375rem 0.75rem", fontSize: "0.8125rem" }}
                    >
                      {key.isActive ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "0.375rem 0.75rem", fontSize: "0.8125rem" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* API Documentation Link */}
          <div style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            borderRadius: "12px",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}>
            <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>API Documentation</h4>
            <p style={{ margin: "0 0 1rem", color: "var(--admin-text-secondary)", fontSize: "0.9375rem" }}>
              Access the full API documentation to integrate Loud Legacy into your applications.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="admin-btn admin-btn-primary">View API Docs</button>
              <button className="admin-btn admin-btn-secondary">Download OpenAPI Spec</button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === "logs" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.125rem" }}>System Logs</h3>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                className="admin-form-select"
                style={{ width: "140px" }}
              >
                <option value="all">All Levels</option>
                <option value="error">Errors</option>
                <option value="warn">Warnings</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
              <button className="admin-btn admin-btn-secondary">
                Download Logs
              </button>
              <button className="admin-btn admin-btn-secondary" onClick={() => setLogs([...demoLogs])}>
                Refresh
              </button>
            </div>
          </div>

          <div style={{
            background: "#1E293B",
            borderRadius: "8px",
            padding: "1rem",
            maxHeight: "500px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "0.8125rem",
          }}>
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <span style={{ color: "#64748B", whiteSpace: "nowrap" }}>
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span style={{
                  color: getLevelColor(log.level),
                  fontWeight: 600,
                  textTransform: "uppercase",
                  width: "50px",
                }}>
                  {log.level}
                </span>
                <span style={{ color: "#94A3B8" }}>[{log.source}]</span>
                <span style={{ color: "#E2E8F0" }}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Environment Tab */}
      {activeTab === "env" && (
        <div className="admin-card">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.125rem" }}>Environment Variables</h3>
            <p style={{ margin: 0, color: "var(--admin-text-secondary)", fontSize: "0.875rem" }}>
              Sensitive values are masked. Edit in Netlify dashboard or .env file.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {envVars.map((env) => (
              <div
                key={env.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  background: "var(--admin-bg)",
                  borderRadius: "6px",
                  gap: "1rem",
                }}
              >
                <code style={{ fontWeight: 600, color: "var(--admin-accent)", minWidth: "200px" }}>{env.key}</code>
                <code style={{
                  flex: 1,
                  color: env.sensitive ? "var(--admin-text-secondary)" : "var(--admin-text)",
                  fontFamily: "monospace",
                }}>
                  {env.value}
                </code>
                {env.sensitive && (
                  <span className="admin-badge admin-badge-warning">Sensitive</span>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" width="20" height="20" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <strong style={{ color: "#F59E0B" }}>Security Notice</strong>
                <p style={{ margin: "0.25rem 0 0", color: "var(--admin-text)", fontSize: "0.875rem" }}>
                  Never expose sensitive environment variables in client-side code. Use server-side API routes to access protected resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === "webhooks" && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.125rem" }}>Webhooks</h3>
              <p style={{ margin: "0.25rem 0 0", color: "var(--admin-text-secondary)", fontSize: "0.875rem" }}>
                Configure webhooks to receive real-time notifications about events
              </p>
            </div>
            <button className="admin-btn admin-btn-primary">Add Webhook</button>
          </div>

          <div style={{
            padding: "3rem",
            textAlign: "center",
            background: "var(--admin-bg)",
            borderRadius: "12px",
            border: "2px dashed var(--admin-border)",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48" style={{ color: "var(--admin-text-secondary)", margin: "0 auto 1rem" }}>
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <h4 style={{ margin: "0 0 0.5rem", color: "var(--admin-text)" }}>No webhooks configured</h4>
            <p style={{ margin: "0 0 1.5rem", color: "var(--admin-text-secondary)", fontSize: "0.9375rem" }}>
              Create a webhook to receive POST requests when events occur
            </p>
            <button className="admin-btn admin-btn-primary">Create First Webhook</button>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <h4 style={{ margin: "0 0 1rem", fontSize: "1rem" }}>Available Events</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {[
                "user.created", "user.updated", "user.deleted",
                "subscription.created", "subscription.updated", "subscription.canceled",
                "payment.succeeded", "payment.failed",
                "content.published", "content.updated",
              ].map((event) => (
                <div
                  key={event}
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: "var(--admin-bg)",
                    borderRadius: "6px",
                    fontFamily: "monospace",
                    fontSize: "0.8125rem",
                    color: "var(--admin-text)",
                  }}
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New API Key Modal */}
      {showNewKeyModal && (
        <div className="admin-modal-overlay" onClick={() => setShowNewKeyModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Create API Key</h3>
              <button className="admin-modal-close" onClick={() => setShowNewKeyModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Key Name</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Development Key"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Permissions</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {["read", "write", "admin"].map((perm) => (
                    <label key={perm} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={newKeyPermissions.includes(perm)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyPermissions([...newKeyPermissions, perm]);
                          } else {
                            setNewKeyPermissions(newKeyPermissions.filter(p => p !== perm));
                          }
                        }}
                        style={{ width: "18px", height: "18px" }}
                      />
                      <span style={{ textTransform: "capitalize" }}>{perm}</span>
                      <span style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>
                        {perm === "read" && "- View data"}
                        {perm === "write" && "- Create and update data"}
                        {perm === "admin" && "- Full administrative access"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button onClick={() => setShowNewKeyModal(false)} className="admin-btn admin-btn-secondary">
                Cancel
              </button>
              <button onClick={createAPIKey} className="admin-btn admin-btn-primary" disabled={!newKeyName}>
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
