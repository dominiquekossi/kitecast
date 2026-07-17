"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { getSpots } from "@/lib/spots-repository";
import { SpotCard } from "@/components/SpotCard";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import type { Spot } from "@/lib/types";

export default function FavoritesPage() {
  const { favoriteSlugs, hydrated } = useFavorites();
  const [allSpots, setAllSpots] = useState<Spot[]>([]);

  useEffect(() => {
    getSpots().then(setAllSpots);
  }, []);

  const favorites = allSpots.filter((spot) => favoriteSlugs.includes(spot.slug));
  const loading = !hydrated || allSpots.length === 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Favorites</h1>
        <p className="mt-2 max-w-prose text-ink-soft">
          Spots you have saved, kept on this device.
        </p>
      </div>

      {!loading && favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <StaggerGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((spot) => (
            <StaggerItem key={spot.slug}>
              <SpotCard spot={spot} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-line px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-soft text-coral-deep">
        <HeartIcon />
      </div>
      <h2 className="mt-4 font-display text-lg font-semibold text-ink">No favorites yet</h2>
      <p className="mt-1.5 max-w-sm text-sm text-ink-soft">
        Tap the heart on any spot to save it here for quick access later.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-ocean px-5 text-[15px] font-semibold text-white transition-colors hover:bg-ocean-deep"
      >
        Browse spots
      </Link>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 20s-7.5-4.6-10-9.3C.6 7.4 2.3 4 5.6 4c1.9 0 3.4 1 4.4 2.4C11 5 12.5 4 14.4 4c3.3 0 5 3.4 3.6 6.7C19.5 15.4 12 20 12 20z" />
    </svg>
  );
}
