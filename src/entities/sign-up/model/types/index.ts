import { z } from "zod";
import { SignUpSchema, SignUpWorkSchema } from "../schemas";

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignUpWorkFormValues = z.infer<typeof SignUpWorkSchema>;

export interface SignUpFirstStepData {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface SignUpSecondStepData {
  regionId: number;
  districtId: number;
  organizationTypeId: number;
  organizationId: number;
}

export type DictionaryItem = {
  id: number;
  nameKg: string;
  nameRu: string;
};

export type District = DictionaryItem & {
  regionId: number;
};

export type Organization = DictionaryItem & {
  districtId: number;
  organizationTypeId: number;
};
