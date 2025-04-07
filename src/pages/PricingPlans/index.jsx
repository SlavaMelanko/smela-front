import './styles.scss'

import { CalendarX, CreditCard, Mail, RefreshCw, Slack } from 'lucide-react'

import PlanCard from '@/components/PlanCard'

const PricingPlansPage = () => {
  const plans = [
    {
      id: 'trial',
      title: 'Trial',
      bandwidth: '1 GB',
      showGlobeIcon: true,
      pricePerGB: {
        original: '$7.99',
        discounted: '$3.99 / GB'
      },
      totalPrice: {
        original: '$7.99',
        discounted: '$3.99'
      },
      features: [
        {
          icon: (
            <Mail className='plan-card__feature-icon plan-card__feature-icon--blue' />
          ),
          text: 'Email support'
        },
        {
          icon: (
            <CreditCard className='plan-card__feature-icon plan-card__feature-icon--orange' />
          ),
          text: 'One-time purchase'
        }
      ],
      buttonText: 'Sign Up Now',
      hasDiscount: true
    },
    {
      id: 'entry',
      title: 'Entry',
      bandwidth: '10 GB',
      showGlobeIcon: true,
      pricePerGB: {
        original: '$7.50',
        discounted: '$3.75 / GB'
      },
      totalPrice: {
        original: '$75.00',
        discounted: '$37.50'
      },
      features: [
        {
          icon: (
            <Mail className='plan-card__feature-icon plan-card__feature-icon--blue' />
          ),
          text: 'Email support'
        },
        {
          icon: (
            <CalendarX className='plan-card__feature-icon plan-card__feature-icon--orange' />
          ),
          text: 'Cancel anytime'
        },
        {
          icon: (
            <RefreshCw className='plan-card__feature-icon plan-card__feature-icon--green' />
          ),
          text: 'Bandwidth rollover'
        }
      ],
      buttonText: 'Sign Up Now',
      hasDiscount: true
    },
    {
      id: 'starter',
      title: 'Starter',
      bandwidth: '30 GB',
      showGlobeIcon: true,
      pricePerGB: {
        original: '$7.00',
        discounted: '$3.50 / GB'
      },
      totalPrice: {
        original: '$210.00',
        discounted: '$105.00'
      },
      features: [
        {
          icon: (
            <Slack className='plan-card__feature-icon plan-card__feature-icon--blue' />
          ),
          text: '24/7 Slack support'
        },
        {
          icon: (
            <CalendarX className='plan-card__feature-icon plan-card__feature-icon--orange' />
          ),
          text: 'Cancel anytime'
        },
        {
          icon: (
            <RefreshCw className='plan-card__feature-icon plan-card__feature-icon--green' />
          ),
          text: 'Bandwidth rollover'
        }
      ],
      buttonText: 'Sign Up Now',
      hasDiscount: true
    },
    {
      id: 'basic',
      title: 'Basic',
      bandwidth: '100 GB',
      showGlobeIcon: true,
      pricePerGB: {
        original: '$4.99',
        discounted: '$2.49 / GB'
      },
      totalPrice: {
        original: '$499.00',
        discounted: '$249.50'
      },
      features: [
        {
          icon: (
            <Slack className='plan-card__feature-icon plan-card__feature-icon--blue' />
          ),
          text: '24/7 Slack support'
        },
        {
          icon: (
            <CalendarX className='plan-card__feature-icon plan-card__feature-icon--orange' />
          ),
          text: 'Cancel anytime'
        },
        {
          icon: (
            <RefreshCw className='plan-card__feature-icon plan-card__feature-icon--green' />
          ),
          text: 'Bandwidth rollover'
        }
      ],
      buttonText: 'Sign Up Now',
      hasDiscount: true
    },
    {
      id: 'premium',
      title: 'Premium',
      customPricing: true,
      showGlobeIcon: false,
      totalPrice: {
        discounted: 'Custom $'
      },
      customMessage: 'Not seeing a plan that fits your needs? We can help.',
      buttonText: 'Contact Us',
      hasDiscount: false
    }
  ]

  return (
    <div className='pricing-page'>
      <h1 className='pricing-page__title'>Select a Plan</h1>
      <p className='pricing-page__subtitle'>
        Choose the right plan for your needs.
      </p>

      <div className='pricing-page__content'>
        <div className='pricing-page__plans'>
          {plans.map(plan => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>

      <p className='pricing-page__footer'>
        All prices are in USD. Bandwidth rollover applies to monthly
        subscriptions only.
      </p>
    </div>
  )
}

export default PricingPlansPage
