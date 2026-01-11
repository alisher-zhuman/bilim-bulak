"use client";
import { Label, ListBox, Select, cn } from "@heroui/react";
import type { Key } from "@heroui/react";
import type { Region } from "@/entities/sign-up/model/types";

interface Props {
  label: string;
  placeholder?: string;
  options: Region[];
  locale: "kg" | "ru";
  value: number | null;
  onChange: (value: number | null) => void;

  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}

const toSelectValue = (id: number | null) => (id === null ? null : String(id));

const toNumberOrNull = (key: Key | null) => {
  if (key === null) return null;
  const n = Number(key);
  return Number.isFinite(n) ? n : null;
};

export const SelectField = ({
  label,
  placeholder,
  options,
  locale,
  value,
  onChange,
  isDisabled,
  isInvalid,
  errorMessage,
  className,
}: Props) => {
  const getLabel = (o: Region) => (locale === "ru" ? o.nameRu : o.nameKg);

  return (
    <div className={cn("flex flex-col", className)}>
      <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
        {label}
      </Label>

      <Select
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        fullWidth
        value={toSelectValue(value)}
        onChange={(next) => onChange(toNumberOrNull(next))}
        className="mt-1"
      >
        <Select.Trigger
          className={cn(
            "w-full bg-[#F5F5F5] rounded-lg py-3.5 px-4 font-medium text-sm lg:text-xl",
            "border border-transparent",
            "flex items-center justify-between gap-3",
            "data-[focus-visible=true]:border-blue-700",
            "data-[disabled=true]:opacity-60"
          )}
        >
          <Select.Value
            className={cn(
              "flex-1 text-left font-medium text-sm lg:text-xl",
              "data-[placeholder=true]:text-[#A9A9A9]"
            )}
          />
          <Select.Indicator className="text-neutral-500" />
        </Select.Trigger>

        <Select.Popover className="mt-2">
          <ListBox>
            {options.map((o) => {
              const text = getLabel(o);
              const id = String(o.id);

              return (
                <ListBox.Item
                  className="text-neutral-600"
                  key={id}
                  id={id}
                  textValue={text}
                >
                  {text}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              );
            })}
          </ListBox>
        </Select.Popover>
      </Select>

      {errorMessage && (
        <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
