import { Settings } from 'lucide-react'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderTitle
} from './PageHeader'

export const SettingsPageHeader = ({ title, description }) => (
  <PageHeader>
    <PageHeaderIcon icon={Settings} />
    <PageHeaderContent>
      <PageHeaderTitle>{title}</PageHeaderTitle>
      <PageHeaderDescription>{description}</PageHeaderDescription>
    </PageHeaderContent>
  </PageHeader>
)
