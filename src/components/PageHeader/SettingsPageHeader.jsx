import { Settings } from 'lucide-react'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderLeft,
  PageHeaderTitle
} from './PageHeader'

export const SettingsPageHeader = ({ title, description }) => (
  <PageHeader>
    <PageHeaderLeft>
      <PageHeaderIcon icon={Settings} />
      <PageHeaderContent>
        <PageHeaderTitle>{title}</PageHeaderTitle>
        <PageHeaderDescription>{description}</PageHeaderDescription>
      </PageHeaderContent>
    </PageHeaderLeft>
  </PageHeader>
)
