import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from '@/contexts/LocaleContext'

import General from './index'

export default {
  title: 'Errors/General',
  component: General,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <LocaleProvider>
          <Story />
        </LocaleProvider>
      </BrowserRouter>
    )
  ]
}

export const Default = () => <General />
