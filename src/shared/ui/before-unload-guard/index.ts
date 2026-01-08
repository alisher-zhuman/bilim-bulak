"use client";
import { useEffect } from "react";

interface Props {
  enabled: boolean;
}

export const BeforeUnloadGuard = ({ enabled }: Props) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);

    return () => window.removeEventListener("beforeunload", handler);
  }, [enabled]);

  return null;
};
