import { SettingsPageHeader } from '@/components/PageHeader'
import { DateTimeSettings } from '@/components/settings'
import useLocale from '@/hooks/useLocale'

export const SettingsPage = () => {
  const { t } = useLocale()

  return (
    <div className='flex w-full flex-col gap-4'>
      <SettingsPageHeader
        title={t('settings.title')}
        description={t('settings.description')}
      />
      <DateTimeSettings />
    </div>
  )
}
