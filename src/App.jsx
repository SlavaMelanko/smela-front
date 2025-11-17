import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import TanStackDevTools from '@/components/devtools/TanStack'
import Spinner from '@/components/Spinner'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { NotificationProvider } from '@/contexts/NotificationContext.jsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { useRefreshToken } from '@/hooks/useAuth'
import { queryClient } from '@/lib/query-client'
import { router } from '@/routes'

function App() {
  const {
    mutate: refreshToken,
    isPending,
    isSuccess,
    isError
  } = useRefreshToken()

  useEffect(() => {
    refreshToken(undefined, {
      onError: () => {
        window.location.href = '/login'
      }
    })
  }, [refreshToken])

  if (isPending || (!isSuccess && !isError)) {
    return <Spinner />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <NotificationProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </NotificationProvider>
        </LocaleProvider>
      </ThemeProvider>
      <TanStackDevTools />
    </QueryClientProvider>
  )
}

export default App
