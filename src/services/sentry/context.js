import * as Sentry from '@sentry/react'

export const setSentryUser = user => {
  Sentry.setUser({ id: user.id })
}

export const clearSentryUser = () => {
  Sentry.setUser(null)
}
