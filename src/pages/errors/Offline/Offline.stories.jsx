import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from '@/contexts/LocaleContext'

import Offline from './index'

export default {
  title: 'Errors/Offline',
  component: Offline,
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

export const Default = () => <Offline />
