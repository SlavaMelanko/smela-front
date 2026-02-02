import { localStorage } from '@/lib/storage'

export const Key = {
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
  const parts = new Intl.DateTimeFormat(locale, {
    hour: 'numeric'
  }).formatToParts(new Date(2026, 0, 1, 13, 0))

  const hourPart = parts.find(p => p.type === 'hour')

  // If 13:00 displays as "1", it's 12-hour format
  return hourPart?.value === '1' ? '12' : '24'
}

export const loadFormatPreferences = locale => {
  const defaults = {
    date: 'numeric',
    time: getDefaultTimeFormat(locale)
  }

  try {
    const stored = localStorage.get(Key.FORMAT)

    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
  } catch {
    return defaults
  }
}

export const storeFormatPreferences = value =>
  localStorage.set(Key.FORMAT, JSON.stringify(value))
