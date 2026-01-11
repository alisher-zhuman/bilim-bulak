"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/entities/sign-up/model/store";

type Options = {
  redirectTo?: string;
};

export const useRequireSignUpFirstStep = (options: Options = {}) => {
  const redirectTo = options.redirectTo ?? "/auth/sign-up";

  const router = useRouter();
  const firstStep = useSignUpStore((s) => s.firstStep);

  useEffect(() => {
    if (!firstStep) {
      router.replace(redirectTo);
    }
  }, [firstStep, redirectTo, router]);

  return !!firstStep;
};
