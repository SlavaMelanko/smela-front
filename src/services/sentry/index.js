import * as Sentry from '@sentry/react'

import env from '@/lib/env'

import packageJson from '../../../package.json'

export const initSentry = () => {
  if (!env.SENTRY_DSN) {
    return
  }

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: `${packageJson.name}@${packageJson.version}`
  })
}

export const setSentryUser = user => {
  Sentry.setUser({ id: user.id })
}

export const clearSentryUser = () => {
  Sentry.setUser(null)
}
