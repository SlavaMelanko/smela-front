import { localStorage } from '@/lib/storage'

const Key = {
  THEME: 'theme',
  LOCALE: 'locale',
  FORMAT: 'locale_format'
}

//
// Theme
//
export const loadTheme = () => {
  const stored = localStorage.get(Key.THEME)

  if (stored) {
    return stored
  }

  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)'
  ).matches

  return prefersDark ? 'dark' : 'light'
}

export const storeTheme = value => localStorage.set(Key.THEME, value)

//
// Locale & Format
//

export const DEFAULT_LOCALE = 'en'

export const loadLocale = () => localStorage.get(Key.LOCALE) ?? DEFAULT_LOCALE

export const storeLocale = value => localStorage.set(Key.LOCALE, value)

const getDefaultTimeFormat = locale => {
  // Most European and Asian locales use 24-hour format
  const use24Hour = ['uk', 'de', 'fr', 'es', 'it', 'pl', 'ru', 'ja', 'zh', 'ko']

  return use24Hour.includes(locale) ? '24' : '12'
}

export const loadFormatPreferences = locale => {
  const stored = localStorage.get(Key.FORMAT)
  const defaults = {
    date: 'numeric',
    time: getDefaultTimeFormat(locale)
  }

  return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
}

export const storeFormatPreferences = value =>
  localStorage.set(Key.FORMAT, JSON.stringify(value))

export const resetPreferences = () => {
  Object.values(Key).forEach(key => localStorage.remove(key))
}
