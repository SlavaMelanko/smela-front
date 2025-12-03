import * as Sentry from '@sentry/react'

import env from '@/lib/env'

import packageJson from '../../../../package.json'

export const init = () => {
  if (!env.SENTRY_DSN) {
    return
  }

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.MODE,
    release: `${packageJson.name}@${packageJson.version}`
  })
}
