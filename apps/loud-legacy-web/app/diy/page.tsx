"use client";
import { useEffect } from "react";
import "../../styles/redirect.css";

const target =
  (process.env.NEXT_PUBLIC_DIY_URL || "https://diy.loud-legacy.com").trim();

export default function DiyRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(target);
    }
  }, []);

  return (
    <section className="redirect">
      <div className="redirect-card">
        <div className="spinner" />
        <h1>Redirecting to DIY Mr Fix It…</h1>
        <p>
          If not redirected, <a href={target}>click here</a>.
        </p>
      </div>
    </section>
  );
}
