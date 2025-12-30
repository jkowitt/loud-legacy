"use client";
import { useEffect } from "react";

const target =
  (process.env.NEXT_PUBLIC_BUSINESS_URL || "https://business.loud-legacy.com").trim();

export default function BusinessRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(target);
    }
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Redirecting to Business Now…</h1>
      <p>
        If not redirected, <a href={target}>click here</a>.
      </p>
    </main>
  );
}

