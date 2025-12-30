"use client";
import { useEffect } from "react";

const target =
  (process.env.NEXT_PUBLIC_VENUEVR_URL || "https://events.loud-legacy.com").trim();

export default function VenueVRRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.replace(target);
    }
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Redirecting to VenueVR…</h1>
      <p>
        If not redirected, <a href={target}>click here</a>.
      </p>
    </main>
  );
}

