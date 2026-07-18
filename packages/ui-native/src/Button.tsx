import { Pressable, Text } from "react-native";
import type { PressableProps } from "react-native";
import type { ReactNode } from "react";
import type { ButtonContract, Tone, Variant } from "@kitecast/tokens";
import { colors } from "@kitecast/tokens";

export interface ButtonProps
  extends ButtonContract,
    Omit<PressableProps, "children" | "style" | "disabled"> {
  children: ReactNode;
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
  lg: "h-12 px-6",
};

const TEXT_SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-[15px]",
  lg: "text-base",
};

interface ToneStyle {
  bg: string;
  text: string;
  border?: string;
}

const STYLES: Record<Variant, Record<Tone, ToneStyle>> = {
  solid: {
    ocean: { bg: colors.ocean, text: colors.white },
    coral: { bg: colors.coral, text: colors.white },
    neutral: { bg: colors.ink, text: colors.white },
  },
  outline: {
    ocean: { bg: "transparent", text: colors.oceanDeep, border: colors.ocean },
    coral: { bg: "transparent", text: colors.coralDeep, border: colors.coral },
    neutral: { bg: "transparent", text: colors.ink, border: colors.line },
  },
  ghost: {
    ocean: { bg: "transparent", text: colors.oceanDeep },
    coral: { bg: "transparent", text: colors.coralDeep },
    neutral: { bg: "transparent", text: colors.ink },
  },
};

/** Native counterpart of `@kitecast/ui-web`'s Button, same contract, RN primitives. */
export function Button({
  variant = "solid",
  size = "md",
  tone = "ocean",
  fullWidth,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const s = STYLES[variant][tone];

  return (
    <Pressable
      disabled={disabled}
      className={`flex-row items-center justify-center gap-2 rounded-md ${SIZE_CLASSES[size]} ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "opacity-50" : ""}`}
      style={{
        backgroundColor: s.bg,
        borderWidth: s.border ? 1 : 0,
        borderColor: s.border ?? "transparent",
      }}
      {...rest}
    >
      <Text className={`font-semibold ${TEXT_SIZE_CLASSES[size]}`} style={{ color: s.text }}>
        {children}
      </Text>
    </Pressable>
  );
}
