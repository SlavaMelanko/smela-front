import { getUserStatusTextColor } from '@/lib/types'
import { cn } from '@/lib/utils'

export const StatusBadge = ({ status }) => (
  <span className={cn('capitalize', getUserStatusTextColor(status))}>
    {status}
  </span>
)
