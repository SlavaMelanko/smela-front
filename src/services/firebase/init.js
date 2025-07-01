import { initializeApp } from 'firebase/app'

import env from '@/lib/env'

const getConfig = () => {
  try {
    const rawConfig = env.FIREBASE_CONFIG

    if (!rawConfig) {
      throw new Error('Firebase config is missing.')
    }

    return JSON.parse(rawConfig)
  } catch (err) {
    console.error('Failed to parse Firebase config:', err)
  }

  return null
}

const init = config => {
  if (!config) {
    return null
  }

  return initializeApp(config)
}

export const app = init(getConfig())
