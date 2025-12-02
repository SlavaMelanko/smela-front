import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'

import TanStackDevTools from '@/components/devtools/TanStack'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { NotificationProvider } from '@/contexts/NotificationContext.jsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { queryClient } from '@/lib/queryClient'
import { GeneralErrorPage } from '@/pages/errors'
import { router } from '@/routes'

const handleError = (error, info) => {
  // Sentry.captureException(error, { extra: { componentStack: info.componentStack } })
  console.error('Unhandled error:', error, info.componentStack)
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <NotificationProvider>
            <ModalProvider>
              <ErrorBoundary
                FallbackComponent={GeneralErrorPage}
                onError={handleError}
              >
                <RouterProvider router={router} />
              </ErrorBoundary>
            </ModalProvider>
          </NotificationProvider>
        </LocaleProvider>
      </ThemeProvider>
      <TanStackDevTools />
    </QueryClientProvider>
  )
}

export default App
