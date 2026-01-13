"use client";
import PhoneInput from "react-phone-input-2";
import { Label, cn } from "@heroui/react";
import "react-phone-input-2/lib/style.css";
import "./index.css";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

const KG_PREFIX = "996";

const formatKgPhoneDigits = (raw: string | number) => {
  let digits = String(raw || "").replace(/\D/g, "");

  if (!digits.startsWith(KG_PREFIX)) digits = KG_PREFIX + digits;

  const tail = digits.slice(KG_PREFIX.length).slice(0, 9);

  return KG_PREFIX + tail;
};

export const PhoneInputField = ({
  label,
  value,
  onChange,
  onBlur,
  disabled = false,
  placeholder = "+996 700 000 000",
  className,
  error = false,
  errorMessage,
}: Props) => {
  const libValue = String(value || KG_PREFIX).replace(/\D/g, "");

  const hasUserDigits =
    libValue.replace(/\D/g, "").slice(KG_PREFIX.length).length > 0;

  return (
    <div className={cn("flex flex-col", className)}>
      <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
        {label}
      </Label>

      <div
        className={cn(
          "phone-input",
          error && "phone-input--error",
          disabled && "phone-input--disabled",
          hasUserDigits ? "phone-input--filled" : "phone-input--empty"
        )}
      >
        <PhoneInput
          country="kg"
          onlyCountries={["kg"]}
          preferredCountries={["kg"]}
          disableDropdown
          countryCodeEditable={false}
          enableSearch={false}
          disableSearchIcon
          value={libValue}
          placeholder={placeholder}
          disabled={disabled}
          inputProps={{ inputMode: "tel", autoComplete: "tel" }}
          onBlur={onBlur}
          onChange={(raw) => onChange(formatKgPhoneDigits(raw))}
        />
      </div>

      {errorMessage && (
        <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
