"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      src="/icons/logo.svg"
      alt="Logo"
      priority
      className="w-20 h-11 md:w-28 md:h-14.5 cursor-pointer"
      width={112}
      height={60}
    />
  );
};
