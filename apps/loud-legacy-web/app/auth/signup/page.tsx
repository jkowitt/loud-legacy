"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn as nextAuthSignIn } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for BETA or trial params
  const isBeta = searchParams.get("beta") === "true";
  const plan = searchParams.get("plan");
  const trial = searchParams.get("trial");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isBeta: isBeta || true, // Always mark as BETA for now
          plan: plan || "BETA",
          trialDays: trial ? parseInt(trial) : 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create account");
      }

      // Redirect to dashboard for BETA users (no payment needed)
      router.push("/auth/signin?registered=true&beta=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* BETA Badge */}
          <div className="auth-beta-banner">
            <span className="beta-pulse"></span>
            <span>BETA Access - Free, No Credit Card Required</span>
          </div>

          <div className="auth-logo">
            <Link href="/">
              <svg viewBox="0 0 40 40" width="48" height="48" fill="none">
                <rect width="40" height="40" rx="10" fill="#0F172A" />
                <path d="M10 28V12h3v13.5h7.5V28H10z" fill="#F97316" />
                <path d="M22 28V12h3v13.5h5V28H22z" fill="#22C55E" />
              </svg>
            </Link>
          </div>
          <div className="auth-header">
            <h1>Join the BETA</h1>
            <p>Get free access to all Loud Legacy platforms during our BETA period</p>
          </div>

          {/* What you get */}
          <div className="auth-beta-benefits">
            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" width="18" height="18">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Free access to all 5 platforms</span>
            </div>
            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" width="18" height="18">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="benefit-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" width="18" height="18">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Special pricing at launch</span>
            </div>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a secure password"
                required
                minLength={8}
                disabled={loading}
              />
              <small>At least 8 characters</small>
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="auth-submit-btn auth-submit-beta" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : null}
              {loading ? "Creating account..." : "Join BETA Free"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button
            onClick={() => nextAuthSignIn("google", { callbackUrl: "/dashboard" })}
            className="auth-google-btn"
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" />
              <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" />
              <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" />
              <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" />
            </svg>
            Continue with Google
          </button>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link href="/auth/signin">Sign in</Link>
            </p>
          </div>

          {/* Platform logos */}
          <div className="auth-platforms">
            <span>Access all platforms:</span>
            <div className="auth-platform-icons">
              <span className="auth-platform-tag">VALORA</span>
              <span className="auth-platform-tag">Sportify</span>
              <span className="auth-platform-tag">Business Now</span>
              <span className="auth-platform-tag">Legacy CRM</span>
              <span className="auth-platform-tag">Loud Works</span>
            </div>
          </div>

          <p className="auth-terms">
            By signing up, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
