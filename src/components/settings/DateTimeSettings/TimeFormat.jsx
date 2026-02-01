import { Clock } from 'lucide-react'

import useLocale from '@/hooks/useLocale'

import { SettingsOptions, SettingsSection } from '../containers'
import { SettingsLabel } from '../SettingsLabel'
import { SettingsOption } from '../SettingsOption'

const timeFormats = [
  { value: '12', label: '12-hour', hour12: true },
  { value: '24', label: '24-hour', hour12: false }
]

export const TimeFormat = ({ value, onChange }) => {
  const { formatTime } = useLocale()
  const now = new Date()

  return (
    <SettingsSection>
      <SettingsLabel icon={Clock}>Time format</SettingsLabel>
      <SettingsOptions>
        {timeFormats.map(option => (
          <SettingsOption
            key={option.value}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
            label={option.label}
            description={formatTime(now, option.hour12)}
          />
        ))}
      </SettingsOptions>
    </SettingsSection>
  )
}
