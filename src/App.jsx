import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from '@/contexts/AuthContext'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { NotificationProvider } from '@/contexts/NotificationContext.jsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { router } from '@/routes'

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <NotificationProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </NotificationProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App
