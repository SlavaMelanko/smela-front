import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import useLocale from '@/hooks/useLocale'

import { SettingsOptions, SettingsSection } from '../containers'
import { SettingsLabel } from '../SettingsLabel'
import { SettingsOption } from '../SettingsOption'

const timeFormats = [
  { value: '12', hour12: true },
  { value: '24', hour12: false }
]

export const TimeFormat = ({ value, onChange }) => {
  const { t } = useTranslation()
  const { formatTime } = useLocale()

  return (
    <SettingsSection>
      <SettingsLabel icon={Clock}>{t('format.time.name')}</SettingsLabel>
      <SettingsOptions>
        {timeFormats.map(option => (
          <SettingsOption
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
            label={t(`format.time.values.${option.value}`)}
            description={formatTime(new Date(), option.hour12)}
          />
        ))}
      </SettingsOptions>
    </SettingsSection>
  )
}
