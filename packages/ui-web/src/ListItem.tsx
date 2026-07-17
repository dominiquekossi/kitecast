import type { LiHTMLAttributes } from "react";
import type { ListItemContract } from "@kitecast/tokens";
import { cn } from "./cn";

export interface ListItemProps extends ListItemContract, LiHTMLAttributes<HTMLLIElement> {}

export function ListItem({ interactive, className, ...rest }: ListItemProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-4 rounded-md border border-line bg-card px-4 py-3",
        interactive && "transition-colors hover:border-ocean/40 hover:bg-ocean-soft/50",
        className,
      )}
      {...rest}
    />
  );
}
