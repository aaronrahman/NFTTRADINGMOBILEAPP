import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  username: string;
  purpleCoins: number;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updatePurpleCoins: (amount: number) => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updatePurpleCoins: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, purpleCoins: state.user.purpleCoins + amount }
            : null,
        })),
    }),
    {
      name: "auth-storage",
    },
  ),
);
