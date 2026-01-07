"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LANGUAGES } from "@/shared/utils/constants";

export const LangSwitcher = () => {
  const router = useRouter();

  const pathname = usePathname();

  const currentLang = useLocale();

  const onLanguageChange = (nextLang: string) => {
    if (nextLang === currentLang) return;

    router.replace(pathname.replace(/^\/[a-z]{2}/, `/${nextLang}`));
  };

  return (
    <div className="py-4.5 px-5 rounded-xl bg-zinc-100 text-neutral-500 text-xl font-medium">
      {LANGUAGES.map(({ code, label }, i) => (
        <button key={i} onClick={() => onLanguageChange(code)}>
          {label}
        </button>
      ))}
    </div>
  );
};
