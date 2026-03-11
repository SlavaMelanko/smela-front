import { YouBadge } from '@/components/badges'
import { useCurrentUser } from '@/hooks/useAuth'
import { getFullName } from '@/lib/format/user'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderEmail,
  PageHeaderIcon,
  PageHeaderTitle
} from './PageHeader'
import { getRoleIcon } from './utils'

export const UserPageHeader = ({ user }) => {
  const { user: me } = useCurrentUser()

  return (
    <PageHeader>
      <PageHeaderIcon icon={getRoleIcon(user?.role)} />
      <PageHeaderContent>
        <PageHeaderTitle>
          {getFullName(user)}
          {user?.id === me?.id && <YouBadge className='text-lg' />}
        </PageHeaderTitle>
        <PageHeaderEmail email={user?.email} />
      </PageHeaderContent>
    </PageHeader>
  )
}
