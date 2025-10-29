import type {
  CatalogItem,
  CreativePlacement,
  EventDetail,
  EventFeed,
  EventSummary,
  SystemHealth
} from "@loud-legacy/shared-analytics";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

type FetchOptions = RequestInit & {
  authToken?: string;
};

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.authToken) {
    headers.set("Authorization", `Bearer ${options.authToken}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail ?? `Request to ${path} failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export function fetchEvents() {
  return request<EventSummary[]>("/events");
}

export function fetchEvent(eventId: string) {
  return request<EventDetail>(`/events/${eventId}`);
}

export function fetchCatalog() {
  return request<CatalogItem[]>("/catalog");
}

export function fetchSponsorPlacements(eventId: string) {
  return request<CreativePlacement[]>(`/creative/events/${eventId}/placements`);
}

export function fetchHealthTiles() {
  return request<SystemHealth>("/health/live");
}

export async function createParty(eventId: string, name: string) {
  return request("/parties", {
    method: "POST",
    body: JSON.stringify({ event_id: eventId, name })
  });
}

// Types mirrored from backend models (lightweight for UI)
export type { CatalogItem, CreativePlacement, EventDetail, EventFeed, EventSummary, SystemHealth };
