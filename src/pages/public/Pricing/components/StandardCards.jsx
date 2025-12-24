import { useNavigate } from 'react-router-dom'

import { PricingSliderModal } from '@/components/dialogs'
import {
  CalendarXIcon,
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
      id: 'free',
      title: t('plans.free'),
      bandwidth: {
        value: 1,
        unit: 'GB'
      },
      pricePerUnit: {
        original: 0.0,
        final: 0.0,
        unit: 'GB'
      },
      totalPrice: {
        original: 0.0
      },
      features: [
        {
          icon: <MailIcon color='blue' />,
          text: t('features.emailSupport')
        }
      ],
      redirectPath: '/signup'
    },
    {
      id: 'pro',
      title: t('plans.pro'),
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
      id: 'max',
      title: t('plans.max'),
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
    <div className='grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:flex lg:justify-center lg:gap-6'>
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
