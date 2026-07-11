import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import type { CharacterStatus } from "../types/character";

const STATUS_COLORS: Record<CharacterStatus, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

const STATUS_KEYS: Record<CharacterStatus, string> = {
  Alive: "status.alive",
  Dead: "status.dead",
  unknown: "status.unknown",
};

export default function StatusBadge({ status }: { status: CharacterStatus }) {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center gap-1.5">
      <View className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[status]}`} />
      <Text className="text-xs text-gray-300 font-medium">
        {t(STATUS_KEYS[status])}
      </Text>
    </View>
  );
}
