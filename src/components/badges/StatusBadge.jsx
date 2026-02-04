import useLocale from '@/hooks/useLocale'
import { getUserStatusTextColor } from '@/lib/types'
import { cn } from '@/lib/utils'

export const StatusBadge = ({ status }) => {
  const { t } = useLocale()

  if (!status) {
    return null
  }

  return (
    <span
      className={cn(getUserStatusTextColor(status))}
      data-testid='status-badge'
    >
      {t(`status.values.${status}`)}
    </span>
  )
}
