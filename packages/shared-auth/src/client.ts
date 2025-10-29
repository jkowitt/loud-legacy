export type TokenGetter = () => Promise<string | null> | string | null;

export interface ApiClientOptions {
  baseUrl: string;
  tokenGetter?: TokenGetter;
  fetchImpl?: typeof fetch;
  defaultHeaders?: Record<string, string>;
  onUnauthorized?: () => void;
}

export interface NormalizedError {
  status: number;
  message: string;
  details?: unknown;
}

const buildRequestInit = (init: RequestInit = {}, token?: string | null): RequestInit => {
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");
  return {
    ...init,
    headers
  };
};

const normalizeError = async (response: Response): Promise<NormalizedError> => {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch (err) {
    payload = await response.text();
  }

  const message =
    typeof payload === "object" && payload !== null && "message" in payload
      ? String((payload as { message: unknown }).message)
      : response.statusText || "Request failed";

  return {
    status: response.status,
    message,
    details: payload
  };
};

export class ApiClient {
  private readonly baseUrl: string;
  private tokenGetter?: TokenGetter;
  private readonly fetchImpl: typeof fetch;
  private readonly defaultHeaders: Record<string, string>;
  private readonly onUnauthorized?: () => void;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/?$/, "");
    this.tokenGetter = options.tokenGetter;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.defaultHeaders = options.defaultHeaders ?? {};
    this.onUnauthorized = options.onUnauthorized;
  }

  setTokenGetter(getter: TokenGetter | undefined) {
    this.tokenGetter = getter;
  }

  async get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: "GET" });
  }

  async post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...init,
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body)
    });
  }

  async put<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...init,
      method: "PUT",
      body: body === undefined ? undefined : JSON.stringify(body)
    });
  }

  async patch<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...init,
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body)
    });
  }

  async delete<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: "DELETE" });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const token = (await this.tokenGetter?.()) ?? null;
    const url = path.startsWith("http") ? path : `${this.baseUrl}${path}`;
    const mergedInit = buildRequestInit(init, token);
    for (const [key, value] of Object.entries(this.defaultHeaders)) {
      mergedInit.headers?.set?.(key, value);
    }

    const response = await this.fetchImpl(url, mergedInit);

    if (response.status === 401 && this.onUnauthorized) {
      this.onUnauthorized();
    }

    if (!response.ok) {
      throw await normalizeError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
  }
}

export const createApiClient = (options: ApiClientOptions): ApiClient => new ApiClient(options);
