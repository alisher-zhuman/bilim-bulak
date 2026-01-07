"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useScrollRestorer = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");

    if (scrollY) {
      window.scrollTo(0, +scrollY);
      sessionStorage.removeItem("scrollY");
    }

    const saveScroll = () => {
      sessionStorage.setItem("scrollY", window.scrollY.toString());
    };

    window.addEventListener("beforeunload", saveScroll);

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [pathname]);
};
