import { LocaleProvider } from '@/contexts/LocaleContext'
import useLocale from '@/hooks/useLocale'

import Spinner from './index'

export default {
  title: 'Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    Story => (
      <LocaleProvider>
        <Story />
      </LocaleProvider>
    )
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner icon'
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Centers the spinner in its container'
    },
    text: {
      control: { type: 'text' },
      description: 'Text to display below the spinner'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
}

export const Default = () => <Spinner />

export const WithText = () => {
  const { t } = useLocale()

  return <Spinner text={t('processing')} />
}

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
    <Spinner size='sm' text='Small' />
    <Spinner size='md' text='Medium' />
    <Spinner size='lg' text='Large' />
  </div>
)

export const Playground = {
  args: {
    size: 'lg',
    centered: false,
    text: ''
  }
}
