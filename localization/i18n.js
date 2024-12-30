import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { en, fr, el, sv } from './translations';
import { store, getLanguage, setLanguage } from '../store'

const languageDetectorPlugin = {
    type: 'languageDetector',
    async: true,
    init: () => { },
    detect: async (callback) => {
        try {
            const str = store.getState();
            const language = getLanguage(str);
            if (language) {
                // If language was stored before, use this language in the app
                callback(language);
            } else {
                // If language was not stored yet, use English
                callback('en');
            }
        } catch (error) {
            console.log('Error reading language', error);
        }
    },
    cacheUserLanguage: (language) => {
        try {
            store.dispatch(setLanguage(language));
        } catch (error) { }
    }
};

const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    el: {
        translation: el,
    },
    sv: {
        translation: sv,
    },
};

i18n
    .use(initReactI18next)
    .use(languageDetectorPlugin)
    .init({
        resources,
        compatibilityJSON: 'v3',
        // Fallback language is set to English
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
