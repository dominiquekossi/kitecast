import { Tabs } from "expo-router";
import { colors } from "@kitecast/tokens";
import { WindIcon, HeartIcon } from "@/src/components/icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ocean,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { borderTopColor: colors.line },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Spots",
          tabBarIcon: ({ color, size }) => <WindIcon color={color as string} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <HeartIcon color={color as string} size={size} filled={false} />
          ),
        }}
      />
    </Tabs>
  );
}
