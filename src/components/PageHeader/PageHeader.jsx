import { Globe } from 'lucide-react'

import { Link } from '@/components/links'
import { EmailLink } from '@/components/links/EmailLink'

function PageHeader({ children }) {
  return <div className='flex items-center gap-3'>{children}</div>
}

function PageHeaderIcon({ icon: Icon }) {
  return (
    <div className='flex size-10 items-center justify-center'>
      <Icon className='size-8 text-primary' />
    </div>
  )
}

function PageHeaderContent({ children }) {
  return <div>{children}</div>
}

function PageHeaderTitle({ children }) {
  return <p className='text-2xl font-semibold'>{children}</p>
}

function PageHeaderDescription({ children }) {
  return <p className='text-sm text-muted-foreground'>{children}</p>
}

function PageHeaderWebsite({ url }) {
  return (
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
}

function PageHeaderEmail({ email }) {
  return <EmailLink email={email} size='sm' underline='none' />
}

export {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderEmail,
  PageHeaderIcon,
  PageHeaderTitle,
  PageHeaderWebsite
}
