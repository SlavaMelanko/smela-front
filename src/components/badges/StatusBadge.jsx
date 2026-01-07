import { getStatusTextColor } from '@/lib/types/user/status'
import { cn } from '@/lib/utils'

export const StatusBadge = ({ status }) => (
  <span className={cn('capitalize', getStatusTextColor(status))}>{status}</span>
)
