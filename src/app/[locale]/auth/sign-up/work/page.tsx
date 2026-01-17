"use client";
import { useRequireSignUpFirstStep } from "@/features/auth/sign-up/lib/hooks/useRequireSignUpFirstStep";
import { SignUpWorkForm } from "@/features/auth/sign-up/ui/sign-up-work-form";
import { useBeforeUnload } from "@/shared/lib/hooks/useBeforeUnload";
import { BackButton } from "@/shared/ui/back-button";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SignUpWork = () => {
  useBeforeUnload({ enabled: true });

  const allowed = useRequireSignUpFirstStep({ redirectTo: "/auth/sign-up" });

  const t = useTranslations();

  if (!allowed) return null;

  return (
    <section className="animate-fade-in max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5 lg:flex items-start justify-between gap-10 lg:px-20">
        <SignUpWorkForm />

        <div className="flex-col items-center hidden lg:flex">
          <Image
            src="/images/sign-up-work.webp"
            alt="Sign Up Work"
            width={472}
            height={472}
          />

          <h2 className="text-3xl font-semibold mt-10 text-center text-orange-400">
            {t("signUpWorkPage.importantNoteTitle")}
          </h2>

          <p className="font-medium text-neutral-500 mt-4 text-center text-balance max-w-181">
            {t("signUpWorkPage.importantNoteText1")}{" "}
            {t("signUpWorkPage.importantNoteText2")}{" "}
            {t("signUpWorkPage.importantNoteText3")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpWork;
