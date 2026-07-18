import { View } from "react-native";
import type { ViewProps } from "react-native";
import type { CardContract } from "@kitecast/tokens";
import { colors } from "@kitecast/tokens";

export interface CardProps extends CardContract, ViewProps {}

/** Native counterpart of `@kitecast/ui-web`'s Card. `interactive` adds a soft
 * elevation shadow, there is no hover state to lift on touch devices. */
export function Card({ interactive, style, children, ...rest }: CardProps) {
  return (
    <View
      className="overflow-hidden rounded-lg border"
      style={[
        { backgroundColor: colors.card, borderColor: colors.line },
        interactive && {
          shadowColor: colors.ink,
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
