import './styles.scss'

import {
  CalendarXIcon,
  CreditCardIcon,
  MailIcon,
  RefreshIcon,
  SlackIcon,
  UserPlusIcon
} from '@/components/icons'
import Tooltip from '@/components/Tooltip'
import useLocale from '@/hooks/useLocale'

const FEATURE = {
  emailSupport: {
    icon: <MailIcon color='blue' />,
    text: 'offer.features.emailSupport'
  },
  oneTimePurchase: {
    icon: <CreditCardIcon color='yellow' />,
    text: 'offer.features.oneTimePurchase'
  },
  cancelAnytime: {
    icon: <CalendarXIcon color='orange' />,
    text: 'offer.features.cancelAnytime'
  },
  rollover: {
    icon: <RefreshIcon color='pink' />,
    text: 'offer.features.rollover'
  },
  slackSupport: {
    icon: <SlackIcon color='blue' />,
    text: 'offer.features.slackSupport'
  },
  dedicatedManager: {
    icon: <UserPlusIcon color='green' />,
    text: 'offer.features.dedicatedManager'
  }
}

const getFeatures = value => {
  if (value <= 1) {
    return [FEATURE.emailSupport, FEATURE.oneTimePurchase]
  }

  if (value < 100) {
    return [FEATURE.emailSupport, FEATURE.cancelAnytime, FEATURE.rollover]
  }

  if (value < 500) {
    return [FEATURE.slackSupport, FEATURE.cancelAnytime, FEATURE.rollover]
  }

  return [
    FEATURE.slackSupport,
    FEATURE.cancelAnytime,
    FEATURE.rollover,
    FEATURE.dedicatedManager
  ]
}

const FeatureList = ({ value }) => {
  const { t } = useLocale()

  const features = getFeatures(value)

  return (
    <div className='features'>
      <div className='features__title'>
        {t('offer.summary.includedFeatures')}
      </div>
      <ul className='features__items'>
        {features.map(({ icon, text }) => (
          <li key={text} className='features__item'>
            <Tooltip text={t(text)} icon={icon} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureList
