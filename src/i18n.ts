import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import i18nConfig from './utils/i18n';

const { CACHE, LANGUAGES } = i18nConfig;

const fallbackLng = [LANGUAGES.EN];
const supportedLngs = Object.values(LANGUAGES);

const detectionOptions = {
  order: ['localStorage'],
  // keys to lookup language from
  lookupLocalStorage: CACHE.LOCAL_STORAGE,
  // cache user language on
  caches: ['localStorage'],
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    fallbackLng,
    detection: detectionOptions,
    supportedLngs,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
