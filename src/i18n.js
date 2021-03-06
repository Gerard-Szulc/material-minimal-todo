import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json'
import pl from './locales/pl/translation.json'
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            en: {translation: en},
            pl: {translation: pl}
        },
        supportedLngs: ["en", "pl"],
        fallbackLng: 'en',
        debug: process.env.NODE_ENV !== 'production',

        interpolation: {
            // escapeValue: false, // not needed for react as it escapes by default
        }
    });
export default i18n;
