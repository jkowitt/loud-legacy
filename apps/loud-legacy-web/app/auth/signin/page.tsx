"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { useAuth } from "@/components/AuthProvider";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Try demo auth first
      const demoResult = await signIn(email, password);
      if (demoResult.success) {
        router.push("/dashboard");
        return;
      }

      // Fall back to NextAuth
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
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
            <h1>Welcome to Loud Legacy</h1>
            <p>Sign in to access all your business tools</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
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
            Google
          </button>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Sign up free</Link>
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
        </div>
      </div>
    </div>
  );
}
