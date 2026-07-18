import { useId } from "react";
import Svg, { Defs, LinearGradient as SvgLinearGradient, RadialGradient, Stop, Rect, Path } from "react-native-svg";
import { getSpotArt } from "@kitecast/tokens";

interface SpotHeroProps {
  slug: string;
  size?: "sm" | "lg";
}

/**
 * Native port of apps/web's SpotHero: same sky gradient + three layered
 * swell paths, same viewBox and path data, just react-native-svg instead of
 * DOM SVG. Kept visually identical on purpose so the two platforms read as
 * one product.
 */
export function SpotHero({ slug, size = "sm" }: SpotHeroProps) {
  const uid = useId();
  const art = getSpotArt(slug);
  const skyId = `sky-${uid}`;
  const glowId = `glow-${uid}`;
  const [back, mid, front] = art.waves;

  return (
    <Svg viewBox="0 0 400 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <SvgLinearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={art.skyTop} />
          <Stop offset="100%" stopColor={art.skyBottom} />
        </SvgLinearGradient>
        <RadialGradient id={glowId} cx="72%" cy="38%" r="45%">
          <Stop offset="0%" stopColor={art.skyBottom} stopOpacity={0.9} />
          <Stop offset="100%" stopColor={art.skyBottom} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Rect width="400" height="240" fill={`url(#${skyId})`} />
      <Rect width="400" height="240" fill={`url(#${glowId})`} />

      <Path d="M0 150 Q 60 130 120 148 T 240 146 T 400 138 V240 H0 Z" fill={back} opacity={0.55} />
      <Path d="M0 178 Q 70 160 140 176 T 280 172 T 400 168 V240 H0 Z" fill={mid} opacity={0.75} />
      <Path
        d="M0 206 Q 80 190 160 204 T 320 200 T 400 198 V240 H0 Z"
        fill={front}
        opacity={size === "lg" ? 0.9 : 0.85}
      />
    </Svg>
  );
}
