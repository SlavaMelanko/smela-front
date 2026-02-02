import { Globe } from 'lucide-react'

import { Link } from '@/components/links'
import { EmailLink } from '@/components/links/EmailLink'

const PageHeader = ({ children }) => (
  <div className='flex items-center gap-3'>{children}</div>
)

const PageHeaderIcon = ({ icon: Icon }) => (
  <div className='flex size-10 items-center justify-center'>
    <Icon className='size-8 text-primary' />
  </div>
)

const PageHeaderContent = ({ children }) => <div>{children}</div>

const PageHeaderTitle = ({ children }) => (
  <p className='text-2xl font-semibold'>{children}</p>
)

const PageHeaderDescription = ({ children }) => (
  <p className='text-sm text-muted-foreground'>{children}</p>
)

const PageHeaderWebsite = ({ url }) => (
  <Link
    to={url}
    size='sm'
    underline='none'
    openInNewTab
    className='inline-flex items-center gap-1'
  >
    <Globe className='size-3.5' />
    <span>{url}</span>
  </Link>
)

const PageHeaderEmail = ({ email }) => (
  <EmailLink email={email} size='sm' underline='none' />
)

export {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEmail,
  PageHeaderIcon,
  PageHeaderTitle,
  PageHeaderWebsite
}
