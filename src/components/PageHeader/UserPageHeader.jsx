import { ShieldCheck, User } from 'lucide-react'

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

export const UserPageHeader = ({ user }) => (
  <PageHeader>
    <PageHeaderIcon icon={getRoleIcon(user?.role)} />
    <PageHeaderContent>
      <PageHeaderTitle>{getFullName(user)}</PageHeaderTitle>
      <PageHeaderEmail email={user?.email} />
    </PageHeaderContent>
  </PageHeader>
)
