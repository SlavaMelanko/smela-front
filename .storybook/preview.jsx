import '../src/styles/main.scss'

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
      description: 'Light or Dark mode for Massive branding',
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
    }
  },

  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark'

      // toggle `dark` class on <html>
      document.documentElement.classList.toggle('dark', isDark)

      return <Story />
    }
  ]
}

export default preview
