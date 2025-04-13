import { createContext, useState } from 'react'

import i18n, { LOCALE_STORAGE_KEY } from '@/i18n'
import storage from '@/lib/storage'

const LocaleContext = createContext()

export const LocaleProvider = ({ children }) => {
  // At this point, i18n is already initialized with the correct locale,
  // so we trust i18n.language as the single source of truth
  const [locale, setLocale] = useState(i18n.language)

  const changeLocale = locale => {
    setLocale(locale)
    i18n.changeLanguage(locale)
    storage.set(LOCALE_STORAGE_KEY, locale)
  }

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleContext
