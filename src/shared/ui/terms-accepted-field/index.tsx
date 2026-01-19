import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Controller,
  type Control,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { Checkbox, cn } from "@heroui/react";

type WithTermsAccepted = {
  termsAccepted: boolean;
};

interface Props<TFormValues extends FieldValues & WithTermsAccepted> {
  control: Control<TFormValues>;
  errorMessage?: string;
  className?: string;
}

export const TermsAcceptedField = <
  TFormValues extends FieldValues & WithTermsAccepted
>({
  control,
  errorMessage,
  className,
}: Props<TFormValues>) => {
  const t = useTranslations();

  return (
    <div className={cn("flex flex-col", className)}>
      <Controller<TFormValues, FieldPath<TFormValues>>
        name={"termsAccepted" as FieldPath<TFormValues>}
        control={control}
        render={({ field }) => (
          <div className="flex items-start gap-2.5">
            <Checkbox
              id="sign-up"
              className="mt-0.5"
              isSelected={!!field.value}
              onChange={(selected: boolean) => field.onChange(selected)}
              onBlur={field.onBlur}
            >
              <Checkbox.Control className="bg-neutral-200">
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox>

            <p className="text-xs lg:text-sm text-neutral-500 font-medium">
              {t("signUpForm.termsText")} <br />
              <Link href="/user/terms" className="text-blue-700">
                {t("signUpForm.userAgreement")}
              </Link>{" "}
              {t("signUpForm.and")}{" "}
              <Link href="/user/privacy" className="text-blue-700">
                {t("signUpForm.privacyPolicy")}
              </Link>
            </p>
          </div>
        )}
      />

      {errorMessage && (
        <p className="text-xs lg:text-sm text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};
