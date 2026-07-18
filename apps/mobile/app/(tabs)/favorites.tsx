import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@kitecast/tokens";
import { SpotCard } from "@/src/components/SpotCard";
import { spots } from "@/src/lib/spots-data";
import { useFavorites } from "@/src/lib/favorites-context";
import { HeartIcon } from "@/src/components/icons";

export default function FavoritesScreen() {
  const { favoriteSlugs } = useFavorites();
  const favorites = spots.filter((spot) => favoriteSlugs.includes(spot.slug));

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.surface }} edges={["top"]}>
      <FlatList
        data={favorites}
        keyExtractor={(spot) => spot.slug}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-3xl font-bold" style={{ color: colors.ink }}>
              Favorites
            </Text>
            <Text className="mt-1" style={{ color: colors.inkSoft }}>
              Spots you have saved, kept for this session.
            </Text>
          </View>
        }
        renderItem={({ item }) => <SpotCard spot={item} />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center gap-3 py-16">
            <HeartIcon color={colors.coral} size={32} filled={false} />
            <Text className="text-base font-semibold" style={{ color: colors.ink }}>
              No favorites yet
            </Text>
            <Text className="text-center" style={{ color: colors.inkSoft }}>
              Tap the heart on any spot to save it here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
