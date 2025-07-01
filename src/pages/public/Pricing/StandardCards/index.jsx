import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { PricingSliderModal } from '@/components/dialogs'
import {
  CalendarXIcon,
  CreditCardIcon,
  MailIcon,
  RefreshIcon,
  SlackIcon,
  UserPlusIcon
} from '@/components/icons'
import { CustomPricingCard, StandardPricingCard } from '@/components/pricing'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'

const StandardCards = () => {
  const { t } = useLocale({ keyPrefix: 'offer' })
  const { openModal } = useModal()
  const navigate = useNavigate()

  const plans = [
    {
      id: 'trial',
      title: t('plans.trial'),
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
          text: t('features.emailSupport')
        },
        {
          icon: <CreditCardIcon color='yellow' />,
          text: t('features.oneTimePurchase')
        }
      ],
      redirectPath: '/signup'
    },
    {
      id: 'entry',
      title: t('plans.entry'),
      bandwidth: {
        value: 10,
        unit: 'GB'
      },
      pricePerUnit: {
        original: 7.5,
        final: 3.75,
        unit: 'GB'
      },
      totalPrice: {
        original: 75.0,
        final: 37.5
      },
      features: [
        {
          icon: <MailIcon color='blue' />,
          text: t('features.emailSupport')
        },
        {
          icon: <CalendarXIcon color='orange' />,
          text: t('features.cancelAnytime')
        },
        {
          icon: <RefreshIcon color='pink' />,
          text: t('features.rollover')
        }
      ],
      redirectPath: '/signup',
      hasDiscount: true
    },
    {
      id: 'starter',
      title: t('plans.starter'),
      bandwidth: {
        value: 30,
        unit: 'GB'
      },
      pricePerUnit: {
        original: 7.0,
        final: 3.5,
        unit: 'GB'
      },
      totalPrice: {
        original: 210.0,
        final: 105.0
      },
      features: [
        {
          icon: <SlackIcon color='blue' />,
          text: t('features.slackSupport')
        },
        {
          icon: <CalendarXIcon color='orange' />,
          text: t('features.cancelAnytime')
        },
        {
          icon: <RefreshIcon color='pink' />,
          text: t('features.rollover')
        }
      ],
      redirectPath: '/signup',
      hasDiscount: true
    },
    {
      id: 'basic',
      title: t('plans.basic'),
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
          text: t('features.slackSupport')
        },
        {
          icon: <CalendarXIcon color='orange' />,
          text: t('features.cancelAnytime')
        },
        {
          icon: <RefreshIcon color='pink' />,
          text: t('features.rollover')
        },
        {
          icon: <UserPlusIcon color='green' />,
          text: t('features.dedicatedManager')
        }
      ],
      redirectPath: '/signup',
      hasDiscount: true
    },
    {
      id: 'custom',
      title: t('plans.custom'),
      customPricing: true,
      totalPrice: {
        original: t('custom.title')
      },
      customMessage: t('custom.note'),
      buttonText: t('custom.cta'),
      showModal: () => {
        const close = openModal({
          children: (
            <PricingSliderModal
              onComplete={() => {
                close()
                navigate('/signup')
              }}
              onClose={() => close()}
            />
          ),
          size: 'lg'
        })
      },
      hasDiscount: false
    }
  ]

  return (
    <div className='standard-plans__cards'>
      {plans.map(plan =>
        plan.customPricing ? (
          <CustomPricingCard key={plan.id} {...plan} />
        ) : (
          <StandardPricingCard key={plan.id} {...plan} />
        )
      )}
    </div>
  )
}

export default StandardCards
