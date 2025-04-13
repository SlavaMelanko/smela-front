import { RouterProvider } from 'react-router-dom'

import { LocaleProvider } from '@/contexts/LocaleContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

import router from './router.jsx'

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App
