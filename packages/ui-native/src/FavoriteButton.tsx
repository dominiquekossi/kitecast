import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "@kitecast/tokens";
import { withAlpha } from "./utils";

export interface FavoriteButtonProps {
  favorited: boolean;
  onToggle: () => void;
  size?: "sm" | "lg";
  /** Idle-state color, e.g. a spot's own mood accent. Falls back to neutral gray. */
  accentColor?: string;
}

const HEART_PATH =
  "M12 20s-7.5-4.6-10-9.3C.6 7.4 2.3 4 5.6 4c1.9 0 3.4 1 4.4 2.4C11 5 12.5 4 14.4 4c3.3 0 5 3.4 3.6 6.7C19.5 15.4 12 20 12 20z";

/**
 * Lives in `ui-native` (not app code) per the brief, self-contained SVG icon
 * so the package never has to import from an app. Favorited/onToggle are
 * props, not tied to any specific favorites store, same shape as the web
 * FavoriteButton but state stays with the caller.
 */
export function FavoriteButton({ favorited, onToggle, size = "sm", accentColor }: FavoriteButtonProps) {
  const dim = size === "sm" ? 36 : 48;
  const iconSize = size === "sm" ? 18 : 22;
  const idleColor = accentColor ?? colors.muted;
  const iconColor = favorited ? colors.coralDeep : idleColor;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: favorited }}
      accessibilityLabel={favorited ? "Remove from favorites" : "Add to favorites"}
      onPress={onToggle}
      className="items-center justify-center rounded-full border"
      style={{
        width: dim,
        height: dim,
        backgroundColor: favorited ? withAlpha(colors.coral, 0.12) : colors.card,
        borderColor: favorited ? colors.coral : idleColor,
      }}
    >
      <Svg viewBox="0 0 24 24" width={iconSize} height={iconSize}>
        <Path
          d={HEART_PATH}
          fill={favorited ? iconColor : "none"}
          stroke={iconColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}
