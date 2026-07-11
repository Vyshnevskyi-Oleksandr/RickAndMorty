import { memo } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import StatusBadge from "./StatusBadge";
import FavoriteButton from "./FavoriteButton";
import type { CharacterStatus } from "../types/character";

interface CharacterCardProps {
  id: number;
  name: string;
  species: string;
  status: CharacterStatus;
  image: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default memo(function CharacterCard({
  id,
  name,
  species,
  status,
  image,
}: CharacterCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const handlePressIn = () => scale.set(withTiming(0.97, { duration: 100 }));
  const handlePressOut = () => scale.set(withTiming(1, { duration: 150 }));

  return (
    <AnimatedPressable
      onPress={() => router.push(`/character/${id}`)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className="mx-4 mb-3 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50"
    >
      <View className="flex-row items-center p-3">
        <Image
          source={{ uri: image }}
          style={{ width: 64, height: 64, borderRadius: 16 }}
          contentFit="cover"
          recyclingKey={String(id)}
          transition={200}
        />
        <View className="flex-1 ml-3 mr-2">
          <Text className="text-white font-semibold text-base" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>
            {species}
          </Text>
          <View className="mt-1">
            <StatusBadge status={status} />
          </View>
        </View>
        <FavoriteButton id={id} />
      </View>
    </AnimatedPressable>
  );
});
