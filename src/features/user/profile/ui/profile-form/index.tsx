import { PhoneInputField } from "@/shared/ui/phone-input-field";
import { Button, cn, Form } from "@heroui/react";
import { useTranslations } from "next-intl";

export const ProfileForm = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center lg:max-w-118 w-full">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("common.profile")}
      </h1>

      <Form className="mt-8 lg:mt-10 w-full flex flex-col gap-4 lg:gap-5">
        <PhoneInputField
          value=""
          label={t("signUpForm.phoneLabel")}
          placeholder="+996 700 000 000"
        />

        <Button
          type="submit"
          className={cn(
            "w-full h-fit rounded-xl font-medium text-sm lg:text-xl py-3 lg:py-4.5",
            false ? "bg-[#EEEEEE] text-[#A9A9A9]" : "bg-blue-700 text-white"
          )}
        >
          {t("newPasswordForm.save")}
        </Button>
      </Form>
    </div>
  );
};
