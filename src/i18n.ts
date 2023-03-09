import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";


i18n
.use(initReactI18next)
.use(detector)
.use(Backend)
.init({
  backend: {
    loadPath: "/i18n/{{lng}}.json"
  },
  debug: true,
  lng: "en",
  fallbackLng: "en",
  saveMissing: true,
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;