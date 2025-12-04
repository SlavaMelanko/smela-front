import * as Sentry from '@sentry/react'

export const captureError = (error, { showReportDialog = false } = {}) => {
  Sentry.captureException(error)

  if (showReportDialog) {
    Sentry.showReportDialog()
  }
}

export const captureMessage = (message, level = 'warning') => {
  Sentry.captureMessage(message, level)
}
