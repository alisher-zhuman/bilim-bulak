"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const useRequireAuth = () => {
  const router = useRouter();

  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token, router]);

  return { isAuthed: !!token };
};
