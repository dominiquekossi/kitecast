import type { ButtonHTMLAttributes } from "react";
import type { ButtonContract, Tone, Variant } from "@kitecast/tokens";
import { cn } from "./cn";

export interface ButtonProps extends ButtonContract, ButtonHTMLAttributes<HTMLButtonElement> {}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-body font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50";

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

const tones: Record<Variant, Record<Tone, string>> = {
  solid: {
    ocean: "bg-ocean text-white hover:bg-ocean-deep",
    coral: "bg-coral text-white hover:bg-coral-deep",
    neutral: "bg-ink text-white hover:bg-ink-soft",
  },
  outline: {
    ocean: "border border-ocean text-ocean-deep hover:bg-ocean-soft",
    coral: "border border-coral text-coral-deep hover:bg-coral-soft",
    neutral: "border border-line text-ink hover:bg-surface",
  },
  ghost: {
    ocean: "text-ocean-deep hover:bg-ocean-soft",
    coral: "text-coral-deep hover:bg-coral-soft",
    neutral: "text-ink hover:bg-surface",
  },
};

export function Button({
  variant = "solid",
  size = "md",
  tone = "ocean",
  fullWidth,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, sizes[size], tones[variant][tone], fullWidth && "w-full", className)}
      {...rest}
    />
  );
}
