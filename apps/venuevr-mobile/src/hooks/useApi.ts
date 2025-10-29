import Constants from "expo-constants";

import type {
  CatalogItem,
  CreativePlacement,
  EventDetail,
  EventSummary,
  SystemHealth,
  UserProfile
} from "@shared/types";

const API_BASE = (Constants.expoConfig?.extra as { apiBase?: string })?.apiBase ?? "http://localhost:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request to ${path} failed`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export const api = {
  getEvents: () => request<EventSummary[]>("/events"),
  getEvent: (eventId: string) => request<EventDetail>(`/events/${eventId}`),
  getCatalog: () => request<CatalogItem[]>("/catalog"),
  getPlacements: (eventId: string) => request<CreativePlacement[]>(`/creative/events/${eventId}/placements`),
  getHealth: () => request<SystemHealth>("/health/live"),
  getEntitlements: () => request<string[]>("/me/entitlements"),
  getProfile: () => request<UserProfile>("/me").catch(() => null),
  createParty: (eventId: string, name: string) =>
    request("/parties", { method: "POST", body: JSON.stringify({ event_id: eventId, name }) })
};
