import { z } from "zod";

export const SignUpSchema = z
  .object({
    phone: z
      .string()
      .trim()
      .regex(/^996\d{9}$/, "validation.phoneKg"),

    password: z
      .string()
      .trim()
      .min(6, "validation.passwordMin")
      .max(100, "validation.passwordMax"),

    confirmPassword: z.string().trim(),

    termsAccepted: z
      .boolean()
      .refine((v) => v === true, { message: "validation.termsRequired" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordsDontMatch",
    path: ["confirmPassword"],
  });

export const SignUpWorkSchema = z.object({
  regionId: z.number().int().min(1, "validation.regionRequired"),
  districtId: z.number().int().min(1, "validation.districtRequired"),
  organizationTypeId: z.number().int().min(1, "validation.orgTypeRequired"),
  organizationId: z.number().int().min(1, "validation.organizationRequired"),
});
