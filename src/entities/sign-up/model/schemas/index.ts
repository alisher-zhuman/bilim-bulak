import { z } from "zod";

export const SignUpFirstStepSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Атыңызды толтуруңуз (минимум 2 тамга)")
    .max(100, "Өтө узун"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{8,15}$/, "Телефон номерди туура жазыңыз"),
});
