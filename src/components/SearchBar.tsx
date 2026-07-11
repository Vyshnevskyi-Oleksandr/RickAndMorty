import { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(text.trim()), 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text]);

  return (
    <View className="px-4 pt-2 pb-3">
      <TextInput
        className="bg-gray-800 text-white px-4 py-3 rounded-xl text-sm border border-gray-700"
        placeholder={t("search.placeholder")}
        placeholderTextColor="#6b7280"
        value={text}
        onChangeText={setText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}
