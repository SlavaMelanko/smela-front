import { BrowserRouter } from 'react-router-dom'

import {
  CalendarXIcon,
  CreditCardIcon,
  MailIcon,
  RefreshIcon,
  SlackIcon,
  UserPlusIcon
} from '@/components/icons'
import { LocaleProvider } from '@/contexts/LocaleContext'

import { CustomPricingCard, PricingSlider, StandardPricingCard } from './index'

const meta = {
  title: 'Pricing',
  component: StandardPricingCard,
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

export default meta

export const TrialPlanCard = {
  args: {
    title: 'Trial',
    bandwidth: {
      value: 1,
      unit: 'GB'
    },
    pricePerUnit: {
      original: 7.99,
      final: 7.99,
      unit: 'GB'
    },
    totalPrice: {
      original: 7.99
    },
    features: [
      {
        icon: <MailIcon color='blue' />,
        text: 'Email support included'
      },
      {
        icon: <CreditCardIcon color='yellow' />,
        text: 'One-time purchase'
      }
    ],
    redirectPath: '/signup'
  }
}

export const BasicPlanCardWithDiscount = {
  args: {
    id: 'basic',
    title: 'Basic',
    bandwidth: {
      value: 100,
      unit: 'GB'
    },
    pricePerUnit: {
      original: 4.99,
      final: 2.49,
      unit: 'GB'
    },
    totalPrice: {
      original: 499.0,
      final: 249.5
    },
    features: [
      {
        icon: <SlackIcon color='blue' />,
        text: 'Slack support'
      },
      {
        icon: <CalendarXIcon color='orange' />,
        text: 'Cancel anytime'
      },
      {
        icon: <RefreshIcon color='pink' />,
        text: 'Unused bandwidth rolls over to the next month'
      },
      {
        icon: <UserPlusIcon color='green' />,
        text: 'Dedicated account manager'
      }
    ],
    redirectPath: '/signup',
    hasDiscount: true
  }
}

export const CustomPlanCard = {
  render: () => (
    <CustomPricingCard
      title='Custom'
      totalPrice={{ original: 'Your plan' }}
      customMessage='We’ll build a tailored plan based on your needs.'
      buttonText='Contact us'
      showModal={() => alert('Modal opened (mock)')}
    />
  )
}

export const AllCards = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'flex-start'
      }}
    >
      <StandardPricingCard {...TrialPlanCard.args} />
      <StandardPricingCard {...BasicPlanCardWithDiscount.args} />
      <CustomPricingCard {...CustomPlanCard.render().props} />
    </div>
  )
}

export const Slider = {
  name: 'Pricing Slider',
  render: () => <PricingSlider onComplete={() => alert('Complete!')} />
}

export const PricingSliderWithDiscount = {
  render: () => (
    <PricingSlider discount={50} onComplete={() => alert('Complete!')} />
  )
}
