import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-5xl mb-4">⚠️</Text>
      <Text className="text-gray-400 text-base text-center mb-6">
        {t("errors.fetchFailed")}
      </Text>
      <Pressable
        onPress={onRetry}
        className="bg-green-600 px-6 py-3 rounded-xl active:opacity-70"
      >
        <Text className="text-white font-semibold text-sm">
          {t("errors.retry")}
        </Text>
      </Pressable>
    </View>
  );
}
