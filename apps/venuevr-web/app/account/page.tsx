import { Layout } from "../../components/Layout";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

type UserProfile = {
  email: string;
  display_name?: string;
  entitlements: string[];
  roles: string[];
};

async function fetchProfile(): Promise<UserProfile | null> {
  const res = await fetch(`${API_BASE}/me`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function fetchEntitlements(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/me/entitlements`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function AccountPage() {
  const [profile, entitlements] = await Promise.all([fetchProfile(), fetchEntitlements()]);
  return (
    <Layout>
      <section className="surface">
        <h1>Account</h1>
        {profile ? (
          <div style={{ display: "grid", gap: "8px", marginTop: "16px" }}>
            <div>
              <strong>Email:</strong> {profile.email}
            </div>
            <div>
              <strong>Roles:</strong> {profile.roles.join(", ")}
            </div>
            <div>
              <strong>Entitlements:</strong>
              <ul>
                {entitlements.map((entitlement) => (
                  <li key={entitlement}>{entitlement}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>No profile found. Sign in to continue.</p>
        )}
      </section>
    </Layout>
  );
}
