import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import fr from "./fr.json";
import en from "./en.json";
i18n
    .use(LanguageDetector) // détecte la langue du navigateur
    .use(initReactI18next) // connecte i18n à React
    .init({
    resources: {
        fr: { translation: fr },
        en: { translation: en },
    },
    fallbackLng: "fr", // langue par défaut
    interpolation: { escapeValue: false },
});
export default i18n;
