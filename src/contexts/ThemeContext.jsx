import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import storage from '@/lib/storage'
import toasts from '@/lib/toasts'

const THEME_STORAGE_KEY = 'theme'

const ThemeContext = createContext()

const getInitialTheme = () => {
  const savedTheme = storage.get(THEME_STORAGE_KEY)

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

  useEffect(() => {
    storage.set(THEME_STORAGE_KEY, theme)

    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Ensure browser-native UI (like form controls and scrollbars) match the theme
    root.style.colorScheme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

    // Clear toasts when theme is toggled to avoid visual glitches
    toasts.clear()
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
