import * as Sentry from '@sentry/react'
import { useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  useEffect(() => {
    Sentry.captureException(error)
    Sentry.showReportDialog()

    navigate('/errors/general', { replace: true })
  }, [error, navigate])

  return null
}

export default ErrorBoundary
