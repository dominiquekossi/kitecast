import { ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Badge, FavoriteButton } from "@kitecast/ui-native";
import { getSpotArt, colors } from "@kitecast/tokens";
import { getWindLevel, getWindArrowRotation } from "@/src/lib/wind";
import { spots } from "@/src/lib/spots-data";
import { useFavorites } from "@/src/lib/favorites-context";
import { BackIcon, DirectionArrow } from "@/src/components/icons";
import { SpotHero } from "@/src/components/SpotHero";

export default function SpotDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const spot = spots.find((s) => s.slug === slug);
  if (!spot) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: colors.surface }}>
        <Text style={{ color: colors.ink }}>Spot not found.</Text>
      </SafeAreaView>
    );
  }

  const art = getSpotArt(spot.slug);
  const level = getWindLevel(spot.wind.speedKnots);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.surface }}>
      <View style={{ height: 220 }}>
        <View style={{ position: "absolute", inset: 0 }}>
          <SpotHero slug={spot.slug} size="lg" />
        </View>
        <LinearGradient
          colors={["transparent", "rgba(10,42,56,0.55)"]}
          style={{ position: "absolute", inset: 0 }}
        />

        <SafeAreaView edges={["top"]}>
          <View className="flex-row items-center justify-between px-4 pt-2">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center gap-1.5 self-start rounded-full px-3 py-1.5"
              style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
            >
              <BackIcon color={colors.ink} size={16} />
              <Text className="text-sm font-medium" style={{ color: colors.ink }}>
                All spots
              </Text>
            </Pressable>

            <FavoriteButton
              favorited={isFavorite(spot.slug)}
              onToggle={() => toggleFavorite(spot.slug)}
              size="lg"
            />
          </View>
        </SafeAreaView>

        <View className="absolute bottom-4 left-4 right-4">
          <Text className="text-xs font-medium uppercase text-white/80">
            {spot.region}, {spot.country}
          </Text>
          <Text className="text-3xl font-bold text-white">{spot.name}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View
          className="rounded-lg border p-4"
          style={{ backgroundColor: colors.card, borderColor: colors.line }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold uppercase" style={{ color: colors.muted }}>
              Current condition
            </Text>
            <Badge tone={level.tone}>{level.label}</Badge>
          </View>

          <View className="mt-4 flex-row justify-between">
            <Stat label="Wind" value={`${spot.wind.speedKnots}kt`} />
            <Stat label="Gusts" value={`${spot.wind.gustKnots}kt`} />
            <View>
              <Text className="text-xs font-medium uppercase" style={{ color: colors.muted }}>
                Direction
              </Text>
              <View className="mt-1 flex-row items-center gap-1.5">
                <View
                  style={{ transform: [{ rotate: `${getWindArrowRotation(spot.wind.cardinal)}deg` }] }}
                >
                  <DirectionArrow color={colors.ocean} />
                </View>
                <Text className="text-2xl font-bold" style={{ color: colors.ink }}>
                  {spot.wind.cardinal}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 flex-row gap-3">
          <InfoCard label="Best months" value={spot.bestMonths} />
          <InfoCard label="Level" value={spot.level} />
        </View>
        <View className="mt-3">
          <InfoCard label="Water" value={spot.waterType} />
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold" style={{ color: colors.ink }}>
            About this spot
          </Text>
          <Text className="mt-2 leading-relaxed" style={{ color: colors.inkSoft }}>
            {spot.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text className="text-xs font-medium uppercase" style={{ color: colors.muted }}>
        {label}
      </Text>
      <Text className="mt-1 text-2xl font-bold" style={{ color: colors.ink }}>
        {value}
      </Text>
    </View>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <View
      className="flex-1 rounded-md border px-4 py-3"
      style={{ backgroundColor: colors.card, borderColor: colors.line }}
    >
      <Text className="text-xs font-medium uppercase" style={{ color: colors.muted }}>
        {label}
      </Text>
      <Text className="mt-0.5 font-medium" style={{ color: colors.ink }}>
        {value}
      </Text>
    </View>
  );
}
