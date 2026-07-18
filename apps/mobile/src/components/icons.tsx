import Svg, { Path, Line, Circle } from "react-native-svg";

interface IconProps {
  color: string;
  size?: number;
}

export function WindIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        d="M3 8h11a3 3 0 1 0-3-3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 16h14a3 3 0 1 1-3 3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HeartIcon({ color, size = 22, filled }: IconProps & { filled: boolean }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        d="M12 20s-7.5-4.6-10-9.3C.6 7.4 2.3 4 5.6 4c1.9 0 3.4 1 4.4 2.4C11 5 12.5 4 14.4 4c3.3 0 5 3.4 3.6 6.7C19.5 15.4 12 20 12 20z"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function StarIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <Path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.8L12 17.6 5.9 21.1l1.5-6.8L2.2 9.6l6.9-.7z" />
    </Svg>
  );
}

export function BackIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Direction arrow, rotated by the caller to point where the wind blows. */
export function DirectionArrow({ color, size = 18 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Line x1="12" y1="21" x2="12" y2="3" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M6 9l6-6 6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="21" r="1.5" fill={color} />
    </Svg>
  );
}
