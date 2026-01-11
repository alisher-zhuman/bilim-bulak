import { Form } from "@heroui/react";
import { useTranslations } from "next-intl";

export const SignUpWorkForm = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("signUpWorkForm.title")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        {t("signUpWorkForm.step2")}
      </p>

      <Form className="mt-8 lg:mt-10 w-full flex flex-col gap-4 lg:gap-5"></Form>
    </div>
  );
};
