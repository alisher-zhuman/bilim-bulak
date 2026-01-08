"use client";
import PhoneInput from "react-phone-input-2";
import { cn } from "@heroui/react";
import "react-phone-input-2/lib/style.css";
import "./index.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const KG_PREFIX = "996";

export const PhoneInputField = ({
  value,
  onChange,
  onBlur,
  disabled = false,
  placeholder = "+996 700 000 000",
  className,
  error = false,
}: Props) => {
  const libValue = (value || "+996").replace(/^\+/, "").replace(/\D/g, "");

  return (
    <div
      className={cn(
        "phone-input",
        error && "phone-input--error",
        disabled && "phone-input--disabled",
        className
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
        inputProps={{
          inputMode: "tel",
          autoComplete: "tel",
        }}
        onBlur={onBlur}
        onChange={(raw) => {
          let digits = String(raw || "").replace(/\D/g, "");

          if (!digits.startsWith(KG_PREFIX)) digits = KG_PREFIX + digits;

          const tail = digits.slice(KG_PREFIX.length).slice(0, 9);

          onChange("+" + KG_PREFIX + tail);
        }}
      />
    </div>
  );
};
