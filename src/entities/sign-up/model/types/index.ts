import { z } from "zod";
import { SignUpFirstStepSchema } from "../schemas";

export type SignUpFirstStepFormValues = z.infer<typeof SignUpFirstStepSchema>;
