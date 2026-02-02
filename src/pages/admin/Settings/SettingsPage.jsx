import { SettingsPageHeader } from '@/components/PageHeader'
import { DateTimeSettings } from '@/components/settings'

export const SettingsPage = () => {
  return (
    <div className='flex w-full flex-col gap-4'>
      <SettingsPageHeader />
      <DateTimeSettings />
    </div>
  )
}
