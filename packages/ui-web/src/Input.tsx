import type { InputHTMLAttributes } from "react";
import type { InputContract, Size } from "@kitecast/tokens";
import { cn } from "./cn";

export interface InputProps
  extends InputContract,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {}

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-3.5 text-[15px]",
  lg: "h-12 px-4 text-base",
};

export function Input({ size = "md", invalid, className, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-card font-body text-ink placeholder:text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40",
        invalid ? "border-coral" : "border-line focus-visible:border-ocean",
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
}
