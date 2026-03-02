import { User } from 'lucide-react'

import { getFullName } from '@/lib/format/user'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderEmail,
  PageHeaderIcon,
  PageHeaderTitle
} from './PageHeader'

export const UserPageHeader = ({ user }) => (
  <PageHeader>
    <PageHeaderIcon icon={User} />
    <PageHeaderContent>
      <PageHeaderTitle>{getFullName(user)}</PageHeaderTitle>
      <PageHeaderEmail email={user?.email} />
    </PageHeaderContent>
  </PageHeader>
)
