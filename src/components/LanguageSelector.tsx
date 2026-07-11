import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { FadeIn } from "react-native-reanimated";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const toggleLanguage = () => {
    i18n.changeLanguage(isEn ? "uk" : "en");
  };

  return (
    <Pressable
      onPress={toggleLanguage}
      className="bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700 active:bg-gray-700 mr-2"
      hitSlop={8}
    >
      <Animated.Text
        key={i18n.language}
        entering={FadeIn.duration(300)}
        className="text-white text-sm font-bold uppercase tracking-wider"
      >
        {isEn ? "EN" : "UK"}
      </Animated.Text>
    </Pressable>
  );
}
