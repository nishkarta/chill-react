import { cx } from "@shared/utils/cx";
import { forwardRef, useId } from "react";
import type { TextAreaProps } from "./ui.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
    }, ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `${name ?? "input"}-${autoId}`;

    const describedByIds: string[] = [];
    if (helperText) describedByIds.push(`${inputId}-help`);
    if (error) describedByIds.push(`${inputId}-error`);


    return (
      <div className={cx("w-full", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cx(
              "mb-2 block text-[10px] font-medium text-start md:text-[14px] lg:text-[18px]",
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

          <textarea
            {...props}
            ref={ref}
            id={inputId}
            name={name}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedByIds.length ? describedByIds.join(" ") : undefined}
            className={cx(
              "block w-full rounded-2xl border border-outline bg-transparent px-3 py-2 text-[10px] text-slate-light h-20 md:px-4 md:text-[14px] md:rounded-[18px] md:h-10 lg:text-[16px] lg:h-12.5 lg:rounded-3xl lg:px-5 lg:py-3.5",
              "placeholder:text-light-secondary",
              "focus:outline-none focus:ring-1",
              disabled && "cursor-not-allowed bg-slate-100 text-slate-500",
              error
              && "border-red-500 focus:ring-red-200"
              ,
              className,
              inputClassName
            )}
            onPaste={(e) => {

              const paste = e.clipboardData.getData("text");
              if (!/^\d*\.?\d*$/.test(paste)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              if (!props?.onChange) return
              props.onChange(e)

            }}
          />

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

TextArea.displayName = "TextArea";
