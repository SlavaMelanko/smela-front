import { Users } from 'lucide-react'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderIcon,
  PageHeaderLeft,
  PageHeaderTitle,
  PageHeaderWebsite
} from './PageHeader'

export const TeamPageHeader = ({ name, website }) => (
  <PageHeader>
    <PageHeaderLeft>
      <PageHeaderIcon icon={Users} />
      <PageHeaderContent>
        <PageHeaderTitle>{name}</PageHeaderTitle>
        <PageHeaderWebsite url={website} />
      </PageHeaderContent>
    </PageHeaderLeft>
  </PageHeader>
)
