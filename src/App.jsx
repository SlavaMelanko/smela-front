import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import TanStackDevTools from '@/components/devtools/TanStack'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { NotificationProvider } from '@/contexts/NotificationContext.jsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { queryClient } from '@/lib/queryClient'
import { router } from '@/routes'

function App() {
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
