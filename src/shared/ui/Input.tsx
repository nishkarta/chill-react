import { cx } from "@shared/utils/cx";
import type { InputProps } from "./ui.types";
import { forwardRef, useId, useState } from "react";
import Icon from "./Icon";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      error,
      containerClassName,
      labelClassName,
      inputClassName,
      helperClassName,
      required,
      requiredMark = true,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `${name ?? "input"}-${autoId}`;

    const describedByIds: string[] = [];
    if (helperText) describedByIds.push(`${inputId}-help`);
    if (error) describedByIds.push(`${inputId}-error`);

    const isPhoneNumber = props?.type === "tel"

    const isNumber = props.type === "number";
    const positiveOnly = isNumber && props.positiveOnly;

    const isPassword = props.type === "password"

    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={cx("w-full", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cx(
              "mb-2 block text-[10px] font-medium text-start md:text-[14px] lg:text[18px]",
              disabled && "text-slate-400",
              labelClassName
            )}
          >
            {label}
            {required && requiredMark ? (
              <span className="ml-1 text-red-500">*</span>
            ) : null}
          </label>
        ) : null}
        <div className="relative">
          {
            isPhoneNumber
            &&
            <span className="absolute text-sm text-neutral-7 left-3 top-1/2 transform -translate-y-1/2">
              +62
            </span>
          }

          <input
            {...props}
            ref={ref}
            id={inputId}
            name={name}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedByIds.length ? describedByIds.join(" ") : undefined}
            className={cx(
              "block w-full rounded-2xl border border-outline bg-transparent px-3 py-2 text-[10px] text-slate-light h-7 md:px-4 md:text-[14px] md:rounded-[18px] md:h-10 lg:text[16px] lg:h-12.5 lg:rounded-3xl lg:px-5 lg:py-3.5",
              "placeholder:text-light-secondary",
              "focus:outline-none focus:ring-1",
              disabled && "cursor-not-allowed bg-slate-100 text-slate-500",
              error
              && "border-red-500 focus:ring-red-200"
              ,
              isPhoneNumber && "pl-10",
              className,
              inputClassName
            )}
            onBeforeInput={(e) => {
              if (!positiveOnly) return;

              const data = (e as unknown as InputEvent).data ?? "";

              // allow only digits and dot (optional, remove dot if you want integer only)
              if (data && !/^[0-9.]$/.test(data)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              if (!positiveOnly) return;

              const paste = e.clipboardData.getData("text");
              if (!/^\d*\.?\d*$/.test(paste)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              if (!props?.onChange) return
              if (positiveOnly) {
                if (Number(e.target.value) < 0) return;
              }
              if (isPhoneNumber) {
                const re = /^(8[0-9]{0,11})$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  props.onChange(e);
                }
                return;
              }
              props.onChange(e)

            }}
            type={showPassword ? "text" : props.type}
          />

          {
            isPassword
            &&
            <Icon className="absolute top-1/2 transform -translate-y-1/2 right-3 w-3 cursor-pointer md:w-4 lg:w-5 md:right-4 lg:right-5" onClick={() => setShowPassword(!showPassword)} icon={!showPassword ? "eye-invisible" : "eye-visible"} />
          }
        </div>


        {error ? (
          <p
            id={`${inputId}-error`}
            className={cx("mt-1 text-sm text-red-600", helperClassName)}
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-help`}
            className={cx("mt-1 text-sm text-slate-500", helperClassName)}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
