import './styles.scss'

import { Moon, Sun } from 'lucide-react'

import useTheme from '@/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className='theme-toggle__button'
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      {theme === 'dark' ? (
        <Sun size={20} className='theme-toggle__sun' />
      ) : (
        <Moon size={20} />
      )}
    </button>
  )
}

export default ThemeToggle
