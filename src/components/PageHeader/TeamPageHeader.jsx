import { Building2 } from 'lucide-react'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderIcon,
  PageHeaderTitle,
  PageHeaderWebsite
} from './PageHeader'

export const TeamPageHeader = ({ name, website }) => (
  <PageHeader>
    <PageHeaderIcon icon={Building2} />
    <PageHeaderContent>
      <PageHeaderTitle>{name}</PageHeaderTitle>
      <PageHeaderWebsite url={website} />
    </PageHeaderContent>
  </PageHeader>
)
