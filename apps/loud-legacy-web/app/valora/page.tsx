"use client";

import { useEffect } from "react";

const target =
  (process.env.NEXT_PUBLIC_VALORA_URL || "https://valora.loud-legacy.com").trim();

export default function ValoraRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(target);
    }
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Redirecting to VALORA…</h1>
      <p>
        If you are not redirected, <a href={target}>click here</a>.
      </p>
    </main>
  );
}

