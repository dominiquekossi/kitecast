"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getSpotArt } from "@kitecast/tokens";
import { getWindLevel } from "@/lib/wind";
import { SpotHero } from "./SpotHero";
import { WindFlow } from "./WindFlow";
import { FavoriteButton } from "./FavoriteButton";
import type { Spot } from "@/lib/types";

interface SpotCardProps {
  spot: Spot;
  variant?: "default" | "featured";
}

export function SpotCard({ spot, variant = "default" }: SpotCardProps) {
  const featured = variant === "featured";
  const level = getWindLevel(spot.wind.speedKnots);
  const art = getSpotArt(spot.slug);

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-lg border border-line bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
    >
      <Link href={`/spots/${spot.slug}`} className="block">
        <div className={featured ? "relative h-64 overflow-hidden sm:h-80" : "relative h-40 overflow-hidden"}>
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <SpotHero slug={spot.slug} size={featured ? "lg" : "sm"} className="h-full w-full" />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />

          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-pill bg-card/90 px-2.5 py-1 backdrop-blur-sm">
            <WindFlow wind={spot.wind} size="sm" className="h-4 w-9" />
            <span className="text-xs font-semibold" style={{ color: TONE_TEXT[level.tone] }}>
              {spot.wind.speedKnots}kt
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className={featured ? "font-display text-2xl font-bold text-white sm:text-3xl" : "font-display text-lg font-semibold text-white"}>
              {spot.name}
            </p>
            <p className="text-sm text-white/80">
              {spot.region}, {spot.country}
            </p>
          </div>
        </div>

        <div className="p-4">
          <p className={featured ? "text-base text-ink-soft" : "line-clamp-2 text-sm text-ink-soft"}>
            {spot.summary}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: art.accent }}
            >
              {spot.waterType} &middot; {spot.level}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: art.accent }}>
              <StarIcon />
              {spot.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      <FavoriteButton
        slug={spot.slug}
        name={spot.name}
        accentColor={art.accent}
        className="absolute right-3 top-3 bg-card/95 backdrop-blur-sm"
      />
    </motion.article>
  );
}

const TONE_TEXT: Record<string, string> = {
  light: "#5F7784",
  good: "#1F9D6B",
  moderate: "#B87F14",
  strong: "#D6483B",
};

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.8L12 17.6 5.9 21.1l1.5-6.8L2.2 9.6l6.9-.7z" />
    </svg>
  );
}
