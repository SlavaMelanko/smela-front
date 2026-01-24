import { Building2, Globe } from 'lucide-react'

import { Link } from '@/components/links'

export const CompanyBadge = ({ name, website }) => (
  <div className='flex items-center gap-3'>
    <div className='flex size-10 items-center justify-center'>
      <Building2 className='size-8 text-primary' />
    </div>
    <div>
      <p className='text-2xl font-semibold'>{name}</p>
      <Link
        to={website}
        size='sm'
        underline='none'
        openInNewTab
        className='inline-flex items-center gap-1'
      >
        <Globe className='size-3.5' />
        <span>{website}</span>
      </Link>
    </div>
  </div>
)
