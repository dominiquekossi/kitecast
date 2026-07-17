"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@kitecast/ui-web";
import { useFavorites } from "@/lib/favorites-context";

interface FavoriteButtonProps {
  slug: string;
  name: string;
  size?: "sm" | "lg";
  className?: string;
  /** Idle-state color, drawn from the spot's own mood (see `getSpotArt`), so
   * the button reads as that card's, not a generic gray control. Favoriting
   * still turns coral: that stays the one fixed, app-wide "saved" signal. */
  accentColor?: string;
}

const BURST_DOTS = [0, 60, 120, 180, 240, 300];

export function FavoriteButton({
  slug,
  name,
  size = "sm",
  className,
  accentColor,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const active = hydrated && isFavorite(slug);
  const dim = size === "sm" ? 18 : 22;

  // Bursts only on the click that turns a favorite on, never on mount (so an
  // already-favorited spot loading on the Favorites page doesn't fire one).
  const [burstId, setBurstId] = useState<number | null>(null);
  const clearTimer = useRef<number | null>(null);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const turningOn = !active;
        toggleFavorite(slug);
        if (turningOn) {
          const id = Date.now();
          setBurstId(id);
          if (clearTimer.current) window.clearTimeout(clearTimer.current);
          clearTimer.current = window.setTimeout(() => setBurstId(null), 550);
        }
      }}
      style={
        !active
          ? ({ "--fav-accent": accentColor ?? "#5F7784" } as CSSProperties)
          : undefined
      }
      className={cn(
        "relative inline-flex items-center justify-center overflow-visible rounded-full border transition-colors",
        size === "sm" ? "h-9 w-9" : "h-12 w-12",
        active
          ? "border-coral bg-coral-soft text-coral-deep"
          : "border-[var(--fav-accent)] bg-card text-[var(--fav-accent)] hover:border-coral/50 hover:text-coral",
        className,
      )}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width={dim}
        height={dim}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
        animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <path
          d="M12 20s-7.5-4.6-10-9.3C.6 7.4 2.3 4 5.6 4c1.9 0 3.4 1 4.4 2.4C11 5 12.5 4 14.4 4c3.3 0 5 3.4 3.6 6.7C19.5 15.4 12 20 12 20z"
          fill={active ? "currentColor" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      <AnimatePresence>
        {burstId !== null && (
          <span key={burstId} className="pointer-events-none absolute inset-0" aria-hidden>
            {BURST_DOTS.map((angle) => (
              <motion.span
                key={angle}
                className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-coral"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * dim,
                  y: Math.sin((angle * Math.PI) / 180) * dim,
                  opacity: 0,
                  scale: 0.4,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </span>
        )}
      </AnimatePresence>
    </button>
  );
}
