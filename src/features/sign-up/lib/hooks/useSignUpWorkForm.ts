"use client";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { SignUpWorkSchema } from "@/entities/sign-up/model/schemas";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";

export const useSignUpWorkForm = () => {
  const secondStep = useSignUpStore((s) => s.secondStep);
  const setSecondStep = useSignUpStore((s) => s.setSecondStep);

  const defaultValues = useMemo<SignUpWorkFormValues>(
    () => ({
      regionId: secondStep?.regionId ?? 0,
      districtId: secondStep?.districtId ?? 0,
      organizationTypeId: secondStep?.organizationTypeId ?? 0,
      organizationId: secondStep?.organizationId ?? 0,
    }),
    [secondStep]
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpWorkFormValues>({
    resolver: zodResolver(SignUpWorkSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const values = useWatch({ control }) as SignUpWorkFormValues;

  useEffect(() => {
    setSecondStep(values);
  }, [values, setSecondStep]);

  const regionId = useWatch({ control, name: "regionId" });
  const districtId = useWatch({ control, name: "districtId" });
  const organizationTypeId = useWatch({ control, name: "organizationTypeId" });
  const organizationId = useWatch({ control, name: "organizationId" });

  return {
    control,
    handleSubmit,
    setValue,
    isSubmitting,

    regionId,
    districtId,
    organizationTypeId,
    organizationId,
  };
};
