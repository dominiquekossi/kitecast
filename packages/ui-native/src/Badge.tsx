import { View, Text } from "react-native";
import type { ViewProps } from "react-native";
import type { ReactNode } from "react";
import type { BadgeContract, BadgeTone } from "@kitecast/tokens";
import { colors } from "@kitecast/tokens";
import { withAlpha } from "./utils";

export interface BadgeProps extends BadgeContract, ViewProps {
  children: ReactNode;
}

const TONE_STYLES: Record<BadgeTone, { bg: string; text: string }> = {
  good: { bg: withAlpha(colors.wind.good, 0.12), text: colors.wind.good },
  moderate: { bg: withAlpha(colors.wind.moderate, 0.16), text: colors.wind.moderate },
  strong: { bg: withAlpha(colors.wind.strong, 0.12), text: colors.wind.strong },
  light: { bg: withAlpha(colors.wind.light, 0.16), text: colors.wind.light },
  ocean: { bg: colors.oceanSoft, text: colors.oceanDeep },
  neutral: { bg: colors.surface, text: colors.muted },
};

/** Native counterpart of `@kitecast/ui-web`'s Badge, same tone contract. */
export function Badge({ tone = "neutral", children, style, ...rest }: BadgeProps) {
  const s = TONE_STYLES[tone];
  return (
    <View
      className="flex-row items-center gap-1 self-start rounded-full px-2.5 py-1"
      style={[{ backgroundColor: s.bg }, style]}
      {...rest}
    >
      <Text className="text-xs font-semibold leading-none" style={{ color: s.text }}>
        {children}
      </Text>
    </View>
  );
}
