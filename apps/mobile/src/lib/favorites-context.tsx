import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface FavoritesContextValue {
  favoriteSlugs: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * P0: in-memory only, resets when the app reloads. Persisting to
 * AsyncStorage is P1 (see README "Status"): the API here is written so
 * swapping in a persisted version later only touches this one file.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteSlugs,
      isFavorite: (slug) => favoriteSlugs.includes(slug),
      toggleFavorite: (slug) =>
        setFavoriteSlugs((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
    }),
    [favoriteSlugs],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
