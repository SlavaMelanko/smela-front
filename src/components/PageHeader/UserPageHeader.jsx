import { User } from 'lucide-react'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderEmail,
  PageHeaderIcon,
  PageHeaderTitle
} from './PageHeader'

export const UserPageHeader = ({ firstName, lastName, email }) => (
  <PageHeader>
    <PageHeaderIcon icon={User} />
    <PageHeaderContent>
      <PageHeaderTitle>
        {firstName} {lastName}
      </PageHeaderTitle>
      <PageHeaderEmail email={email} />
    </PageHeaderContent>
  </PageHeader>
)
