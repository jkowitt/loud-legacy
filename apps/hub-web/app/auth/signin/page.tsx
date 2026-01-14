"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7fafc" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <div style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem", fontWeight: "700", textAlign: "center" }}>
            Hub - Central Dashboard
          </h1>
          <p style={{ margin: "0 0 2rem", color: "#666", textAlign: "center", fontSize: "0.875rem" }}>
            Sign in to access all your platforms
          </p>

          {error && (
            <div style={{
              padding: "0.75rem",
              background: "#fed7d7",
              color: "#c53030",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "0.875rem",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "1rem",
                }}
                placeholder="demo@valora.com"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "1rem",
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: loading ? "#cbd5e0" : "#4299e1",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#ebf8ff", borderRadius: "6px", fontSize: "0.75rem", color: "#2c5282" }}>
            <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>🧪 Test Account:</div>
            <div>Email: demo@valora.com</div>
            <div>Password: demo123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
