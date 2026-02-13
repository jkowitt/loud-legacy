/**
 * Rally API Client
 * Connects to the Rally Express server for auth, content, and analytics
 */

const RALLY_API_BASE = process.env.NEXT_PUBLIC_RALLY_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function rallyFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rally-token') : null;

  try {
    const response = await fetch(`${RALLY_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.error || `HTTP ${response.status}` };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, error: 'Server unavailable' };
  }
}

// Auth
export const rallyAuth = {
  login: (email: string, password: string) =>
    rallyFetch<{ token: string; user: RallyUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (params: RegisterParams) =>
    rallyFetch<{ token: string; user: RallyUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  me: () => rallyFetch<{ user: RallyUser }>('/auth/me'),

  verifyEmail: (code: string) =>
    rallyFetch<{ message: string }>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  resendVerification: () =>
    rallyFetch<{ message: string; resetCode?: string }>('/auth/resend-verification', {
      method: 'POST',
    }),

  forgotPassword: (email: string) =>
    rallyFetch<{ message: string; resetCode?: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (email: string, code: string, newPassword: string) =>
    rallyFetch<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword }),
    }),

  updateProfile: (fields: Partial<Pick<RallyUser, 'name' | 'handle' | 'favoriteSchool' | 'supportingSchools' | 'emailUpdates' | 'pushNotifications'>>) =>
    rallyFetch<RallyUser>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(fields),
    }),
};

// Content
export const rallyContent = {
  getFeed: () => rallyFetch<{ content: ContentItem[] }>('/content'),

  getSchools: () => rallyFetch<{ schools: School[] }>('/schools'),
};

// Users (admin)
export const rallyUsers = {
  list: () => rallyFetch<{ users: RallyUser[] }>('/users'),

  getById: (id: string) => rallyFetch<{ user: RallyUser }>(`/users/${id}`),

  update: (id: string, fields: Partial<RallyUser>) =>
    rallyFetch<{ user: RallyUser }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fields),
    }),
};

// Analytics
export const rallyAnalytics = {
  getSummary: () => rallyFetch<AnalyticsSummary>('/analytics'),

  trackPageVisit: (page: string, metadata?: Record<string, string>) =>
    rallyFetch('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ event: 'page_visit', page, metadata, timestamp: new Date().toISOString() }),
    }),

  trackEvent: (event: string, metadata?: Record<string, string>) =>
    rallyFetch('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({ event, metadata, timestamp: new Date().toISOString() }),
    }),
};

// Types
export interface RallyUser {
  id: string;
  email: string;
  name: string;
  handle: string;
  role: 'developer' | 'admin' | 'user';
  schoolId: string | null;
  favoriteSchool: string | null;
  supportingSchools: string[];
  emailVerified: boolean;
  emailUpdates: boolean;
  pushNotifications: boolean;
  acceptedTerms: boolean;
  points?: number;
  tier?: string;
  createdAt?: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  name: string;
  handle: string;
  favoriteSchool?: string | null;
  supportingSchools?: string[];
  emailUpdates?: boolean;
  pushNotifications?: boolean;
  acceptedTerms?: boolean;
}

export interface ContentItem {
  id: string;
  type: string;
  title: string;
  body?: string;
  imageUrl?: string;
  author?: string;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  mascot: string;
  conference: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface AnalyticsSummary {
  totalUsers: number;
  activeToday: number;
  eventsTracked: number;
  verifiedUsers: number;
  usersBySchool: Record<string, number>;
  recentEvents: Array<{ event: string; page: string; timestamp: string; userId?: string }>;
}
