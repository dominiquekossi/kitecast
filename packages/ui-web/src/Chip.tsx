import type { ButtonHTMLAttributes } from "react";
import type { ChipContract } from "@kitecast/tokens";
import { cn } from "./cn";

export interface ChipProps extends ChipContract, ButtonHTMLAttributes<HTMLButtonElement> {}

export function Chip({ selected, className, type = "button", ...rest }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors",
        selected
          ? "border-ocean bg-ocean text-white"
          : "border-line bg-card text-ink-soft hover:border-ocean/40 hover:text-ink",
        className,
      )}
      {...rest}
    />
  );
}
