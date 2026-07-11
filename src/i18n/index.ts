import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uk from "./uk.json";
import en from "./en.json";

import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "settings-storage" });
const savedLanguage = storage.getString("language") || "en";

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: uk },
    en: { translation: en },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  storage.set("language", lng);
});

export default i18n;
