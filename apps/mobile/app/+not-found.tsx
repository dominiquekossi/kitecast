import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View className="flex-1 items-center justify-center gap-4 bg-white p-5">
        <Text className="text-lg font-semibold text-slate-900">This screen doesn't exist.</Text>
        <Link href="/" className="py-4">
          <Text className="text-base text-sky-700">Go to Spots</Text>
        </Link>
      </View>
    </>
  );
}
