// This file initializes i18next before React renders anything.
// It's kept separate from LocaleContext to ensure translations are available
// immediately on first render (no flicker or re-render).
// This also allows i18n to be imported and used anywhere (outside React),
// like in tests, utilities, or server-side code if needed.

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import storage from '@/lib/storage'
import en from '@/locales/en.json'
import ua from '@/locales/ua.json'

export const LOCALE_STORAGE_KEY = 'preferred_locale'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ua: { translation: ua }
  },
  lng: storage.get(LOCALE_STORAGE_KEY, 'en'),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
