import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { localStorage } from '@/lib/storage'

const THEME_STORAGE_KEY = 'theme'

const ThemeContext = createContext()

const getInitialTheme = () => {
  const savedTheme = localStorage.get(THEME_STORAGE_KEY)

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
    localStorage.set(THEME_STORAGE_KEY, theme)

    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(theme)

    // Ensure browser-native UI (like form controls and scrollbars) match the theme
    root.style.colorScheme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
