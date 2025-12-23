import { getStatusTextColor } from '@/lib/types/user/status'
import { cn } from '@/lib/utils'

const StatusLabel = ({ status }) => (
  <span className={cn('capitalize', getStatusTextColor(status))}>{status}</span>
)

export default StatusLabel
