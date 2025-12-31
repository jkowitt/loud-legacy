"use client";
import { useEffect } from "react";
import "../../styles/redirect.css";

const target =
  (process.env.NEXT_PUBLIC_VALORA_URL || "https://valora.loud-legacy.com").trim();

export default function ValoraRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(target);
    }
  }, []);

  return (
    <section className="redirect">
      <div className="redirect-card">
        <div className="spinner" />
        <h1>Redirecting to VALORA…</h1>
        <p>
          If you are not redirected, <a href={target}>click here</a>.
        </p>
      </div>
    </section>
  );
}
