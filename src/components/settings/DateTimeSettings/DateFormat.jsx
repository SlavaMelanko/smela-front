import { Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import useLocale from '@/hooks/useLocale'
import { datePreset } from '@/lib/format/date'

import { SettingsOptions, SettingsSection } from '../containers'
import { SettingsLabel } from '../SettingsLabel'
import { SettingsOption } from '../SettingsOption'

export const DateFormat = ({ value, onChange }) => {
  const { t } = useTranslation()
  const { formatDate } = useLocale()
  const now = new Date()

  return (
    <SettingsSection>
      <SettingsLabel icon={Calendar}>{t('format.date.name')}</SettingsLabel>
      <SettingsOptions>
        {Object.entries(datePreset).map(([key, options]) => (
          <SettingsOption
            key={key}
            selected={value === key}
            onClick={() => onChange(key)}
            label={t(`format.date.values.${key}`)}
            description={formatDate(now, options)}
          />
        ))}
      </SettingsOptions>
    </SettingsSection>
  )
}
