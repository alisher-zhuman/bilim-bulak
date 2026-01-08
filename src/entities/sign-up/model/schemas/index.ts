import { z } from "zod";

export const SignUpFirstStepSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "validation.fullNameMin")
    .max(100, "validation.fullNameMax"),

  phone: z
    .string()
    .trim()
    .regex(/^996\d{9}$/, "validation.phoneKg"),
});
