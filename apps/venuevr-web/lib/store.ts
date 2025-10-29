import { create } from "zustand";

type User = {
  id: string;
  email: string;
  displayName: string;
  entitlements: string[];
} | null;

type UIState = {
  user: User;
  setUser: (user: User) => void;
  activeEventId: string | null;
  setActiveEventId: (eventId: string | null) => void;
};

export const useAppStore = create<UIState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  activeEventId: null,
  setActiveEventId: (activeEventId) => set({ activeEventId })
}));
