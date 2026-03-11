import { ShieldCheck, User } from 'lucide-react'

import { YouBadge } from '@/components/badges'
import { useCurrentUser } from '@/hooks/useAuth'
import { getFullName } from '@/lib/format/user'
import { Role } from '@/lib/types'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderEmail,
  PageHeaderIcon,
  PageHeaderTitle
} from './PageHeader'

const getRoleIcon = role => {
  if (role === Role.ADMIN) {
    return ShieldCheck
  }

  return User
}

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
