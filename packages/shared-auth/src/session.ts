export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  roles?: string[];
  organizations?: Array<{ id: string; name: string; role: string }>;
}

export interface SessionAdapter {
  getUser: () => Promise<SessionUser | null>;
  getToken: () => Promise<string | null>;
  refresh?: () => Promise<void>;
  login: (options?: { returnTo?: string }) => void;
  logout: (options?: { returnTo?: string }) => void;
}

export interface SessionManagerOptions {
  adapter: SessionAdapter;
  onStatusChange?: (status: SessionStatus) => void;
}

export class SessionManager {
  private readonly adapter: SessionAdapter;
  private status: SessionStatus = "loading";
  private user: SessionUser | null = null;
  private readonly onStatusChange?: (status: SessionStatus) => void;

  constructor(options: SessionManagerOptions) {
    this.adapter = options.adapter;
    this.onStatusChange = options.onStatusChange;
  }

  private setStatus(status: SessionStatus) {
    if (this.status !== status) {
      this.status = status;
      this.onStatusChange?.(status);
    }
  }

  async bootstrap(): Promise<SessionUser | null> {
    try {
      const user = await this.adapter.getUser();
      this.user = user;
      this.setStatus(user ? "authenticated" : "unauthenticated");
      return user;
    } catch (error) {
      // Session bootstrap failed, setting to unauthenticated
      this.user = null;
      this.setStatus("unauthenticated");
      return null;
    }
  }

  getStatus(): SessionStatus {
    return this.status;
  }

  getUser(): SessionUser | null {
    return this.user;
  }

  async getToken(): Promise<string | null> {
    try {
      return await this.adapter.getToken();
    } catch (error) {
      // Token fetch failed, attempting to re-bootstrap if authenticated
      if (this.status === "authenticated") {
        await this.bootstrap();
      }
      return null;
    }
  }

  async refresh(): Promise<void> {
    if (!this.adapter.refresh) return;
    await this.adapter.refresh();
    await this.bootstrap();
  }

  login(options?: { returnTo?: string }) {
    this.adapter.login(options);
  }

  logout(options?: { returnTo?: string }) {
    this.adapter.logout(options);
    this.user = null;
    this.setStatus("unauthenticated");
  }
}

export const createSessionManager = (options: SessionManagerOptions): SessionManager => {
  const manager = new SessionManager(options);
  void manager.bootstrap();
  return manager;
};
