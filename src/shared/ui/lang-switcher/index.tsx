"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { LANGUAGES } from "@/shared/utils/constants";

export const LangSwitcher = () => {
  const router = useRouter();

  const pathname = usePathname();

  const currentLang = useLocale();

  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0];

  const next = LANGUAGES.find((l) => l.code !== current.code) ?? LANGUAGES[0];

  const onToggle = () => {
    router.replace(pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${next.code}`));
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 cursor-pointer py-4 px-5 rounded-xl bg-zinc-100 text-neutral-500 text-xl font-medium"
    >
      <Image src={current.icon} alt={current.label} width={22} height={22} />

      <span>{current.label}</span>
    </button>
  );
};
