import * as Sentry from '@sentry/react'

export const setUser = user => {
  Sentry.setUser({ id: user.id })
}

export const clearUser = () => {
  Sentry.setUser(null)
}
