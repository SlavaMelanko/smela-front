import { CalendarX, Mail, RefreshCw, Slack, UserPlus } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import useLocale from '@/hooks/useLocale'

const FEATURE = {
  emailSupport: {
    icon: <Mail className='size-6 text-blue-500' />,
    text: 'offer.features.emailSupport'
  },
  cancelAnytime: {
    icon: <CalendarX className='size-6 text-orange-500' />,
    text: 'offer.features.cancelAnytime'
  },
  rollover: {
    icon: <RefreshCw className='size-6 text-pink-500' />,
    text: 'offer.features.rollover'
  },
  slackSupport: {
    icon: <Slack className='size-6 text-blue-500' />,
    text: 'offer.features.slackSupport'
  },
  dedicatedManager: {
    icon: <UserPlus className='size-6 text-green-500' />,
    text: 'offer.features.dedicatedManager'
  }
}

const getFeatures = value => {
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
    <div className='flex w-full flex-wrap items-center justify-between gap-4'>
      <div className='mr-auto whitespace-nowrap text-muted-foreground'>
        {t('offer.summary.includedFeatures')}
      </div>
      <ul className='m-0 flex list-none flex-wrap justify-end gap-4 p-0'>
        {features.map(({ icon, text }) => (
          <li key={text} className='flex items-center'>
            <Tooltip>
              <TooltipTrigger>{icon}</TooltipTrigger>
              <TooltipContent>{t(text)}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeatureList
