import { BrowserRouter } from 'react-router-dom'

import { LocaleProvider } from '@/contexts/LocaleContext'

import NotFound from './index'

export default {
  title: 'Errors/NotFound',
  component: NotFound,
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

export const Default = () => <NotFound />
