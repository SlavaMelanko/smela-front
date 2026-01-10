import { Globe } from 'lucide-react'

import { cn } from '@/lib/utils'

const Bandwidth = ({ value, unit, className = '', showIcon = true }) => (
  <div className={cn('flex items-center justify-center gap-2', className)}>
    {showIcon && <Globe className='size-6' />}
    <p className='text-2xl font-medium text-foreground'>
      {value} {unit}
    </p>
  </div>
)

export default Bandwidth
