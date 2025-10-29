"use client";

import { AnalyticsClient, createHttpDestination } from "@loud-legacy/shared-analytics";

const fallbackDestination = {
  async track(event: Parameters<AnalyticsClient["track"]>[0]) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", event);
    }
  }
};

const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

const destinations = endpoint
  ? [
      createHttpDestination({
        endpoint,
        useBeacon: true
      })
    ]
  : [fallbackDestination];

export const analytics = new AnalyticsClient({
  destinations,
  defaultContext: {
    brand: "hub"
  }
});

export function trackBrandCardClick(brandKey: string) {
  void analytics.track({
    event: "action_clicked",
    feature: "brand-card",
    props: { brandKey }
  });
}
