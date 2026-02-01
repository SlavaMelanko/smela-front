import { Calendar } from 'lucide-react'

import useLocale from '@/hooks/useLocale'
import { datePreset } from '@/lib/format/date'

import { SettingsOptions, SettingsSection } from '../containers'
import { SettingsLabel } from '../SettingsLabel'
import { SettingsOption } from '../SettingsOption'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export const DateFormat = ({ value, onChange }) => {
  const { formatDate } = useLocale()
  const now = new Date()

  return (
    <SettingsSection>
      <SettingsLabel icon={Calendar}>Date format</SettingsLabel>
      <SettingsOptions>
        {Object.entries(datePreset).map(([key, options]) => (
          <SettingsOption
            key={key}
            selected={value === key}
            onClick={() => onChange(key)}
            label={capitalize(key)}
            description={formatDate(now, options)}
          />
        ))}
      </SettingsOptions>
    </SettingsSection>
  )
}
