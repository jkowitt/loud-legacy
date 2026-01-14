export type BrandKey = "valora" | "venuevr" | "business-now" | "sportify" | "legacy-crm" | "hub";

export type AnalyticsEventName =
  | "page_viewed"
  | "action_clicked"
  | "entity_created"
  | "entity_updated"
  | "entity_deleted"
  | "valuation_requested"
  | "valuation_completed"
  | "stream_started"
  | "stream_stopped"
  | "recording_downloaded"
  | "course_enrolled"
  | "course_completed"
  | "calculator_run";

export interface AnalyticsEvent {
  event: AnalyticsEventName;
  userId?: string;
  orgId?: string;
  brand: BrandKey;
  feature?: string;
  path?: string;
  props?: Record<string, unknown>;
  timestamp?: string;
}

export interface AnalyticsDestination {
  track: (event: AnalyticsEvent) => Promise<void> | void;
  flush?: () => Promise<void> | void;
}

export interface AnalyticsConfig {
  destinations: AnalyticsDestination[];
  defaultContext?: Pick<AnalyticsEvent, "brand" | "userId" | "orgId">;
}

export class AnalyticsClient {
  private readonly destinations: AnalyticsDestination[];
  private context: Pick<AnalyticsEvent, "brand" | "userId" | "orgId"> | undefined;

  constructor(config: AnalyticsConfig) {
    if (!config.destinations.length) {
      throw new Error("AnalyticsClient requires at least one destination");
    }
    this.destinations = config.destinations;
    this.context = config.defaultContext;
  }

  setContext(context: Pick<AnalyticsEvent, "brand" | "userId" | "orgId">) {
    this.context = context;
  }

  async track(event: Omit<AnalyticsEvent, "brand"> & Partial<Pick<AnalyticsEvent, "brand">>) {
    const payload: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      ...this.context,
      ...event,
      brand: event.brand ?? this.context?.brand ?? "hub"
    };

    await Promise.all(
      this.destinations.map(async (destination) => {
        try {
          await destination.track(payload);
        } catch (error) {
          console.error("Analytics destination failed", error);
        }
      })
    );
  }

  async flush() {
    for (const destination of this.destinations) {
      await destination.flush?.();
    }
  }
}

export interface HttpDestinationOptions {
  endpoint: string;
  token?: string;
  headers?: Record<string, string>;
  useBeacon?: boolean;
}

export const createHttpDestination = (options: HttpDestinationOptions): AnalyticsDestination => {
  const { endpoint, token, headers = {}, useBeacon } = options;

  const send = async (event: AnalyticsEvent) => {
    const body = JSON.stringify(event);
    const baseHeaders = {
      "Content-Type": "application/json",
      ...headers
    };

    if (token) {
      baseHeaders["Authorization"] = `Bearer ${token}`;
    }

    if (typeof navigator !== "undefined" && useBeacon && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
      return;
    }

    await fetch(endpoint, {
      method: "POST",
      headers: baseHeaders,
      body
    });
  };

  return {
    track: send
  };
};
