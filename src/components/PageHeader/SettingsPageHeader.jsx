import { Settings } from 'lucide-react'

import useLocale from '@/hooks/useLocale'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderTitle
} from './PageHeader'

export const SettingsPageHeader = () => {
  const { t } = useLocale()

  return (
    <PageHeader>
      <PageHeaderIcon icon={Settings} />
      <PageHeaderContent>
        <PageHeaderTitle>{t('settings.title')}</PageHeaderTitle>
        <PageHeaderDescription>
          {t('settings.description')}
        </PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>
  )
}
