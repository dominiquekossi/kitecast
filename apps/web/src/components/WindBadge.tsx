import { Badge } from "@kitecast/ui-web";
import { getWindLevel } from "@/lib/wind";
import { WindArrow } from "./WindArrow";
import type { WindCondition } from "@/lib/types";

export function WindBadge({ wind }: { wind: WindCondition }) {
  const level = getWindLevel(wind.speedKnots);
  return (
    <Badge tone={level.tone}>
      <WindArrow cardinal={wind.cardinal} />
      {wind.speedKnots}kt {level.label}
    </Badge>
  );
}
