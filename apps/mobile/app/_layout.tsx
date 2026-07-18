import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritesProvider } from "@/src/lib/favorites-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="spot/[slug]" options={{ presentation: "card" }} />
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
