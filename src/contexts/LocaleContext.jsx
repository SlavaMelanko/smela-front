import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import i18n, { LOCALE_STORAGE_KEY } from '@/i18n'
import { formatDate, formatNumber, formatPrice, formatTime } from '@/lib/format'
import { localStorage } from '@/lib/storage'

const LocaleContext = createContext()

export const LocaleProvider = ({ children }) => {
  // At this point, i18n is already initialized with the correct locale,
  // so we trust i18n.language as the single source of truth
  const [locale, setLocale] = useState(i18n.language)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const changeLocale = useCallback(locale => {
    setLocale(locale)
    i18n.changeLanguage(locale)
    localStorage.set(LOCALE_STORAGE_KEY, locale)
  }, [])

  const value = useMemo(
    () => ({
      locale,
      changeLocale,
      formatNumber: (value, options) => formatNumber(value, locale, options),
      formatNumberWithUnit: (value, unit, options) =>
        `${formatNumber(value, locale, options)} ${unit}`,
      formatPrice: (value, currency, options) =>
        formatPrice(value, locale, currency, options),
      formatDate: (date, options) => formatDate(date, locale, options),
      formatTime: (date, hour12) => formatTime(date, locale, hour12)
    }),
    [locale, changeLocale]
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export default LocaleContext
