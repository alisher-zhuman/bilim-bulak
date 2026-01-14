import { api } from "@/shared/api";
import type {
  ResendOtpParams,
  ResendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "../types";

export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  const { data } = await api.post<VerifyOtpResponse>(
    "/auth/verify-otp",
    payload
  );

  return data;
};

export const resendOtp = async (
  params: ResendOtpParams
): Promise<ResendOtpResponse> => {
  const { data } = await api.post<ResendOtpResponse>("/auth/resend-otp", null, {
    params,
  });
  return data;
};
