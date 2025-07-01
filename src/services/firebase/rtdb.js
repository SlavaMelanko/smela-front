import { getDatabase } from 'firebase/database'

import { app } from './init'

export const getDatabaseSafe = () => {
  if (!app) {
    throw new Error('Firebase app is not initialized.')
  }

  return getDatabase(app)
}
