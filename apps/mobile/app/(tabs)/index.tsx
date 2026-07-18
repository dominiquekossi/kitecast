import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@kitecast/tokens";
import { SpotCard } from "@/src/components/SpotCard";
import { spots } from "@/src/lib/spots-data";

export default function SpotsScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.surface }} edges={["top"]}>
      <FlatList
        data={spots}
        keyExtractor={(spot) => spot.slug}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-3xl font-bold" style={{ color: colors.ink }}>
              Spots
            </Text>
            <Text className="mt-1" style={{ color: colors.inkSoft }}>
              Current wind conditions across {spots.length} kitesurf destinations.
            </Text>
          </View>
        }
        renderItem={({ item }) => <SpotCard spot={item} />}
      />
    </SafeAreaView>
  );
}
