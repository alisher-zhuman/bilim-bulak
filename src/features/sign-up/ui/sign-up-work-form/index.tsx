"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@heroui/react";

import { useSignUpStore } from "@/entities/sign-up/model/store";
import { SignUpWorkSchema } from "@/entities/sign-up/model/schemas";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";

import { SelectField } from "@/shared/ui/select-field";
import {
  useGetRegions,
  useGetDistricts,
  useGetOrganizationTypes,
  useGetOrganizations,
} from "@/entities/queries";

export const SignUpWorkForm = () => {
  const t = useTranslations();

  const locale = useLocale() as "kg" | "ru";

  const setSecondStep = useSignUpStore((s) => s.setSecondStep);

  const { control, handleSubmit, setValue } = useForm<SignUpWorkFormValues>({
    resolver: zodResolver(SignUpWorkSchema),
    defaultValues: {
      regionId: 0,
      districtId: 0,
      organizationTypeId: 0,
      organizationId: 0,
    },
    mode: "onSubmit",
  });

  const regionId = useWatch({ control, name: "regionId" });
  const districtId = useWatch({ control, name: "districtId" });
  const organizationTypeId = useWatch({ control, name: "organizationTypeId" });

  const regionsQ = useGetRegions();
  const districtsQ = useGetDistricts(regionId);
  const orgTypesQ = useGetOrganizationTypes();
  const orgsQ = useGetOrganizations(districtId, organizationTypeId);

  useEffect(() => {
    setValue("districtId", 0);
    setValue("organizationTypeId", 0);
    setValue("organizationId", 0);
  }, [regionId, setValue]);

  useEffect(() => {
    setValue("organizationId", 0);
  }, [districtId, setValue]);

  useEffect(() => {
    setValue("organizationId", 0);
  }, [organizationTypeId, setValue]);

  const onSubmit = (values: SignUpWorkFormValues) => {
    setSecondStep({
      ...values,
    });

    console.log(values);
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl text-center lg:text-4xl font-semibold">
        {t("signUpWorkForm.title")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        {t("signUpWorkForm.step2")}
      </p>

      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 lg:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="regionId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.regionLabel")}
              placeholder={
                regionsQ.isPending
                  ? t("signUpWorkForm.loading")
                  : t("signUpWorkForm.regionPlaceholder")
              }
              options={regionsQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={regionsQ.isPending || regionsQ.isError}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
            />
          )}
        />

        <Controller
          name="districtId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.districtLabel")}
              placeholder={
                regionId === 0
                  ? t("signUpWorkForm.selectRegionFirst")
                  : districtsQ.isPending
                  ? t("signUpWorkForm.loading")
                  : t("signUpWorkForm.districtPlaceholder")
              }
              options={districtsQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={
                regionId === 0 || districtsQ.isPending || districtsQ.isError
              }
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
            />
          )}
        />

        <Controller
          name="organizationTypeId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.orgTypeLabel")}
              placeholder={
                orgTypesQ.isPending
                  ? t("signUpWorkForm.loading")
                  : t("signUpWorkForm.orgTypePlaceholder")
              }
              options={orgTypesQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={orgTypesQ.isPending || orgTypesQ.isError}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
            />
          )}
        />

        <Controller
          name="organizationId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.organizationLabel")}
              placeholder={
                districtId === 0 || organizationTypeId === 0
                  ? t("signUpWorkForm.selectDistrictAndTypeFirst")
                  : orgsQ.isPending
                  ? t("signUpWorkForm.loading")
                  : t("signUpWorkForm.organizationPlaceholder")
              }
              options={orgsQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={
                districtId === 0 ||
                organizationTypeId === 0 ||
                orgsQ.isPending ||
                orgsQ.isError
              }
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
            />
          )}
        />

        <Button type="submit" className="w-full">
          {t("signUpWorkForm.continue")}
        </Button>
      </Form>
    </div>
  );
};
