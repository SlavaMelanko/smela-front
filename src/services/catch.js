import i18n from '@/i18n'

import { toBackendError } from './backend/error'
import { toFirebaseKey } from './firebase/error'

const toTranslationKey = (error, fallbackKey = 'error.unknown') => {
  const key = toBackendError(error) || toFirebaseKey(error)

  const keyExistsInTheTranslationFile = i18n.exists(key)

  return keyExistsInTheTranslationFile ? key : fallbackKey
}

export { toTranslationKey }
