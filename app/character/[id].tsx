import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useCharacter } from "../../src/api/characters";
import StatusBadge from "../../src/components/StatusBadge";
import FavoriteButton from "../../src/components/FavoriteButton";
import ErrorState from "../../src/components/ErrorState";

function InfoRow({ label, value }: { label: string; value: string }) {
  return value ? (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-800">
      <Text className="text-gray-400 text-sm">{label}</Text>
      <Text className="text-white text-sm font-medium max-w-[60%] text-right">
        {value}
      </Text>
    </View>
  ) : null;
}

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numericId = Number(id);
  const { data: character, isLoading, isError, refetch } = useCharacter(numericId);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-950 items-center justify-center">
        <Stack.Screen options={{ title: "" }} />
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (isError || !character) {
    return (
      <View className="flex-1 bg-gray-950">
        <Stack.Screen options={{ title: "" }} />
        <ErrorState onRetry={refetch} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <Stack.Screen options={{ title: character.name }} />

      <View className="items-center pt-6 pb-4">
        <Image
          source={{ uri: character.image }}
          style={{ width: 180, height: 180, borderRadius: 24 }}
          contentFit="cover"
          transition={300}
        />
      </View>

      <Animated.View
        entering={FadeInDown.duration(400).delay(100)}
        className="px-5 pb-8"
      >
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-white text-2xl font-bold flex-1 mr-3">
            {character.name}
          </Text>
          <FavoriteButton id={character.id} />
        </View>

        <StatusBadge status={character.status} />

        <View className="mt-5 bg-gray-900 rounded-2xl px-4">
          <InfoRow label={t("character.species")} value={character.species} />
          <InfoRow label={t("character.type")} value={character.type} />
          <InfoRow
            label={t("character.gender")}
            value={t(`character.genderValues.${character.gender}`)}
          />
          <InfoRow label={t("character.origin")} value={character.origin.name} />
          <InfoRow label={t("character.location")} value={character.location.name} />
          <InfoRow
            label={t("character.episodes")}
            value={String(character.episode.length)}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}
