"use client";
import { type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Form, cn, InputOTP } from "@heroui/react";
import { toast } from "sonner";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { formatKgPhone } from "@/shared/lib/utils/helpers";
import { useVerifyOtp, useResendOtp } from "@/entities/otp/model/api/queries";
import { usePersistentCountdown } from "../../lib/hooks/usePersistentCountdown";

const slotClass =
  "w-10 h-10 lg:w-15 lg:h-15 rounded-xl bg-[#F5F5F5] " +
  "flex items-center justify-center " +
  "text-xl lg:text-2xl font-medium text-neutral-900 " +
  "border border-transparent " +
  "data-[active=true]:border-blue-700 data-[active=true]:bg-white " +
  "data-[filled=true]:border-[#E5E5E5]";

export const OtpForm = () => {
  const [otp, setOtp] = useState("");

  const phoneRaw = useSignUpStore((s) => s.firstStep?.phone);

  const timerKey = `otp_resend_expireAt:${phoneRaw}`;

  const { mmss, isExpired, restart } = usePersistentCountdown({
    key: timerKey,
    durationSec: 60,
  });

  const phone = formatKgPhone(phoneRaw);

  const t = useTranslations();

  const verifyM = useVerifyOtp();
  const resendM = useResendOtp();

  const isConfirmDisabled =
    otp.length !== 6 || verifyM.isPending || resendM.isPending;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      phone: phoneRaw ?? "",
      code: otp,
      type: "REGISTRATION" as const,
    };

    await toast.promise(verifyM.mutateAsync(payload), {
      loading: t("otpPage.loading"),
      success: () => t("otpPage.success"),
      error: (err) => {
        const msg = err?.response?.data?.message;

        if (msg === "The OTP has expired. Please request a new code.") {
          return t("otpPage.error");
        }

        return t("common.requestError");
      },
    });
  };

  const onResend = async () => {
    if (!isExpired || resendM.isPending) return;

    const payload = {
      phone: phoneRaw ?? "",
      type: "REGISTRATION" as const,
    };

    await toast.promise(resendM.mutateAsync(payload), {
      loading: t("otpPage.resendLoading"),
      success: () => {
        restart();
        setOtp("");
        return t("otpPage.resendSuccess");
      },
      error: (err) => {
        const msg = err?.response?.data?.message;

        return msg ? msg : t("common.requestError");
      },
    });
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("otpPage.formTitle")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2 text-center">
        {t("otpPage.formDescription", { phone })}
      </p>

      <Form
        className="mt-10 lg:mt-15 w-full flex flex-col gap-8 lg:gap-10"
        onSubmit={onSubmit}
      >
        <div className="w-full flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            inputMode="numeric"
            pattern="\d*"
            pasteTransformer={(text) => text.replace(/\D/g, "").slice(0, 6)}
            className="w-full flex items-center justify-center"
          >
            <InputOTP.Group className="flex gap-3 lg:gap-4">
              <InputOTP.Slot index={0} className={slotClass} />
              <InputOTP.Slot index={1} className={slotClass} />
              <InputOTP.Slot index={2} className={slotClass} />
              <InputOTP.Slot index={3} className={slotClass} />
              <InputOTP.Slot index={4} className={slotClass} />
              <InputOTP.Slot index={5} className={slotClass} />
            </InputOTP.Group>
          </InputOTP>
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => console.log("Wrong number (later)")}
            variant="ghost"
            size="sm"
            isDisabled={verifyM.isPending || resendM.isPending}
            className="px-0 min-w-0 h-auto hover:bg-transparent font-medium text-sm lg:text-xl text-blue-700"
          >
            {t("otpPage.wrongNumber")}
          </Button>
        </div>

        <Button
          type="submit"
          isDisabled={isConfirmDisabled}
          className={cn(
            "w-full h-fit rounded-xl font-medium text-sm lg:text-xl py-3 lg:py-4.5",
            isConfirmDisabled
              ? "bg-[#EEEEEE] text-[#A9A9A9]"
              : "bg-blue-700 text-white"
          )}
        >
          {verifyM.isPending ? t("common.loading") : t("otpPage.confirm")}
        </Button>

        <div className="flex justify-center">
          <Button
            type="button"
            onClick={onResend}
            variant="ghost"
            size="sm"
            isDisabled={!isExpired || resendM.isPending || verifyM.isPending}
            className="px-0 min-w-0 h-auto hover:bg-transparent mt-3 flex items-center justify-center gap-2 font-medium text-sm lg:text-xl"
          >
            <span className="text-neutral-500">{t("otpPage.resendLabel")}</span>
            <span className="text-blue-700">
              {isExpired ? t("common.retry") : mmss}
            </span>
          </Button>
        </div>
      </Form>
    </div>
  );
};
