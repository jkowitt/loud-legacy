import { createApiClient } from "@loud-legacy/shared-auth";

const defaultBaseUrl = import.meta.env.VITE_VALORA_API ?? "http://localhost:8000";

export const valoraApi = createApiClient({
  baseUrl: defaultBaseUrl,
  onUnauthorized: () => {
    console.warn("Valora API returned 401 — redirecting to login.");
    window.location.href = "/login";
  }
});

const dataFeedsUrl = import.meta.env.VITE_DATA_FEEDS_URL ?? "http://localhost:8004";

export const dataFeedsApi = createApiClient({
  baseUrl: dataFeedsUrl
});
