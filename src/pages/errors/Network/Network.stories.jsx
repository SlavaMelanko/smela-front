import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from '@/contexts/LocaleContext'

import Network from './index'

export default {
  title: 'Errors/Network',
  component: Network,
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

export const Default = () => <Network />
