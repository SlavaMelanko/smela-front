import { useLocale } from '@/hooks/useLocale'
import { getFullName } from '@/lib/format/user'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderLeft,
  PageHeaderTitle
} from './PageHeader'
import { getRoleIcon } from './utils'

export const ProfilePageHeader = ({ user }) => {
  const { t } = useLocale()

  return (
    <PageHeader>
      <PageHeaderLeft>
        <PageHeaderIcon icon={getRoleIcon(user?.role)} />
        <PageHeaderContent>
          <PageHeaderTitle>{getFullName(user)}</PageHeaderTitle>
          <PageHeaderDescription>
            {t('profile.description')}
          </PageHeaderDescription>
        </PageHeaderContent>
      </PageHeaderLeft>
    </PageHeader>
  )
}
