import { CalendarX, Mail, RefreshCw } from 'lucide-react'

import { CustomPricingCard, PricingSlider, StandardPricingCard } from '.'

const noop = () => {}

export default {
  title: 'Components/Pricing',
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div className='flex items-center justify-center w-full min-h-screen'>
        <Story />
      </div>
    )
  ]
}

export const AllCards = {
  render: () => (
    <div className='flex gap-6'>
      {/* Free plan - $0, no discount */}
      <StandardPricingCard
        title='Free'
        bandwidth={{ value: 1, unit: 'GB' }}
        pricePerUnit={{ original: 0, final: 0, unit: 'GB' }}
        totalPrice={{ original: 0 }}
        features={[
          {
            icon: <Mail className='size-6 text-blue-500' />,
            text: 'Email Support'
          }
        ]}
        redirectPath='/signup'
      />

      {/* Pro plan - 50% discount */}
      <StandardPricingCard
        title='Pro'
        bandwidth={{ value: 10, unit: 'GB' }}
        pricePerUnit={{ original: 7.5, final: 3.75, unit: 'GB' }}
        totalPrice={{ original: 75, final: 37.5 }}
        features={[
          {
            icon: <Mail className='size-6 text-blue-500' />,
            text: 'Email Support'
          },
          {
            icon: <CalendarX className='size-6 text-orange-500' />,
            text: 'Cancel Anytime'
          },
          {
            icon: <RefreshCw className='size-6 text-pink-500' />,
            text: 'Rollover Data'
          }
        ]}
        redirectPath='/signup'
        hasDiscount
      />

      {/* Custom pricing card */}
      <CustomPricingCard
        title='Custom'
        totalPrice={{ original: "Let's Talk" }}
        customMessage='Contact us for enterprise pricing'
        buttonText='GET STARTED'
        showModal={noop}
      />
    </div>
  )
}

export const Slider = {
  render: () => (
    <div className='w-164'>
      <PricingSlider discount={50} onComplete={noop} />
    </div>
  )
}
