import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useFavoritesStore } from "../store/favorites";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FavoriteButton({ id }: { id: number }) {
  const isFavorite = useFavoritesStore((s) => s.favoriteIds.includes(id));
  const toggle = useFavoritesStore((s) => s.toggle);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const handlePress = () => {
    scale.set(withSequence(
      withSpring(1.4, { damping: 4, stiffness: 300 }),
      withSpring(1)
    ));
    toggle(id);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={animatedStyle}
      hitSlop={12}
    >
      <Animated.Text className="text-2xl">
        {isFavorite ? "❤️" : "🤍"}
      </Animated.Text>
    </AnimatedPressable>
  );
}
