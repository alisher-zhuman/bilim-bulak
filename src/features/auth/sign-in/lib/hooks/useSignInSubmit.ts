"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type { SignInFormValues } from "@/entities/auth/sign-in/model/types";
import { useLogin } from "@/entities/auth/sign-in/model/api/queries";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const useSignInSubmit = () => {
  const router = useRouter();

  const t = useTranslations();

  const loginM = useLogin();

  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (values: SignInFormValues) => {
    toast.promise(loginM.mutateAsync(values), {
      loading: t("signInForm.loading"),
      success: (res) => {
        setAuth({
          token: res.token,
          user: {
            userId: res.userId,
            phone: res.phone,
            role: res.role,
          },
        });

        router.replace("/user");
        return t("signInForm.success");
      },
      error: (err) => {
        const messsage = err.response.data.message;

        const fallback = t("common.requestError");

        const map: Record<string, string> = {
          "Invalid credentials": t("auth.invalidCredentials"),
        };

        return messsage && map[messsage] ? map[messsage] : fallback;
      },
    });
  };

  return { loginM, onSubmit };
};
