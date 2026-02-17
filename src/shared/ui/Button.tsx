import { cn } from "@shared/utils/cn";
import type { ButtonProps } from "./ui.types";
import { cx } from "@shared/utils/cx";

const additionalClassName = (variant: string) => {
  switch (variant) {
    case "outlined":
      return "border border-outline text-light-primary hover:bg-light-primary/70"
    case "secondary":
      return "bg-extra text-light-primary hover:bg-light-primary/70"
    default:
      return "bg-primary text-primary-foreground opacity-90 hover:opacity-100"
  }
}

const variantClassName = (variant: string) => {
  const baseClassName = "flex items-center gap-4 justify-center font-medium"
  return cn(baseClassName, additionalClassName(variant))
}
const sizeClassName = (size: string) => {
  switch (size) {
    case "lg":
      return "h-12 px-8 py-4 text-lg"
    default:
      return "h-8 px-4 py-2 text-[10px] rounded-[14px] md:rounded-[18px] md:text-[14px] md:h-10 lg:h-12 lg:text-base lg:rounded-[24px] has-[>svg]:px-3"
  }
}

export default function Button({
  className,
  variant,
  size,
  children,
  isLoading,
  ...props
}: React.ComponentProps<"button"> & ButtonProps) {

  return (
    <button
      {...props}
      className={cx(variantClassName(variant ?? "default"), sizeClassName(size ?? "default"), isLoading && "opacity-70!", className)}
      disabled={isLoading}
    >
      {children}
    </button>
  )
}