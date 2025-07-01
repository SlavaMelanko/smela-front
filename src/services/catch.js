import i18n from '@/i18n'

import { toFirebaseKey } from './firebase/error'

const toTranslationKey = (error, fallbackKey = 'error.unknown') => {
  const key = toFirebaseKey(error)
  const keyExistsInTheTranslationFile = i18n.exists(key)

  return keyExistsInTheTranslationFile ? key : fallbackKey
}

export { toTranslationKey }
