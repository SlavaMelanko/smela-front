import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import LocaleContext from '@/contexts/LocaleContext'

const useLocale = (options = {}) => {
  const context = useContext(LocaleContext)
  const { t } = useTranslation(undefined, options)

  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return { ...context, t }
}

export default useLocale
