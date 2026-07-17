"use client";

import { StaggerGrid, StaggerItem } from "./StaggerGrid";
import { SpotCard } from "./SpotCard";
import type { Spot } from "@/lib/types";

export function SpotsShowcase({ featured, rest }: { featured: Spot; rest: Spot[] }) {
  return (
    <StaggerGrid className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-coral-deep">
          Best conditions right now
        </p>
        <StaggerItem>
          <SpotCard spot={featured} variant="featured" />
        </StaggerItem>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((spot) => (
          <StaggerItem key={spot.slug}>
            <SpotCard spot={spot} />
          </StaggerItem>
        ))}
      </div>
    </StaggerGrid>
  );
}
