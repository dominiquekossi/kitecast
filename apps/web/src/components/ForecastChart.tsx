import { getHourlyForecast } from "@/lib/forecast";
import type { Spot } from "@/lib/types";

const WIDTH = 320;
const HEIGHT = 120;
const PAD_X = 8;
const PAD_TOP = 16;
const PAD_BOTTOM = 24;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;
    d += ` Q ${p0.x} ${p0.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
}

export function ForecastChart({ spot }: { spot: Spot }) {
  const forecast = getHourlyForecast(spot);
  const speeds = forecast.map((p) => p.speedKnots);
  const min = Math.min(...speeds);
  const max = Math.max(...speeds);
  const range = Math.max(1, max - min);

  const innerWidth = WIDTH - PAD_X * 2;
  const innerHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const firstHour = forecast[0].hour;
  const lastHour = forecast[forecast.length - 1].hour;

  const plotted = forecast.map((p) => ({
    hour: p.hour,
    speedKnots: p.speedKnots,
    x: PAD_X + ((p.hour - firstHour) / (lastHour - firstHour)) * innerWidth,
    y: PAD_TOP + innerHeight - ((p.speedKnots - min) / range) * innerHeight,
  }));

  const linePath = buildSmoothPath(plotted);
  const areaPath = `${linePath} L ${plotted[plotted.length - 1].x} ${PAD_TOP + innerHeight} L ${plotted[0].x} ${PAD_TOP + innerHeight} Z`;

  const peak = plotted.reduce((a, b) => (b.speedKnots > a.speedKnots ? b : a));
  const ticks = [6, 9, 12, 15, 18];

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Wind speed forecast from 6am to 6pm">
      <defs>
        <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B7A9E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1B7A9E" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill="url(#forecastFill)" />
      <path d={linePath} fill="none" stroke="#0E5A78" strokeWidth="2" strokeLinecap="round" />

      <circle cx={peak.x} cy={peak.y} r="3.5" fill="#0E5A78" />
      <text
        x={Math.min(Math.max(peak.x, 24), WIDTH - 24)}
        y={Math.max(peak.y - 10, 12)}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="#0A2A38"
      >
        {peak.speedKnots}kt
      </text>

      {ticks.map((hour) => {
        const x = PAD_X + ((hour - firstHour) / (lastHour - firstHour)) * innerWidth;
        return (
          <text
            key={hour}
            x={x}
            y={HEIGHT - 6}
            textAnchor="middle"
            fontSize="10"
            fill="#5F7784"
          >
            {hour}h
          </text>
        );
      })}
    </svg>
  );
}
