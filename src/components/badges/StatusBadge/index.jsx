import { getStatusTextColor } from '@/lib/types/user/status'
import { cn } from '@/lib/utils'

const StatusBadge = ({ status }) => (
  <span className={cn('capitalize', getStatusTextColor(status))}>{status}</span>
)

export default StatusBadge
