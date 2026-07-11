import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function EmptyState() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-5xl mb-4">🔍</Text>
      <Text className="text-gray-400 text-base text-center">
        {t("states.empty")}
      </Text>
    </View>
  );
}
