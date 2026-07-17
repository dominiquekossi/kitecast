import { getWindLevel, getWindArrowRotation, getFlowDurationSeconds } from "@/lib/wind";
import type { WindCondition } from "@/lib/types";

interface WindFlowProps {
  wind: WindCondition;
  size?: "sm" | "lg";
  className?: string;
}

const TONE_STROKE: Record<string, string> = {
  light: "#7C93A0",
  good: "#1F9D6B",
  moderate: "#D79A24",
  strong: "#D6483B",
};

/**
 * Lines streaming in the direction the wind blows, at a speed proportional to
 * the real reading. Default line geometry points east (0deg); rotation is
 * adjusted -90deg because `getWindArrowRotation` measures from north-up.
 */
export function WindFlow({ wind, size = "sm", className }: WindFlowProps) {
  const level = getWindLevel(wind.speedKnots);
  const stroke = TONE_STROKE[level.tone];
  const duration = getFlowDurationSeconds(wind.speedKnots);
  const rotation = getWindArrowRotation(wind.cardinal) - 90;

  const lines = size === "lg" ? LARGE_LINES : SMALL_LINES;
  const viewBox = size === "lg" ? "0 0 240 120" : "0 0 72 32";
  const cx = size === "lg" ? 120 : 36;
  const cy = size === "lg" ? 60 : 16;

  return (
    <svg viewBox={viewBox} className={className} aria-hidden>
      <g transform={`rotate(${rotation} ${cx} ${cy})`}>
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.x}
            y1={line.y}
            x2={line.x + line.length}
            y2={line.y}
            stroke={stroke}
            strokeWidth={size === "lg" ? 2 : 1.4}
            strokeLinecap="round"
            strokeDasharray="10 18"
            opacity={line.opacity}
            className="animate-wind-flow"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${-i * (duration / lines.length)}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}

const SMALL_LINES = [
  { x: 4, y: 8, length: 20, opacity: 0.9 },
  { x: 0, y: 16, length: 26, opacity: 0.6 },
  { x: 6, y: 24, length: 18, opacity: 0.75 },
];

const LARGE_LINES = [
  { x: 10, y: 20, length: 60, opacity: 0.9 },
  { x: 40, y: 38, length: 80, opacity: 0.55 },
  { x: 0, y: 56, length: 70, opacity: 0.85 },
  { x: 50, y: 74, length: 90, opacity: 0.5 },
  { x: 20, y: 92, length: 65, opacity: 0.75 },
  { x: 60, y: 106, length: 55, opacity: 0.4 },
];
