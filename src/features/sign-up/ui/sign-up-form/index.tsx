"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, InputGroup, Label, TextField } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

import { SignUpFirstStepFormValues } from "@/entities/sign-up/model/types";
import { SignUpFirstStepSchema } from "@/entities/sign-up/model/schemas";
import { PhoneInputField } from "@/shared/ui/phone-input-field";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const t = useTranslations();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFirstStepFormValues>({
    resolver: zodResolver(SignUpFirstStepSchema),
    defaultValues: {
      fullName: "",
      phone: "996",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: SignUpFirstStepFormValues) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("signUpForm.title")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        {t("signUpForm.step1")}
      </p>

      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 md:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField name="fullName">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            {t("signUpForm.fullNameLabel")}
          </Label>

          <InputGroup.Input
            {...register("fullName")}
            autoComplete="name"
            className="placeholder:text-[#A9A9A9] focus:border-blue-700 py-3.5 px-4 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg"
            placeholder={t("signUpForm.fullNamePlaceholder")}
          />

          {errors.fullName?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {t(errors.fullName.message)}
            </p>
          )}
        </TextField>

        <TextField name="phone">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            {t("signUpForm.phoneLabel")}
          </Label>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.phone}
                placeholder="+996 700 000 000"
              />
            )}
          />

          {errors.phone?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {t(errors.phone.message)}
            </p>
          )}
        </TextField>

        <TextField name="password">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            {t("signUpForm.passwordLabel")}
          </Label>

          <div className="relative">
            <InputGroup.Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              className="placeholder:text-[#A9A9A9] w-full focus:border-blue-700 py-3.5 px-4 pr-12 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.password?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {t(errors.password.message)}
            </p>
          )}
        </TextField>

        <TextField name="confirmPassword">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            {t("signUpForm.confirmPasswordLabel")}
          </Label>

          <div className="relative">
            <InputGroup.Input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              className="placeholder:text-[#A9A9A9] w-full focus:border-blue-700 py-3.5 px-4 pr-12 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.confirmPassword?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {t(errors.confirmPassword.message)}
            </p>
          )}
        </TextField>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    </div>
  );
};
