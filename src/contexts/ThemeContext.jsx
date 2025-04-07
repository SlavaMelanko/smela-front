import { createContext, useEffect, useState } from 'react'

import storage from '@/lib/storage'

const ThemeContext = createContext()

const getInitialTheme = () => {
  const savedTheme = storage.get('theme')

  if (savedTheme) {
    return savedTheme
  }

  const prefersDark = window.matchMedia?.(
    '(prefers-color-scheme: dark)'
  ).matches

  return prefersDark ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    storage.set('theme', theme)

    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Ensure browser-native UI (like form controls and scrollbars) match the theme.
    root.style.colorScheme = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
