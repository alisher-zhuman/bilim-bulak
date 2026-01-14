import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  userId: number;
  phone: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;

  otpToken: string | null;
  otpUser: AuthUser | null;

  setOtpSession: (payload: { otpToken: string; otpUser: AuthUser }) => void;
  promoteOtpToAuth: () => void;

  clearOtp: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      otpToken: null,
      otpUser: null,

      setOtpSession: ({ otpToken, otpUser }) => set({ otpToken, otpUser }),

      promoteOtpToAuth: () => {
        const { otpToken, otpUser } = get();

        if (!otpToken || !otpUser) return;

        set({
          token: otpToken,
          user: otpUser,
          otpToken: null,
          otpUser: null,
        });
      },

      clearOtp: () => set({ otpToken: null, otpUser: null }),

      logout: () =>
        set({
          token: null,
          user: null,
          otpToken: null,
          otpUser: null,
        }),
    }),
    { name: "auth" }
  )
);
