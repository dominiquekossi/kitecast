import type { HTMLAttributes } from "react";
import type { CardContract } from "@kitecast/tokens";
import { cn } from "./cn";

export interface CardProps extends CardContract, HTMLAttributes<HTMLDivElement> {}

export function Card({ interactive, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-card",
        interactive && "transition-all hover:-translate-y-0.5 hover:border-ocean/40 hover:shadow-lg hover:shadow-ink/5",
        className,
      )}
      {...rest}
    />
  );
}
