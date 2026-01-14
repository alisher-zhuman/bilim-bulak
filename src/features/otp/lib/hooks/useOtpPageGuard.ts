"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOtpStore } from "../../../../shared/stores/useOtpStore";

interface Params {
  redirectTo?: string;
}

export const useOtpPageGuard = (options?: Params) => {
  const router = useRouter();

  const redirectTo = options?.redirectTo ?? "/auth/sign-up";

  const ctx = useOtpStore((s) => s.context);

  const isAllowed = !!ctx?.phone;

  useEffect(() => {
    if (!isAllowed) {
      router.replace(redirectTo);
    }
  }, [isAllowed, redirectTo, router]);

  return { ctx, isAllowed };
};
