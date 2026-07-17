import { useId } from "react";
import { getSpotArt } from "@kitecast/tokens";

interface SpotHeroProps {
  slug: string;
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Generative hero art per spot: a sky gradient (its mood drawn from the
 * spot's own token, see packages/tokens) over three layered swell shapes.
 * Pure SVG, server-rendered, no client JS, no stock photography.
 */
export function SpotHero({ slug, size = "sm", className }: SpotHeroProps) {
  const uid = useId();
  const art = getSpotArt(slug);
  const skyId = `sky-${uid}`;
  const glowId = `glow-${uid}`;
  const [back, mid, front] = art.waves;

  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label=""
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={art.skyTop} />
          <stop offset="100%" stopColor={art.skyBottom} />
        </linearGradient>
        <radialGradient id={glowId} cx="72%" cy="38%" r="45%">
          <stop offset="0%" stopColor={art.skyBottom} stopOpacity="0.9" />
          <stop offset="100%" stopColor={art.skyBottom} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="240" fill={`url(#${skyId})`} />
      <rect width="400" height="240" fill={`url(#${glowId})`} />

      <path
        d="M0 150 Q 60 130 120 148 T 240 146 T 400 138 V240 H0 Z"
        fill={back}
        opacity="0.55"
      />
      <path
        d="M0 178 Q 70 160 140 176 T 280 172 T 400 168 V240 H0 Z"
        fill={mid}
        opacity="0.75"
      />
      <path
        d="M0 206 Q 80 190 160 204 T 320 200 T 400 198 V240 H0 Z"
        fill={front}
        opacity={size === "lg" ? 0.9 : 0.85}
      />
    </svg>
  );
}
