import '../src/index.css'

import { MemoryRouter } from 'react-router-dom'

import { LocaleProvider } from '../src/contexts/LocaleContext'
import i18n from '../src/i18n'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        title: 'Theme',
        dynamicTitle: true,
        showName: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        title: 'Locale',
        dynamicTitle: true,
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'uk', right: '🇺🇦', title: 'Українська' }
        ]
      }
    }
  },

  decorators: [
    (Story, context) => {
      const { theme, locale } = context.globals

      const isDark = theme === 'dark'

      // toggle `dark` class on <html>
      document.documentElement.classList.toggle('dark', isDark)

      // Set i18n language
      if (locale) {
        i18n.changeLanguage(locale)
      }

      // use key to force re-render when locale & theme changes
      return (
        <MemoryRouter>
          <LocaleProvider>
            <Story key={`${locale}-${theme}`} />
          </LocaleProvider>
        </MemoryRouter>
      )
    }
  ]
}

export default preview
