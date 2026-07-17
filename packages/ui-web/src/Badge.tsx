import type { HTMLAttributes } from "react";
import type { BadgeContract, BadgeTone } from "@kitecast/tokens";
import { cn } from "./cn";

export interface BadgeProps extends BadgeContract, HTMLAttributes<HTMLSpanElement> {}

const tones: Record<BadgeTone, string> = {
  good: "bg-wind-good/10 text-wind-good",
  moderate: "bg-wind-moderate/15 text-wind-moderate",
  strong: "bg-wind-strong/10 text-wind-strong",
  light: "bg-wind-light/15 text-wind-light",
  ocean: "bg-ocean-soft text-ocean-deep",
  neutral: "bg-surface text-muted",
};

export function Badge({ tone = "neutral", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold leading-none",
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
