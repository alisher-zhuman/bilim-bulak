import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { LangSwitcher } from "@/shared/ui/lang-switcher";
import { Logo } from "@/shared/ui/logo";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const Header = () => {
  const t = useTranslations();

  const router = useRouter();

  const isAuthed = useAuthStore((s) => Boolean(s.token));
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const navigateToSignIn = () => router.push(`/auth/sign-in`);
  const navigateToProfile = () => router.push("/user/profile");

  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="max-w-400 m-auto py-3 px-4 md:p-5 flex justify-between items-center">
        <Logo />

        {isAuthed ? (
          <nav className="flex items-center gap-12">
            <Link
              href="/user/tests"
              className="text-sm md:text-xl font-medium text-neutral-500 hover:text-blue-700 transition-all"
            >
              {t("nav.tests")}
            </Link>

            <Link
              href="/user/courses"
              className="text-sm md:text-xl font-medium text-neutral-500 hover:text-blue-700 transition-all"
            >
              {t("nav.courses")}
            </Link>
          </nav>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-4">
          <LangSwitcher />

          <Button
            onClick={isAuthed ? navigateToProfile : navigateToSignIn}
            className="bg-blue-700 rounded-xl font-medium text-sm md:text-xl py-3 px-4 md:py-4 md:px-5 h-fit w-fit"
          >
            {isAuthed ? t("common.profile") : t("common.login")}
          </Button>
        </div>
      </div>
    </header>
  );
};
