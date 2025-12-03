import * as Sentry from '@sentry/react'

export const captureException = error => {
  Sentry.captureException(error)
}

export const captureMessage = (message, level = 'info') => {
  Sentry.captureMessage(message, level)
}
