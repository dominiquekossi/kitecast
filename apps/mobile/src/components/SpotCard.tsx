import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Card, FavoriteButton } from "@kitecast/ui-native";
import { getSpotArt, colors } from "@kitecast/tokens";
import { getWindLevel } from "@/src/lib/wind";
import { useFavorites } from "@/src/lib/favorites-context";
import { StarIcon } from "./icons";
import { SpotHero } from "./SpotHero";
import type { Spot } from "@/src/lib/types";

const TONE_TEXT: Record<string, string> = {
  light: colors.muted,
  good: colors.wind.good,
  moderate: colors.wind.moderate,
  strong: colors.wind.strong,
};

export function SpotCard({ spot }: { spot: Spot }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const art = getSpotArt(spot.slug);
  const level = getWindLevel(spot.wind.speedKnots);

  return (
    <Card interactive style={{ marginBottom: 16 }}>
      <Pressable onPress={() => router.push(`/spot/${spot.slug}`)}>
        <View style={{ height: 140 }}>
          <View style={{ position: "absolute", inset: 0 }}>
            <SpotHero slug={spot.slug} size="sm" />
          </View>

          <LinearGradient
            colors={["transparent", "rgba(10,42,56,0.5)"]}
            style={{ position: "absolute", inset: 0 }}
          />

          <View style={{ flex: 1, padding: 12, justifyContent: "space-between" }}>
            <View
              className="flex-row items-center self-start rounded-full px-2.5 py-1"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            >
              <Text className="text-xs font-bold" style={{ color: TONE_TEXT[level.tone] }}>
                {spot.wind.speedKnots}kt
              </Text>
            </View>

            <View>
              <Text className="text-lg font-bold text-white">{spot.name}</Text>
              <Text className="text-sm text-white/80">
                {spot.region}, {spot.country}
              </Text>
            </View>
          </View>
        </View>

        <View className="p-4">
          <Text className="text-sm" style={{ color: colors.inkSoft }} numberOfLines={2}>
            {spot.summary}
          </Text>
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-xs font-medium uppercase" style={{ color: art.accent }}>
              {spot.waterType} &middot; {spot.level}
            </Text>
            <View className="flex-row items-center gap-1">
              <StarIcon color={art.accent} />
              <Text className="text-sm font-semibold" style={{ color: art.accent }}>
                {spot.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      <View style={{ position: "absolute", right: 12, top: 12 }}>
        <FavoriteButton
          favorited={isFavorite(spot.slug)}
          onToggle={() => toggleFavorite(spot.slug)}
          accentColor={art.accent}
        />
      </View>
    </Card>
  );
}
