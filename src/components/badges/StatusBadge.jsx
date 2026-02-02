import { useTranslation } from 'react-i18next'

import { getUserStatusTextColor } from '@/lib/types'
import { cn } from '@/lib/utils'

export const StatusBadge = ({ status }) => {
  const { t } = useTranslation()

  return (
    <span className={cn(getUserStatusTextColor(status))}>
      {t(`status.values.${status}`)}
    </span>
  )
}
