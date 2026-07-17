"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "kitecast:favorites";

interface FavoritesContextValue {
  favoriteSlugs: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  /** False until the value has been read from localStorage on the client. */
  hydrated: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFavoriteSlugs(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage: fall back to an empty list.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteSlugs));
  }, [favoriteSlugs, hydrated]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteSlugs,
      isFavorite: (slug) => favoriteSlugs.includes(slug),
      toggleFavorite: (slug) =>
        setFavoriteSlugs((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
      hydrated,
    }),
    [favoriteSlugs, hydrated],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
