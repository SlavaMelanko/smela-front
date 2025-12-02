import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import TanStackDevTools from '@/components/devtools/TanStack'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { NotificationProvider } from '@/contexts/NotificationContext.jsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { queryClient } from '@/lib/queryClient'
import { GeneralErrorPage } from '@/pages/errors'
import { router } from '@/routes'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <NotificationProvider>
            <ModalProvider>
              <Sentry.ErrorBoundary fallback={<GeneralErrorPage />}>
                <RouterProvider router={router} />
              </Sentry.ErrorBoundary>
            </ModalProvider>
          </NotificationProvider>
        </LocaleProvider>
      </ThemeProvider>
      <TanStackDevTools />
    </QueryClientProvider>
  )
}

export default App
