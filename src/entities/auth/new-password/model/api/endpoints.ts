import { api } from "@/shared/api";
import { ResetPasswordPayload, ResetPasswordResponse } from "../types";

export const resetUserPassword = async (
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  const { data } = await api.post<ResetPasswordResponse>(
    "/auth/reset-password",
    payload
  );

  return data;
};
