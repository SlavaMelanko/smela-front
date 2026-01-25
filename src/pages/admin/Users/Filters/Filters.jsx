import { useMemo } from 'react'

import { Multiselect } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'
import { UserStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

export const Filters = ({ isShow, params, setParams }) => {
  const { t } = useLocale()

  const statusOptions = useMemo(
    () =>
      Object.values(UserStatus).map(status => ({
        label: t(`status.values.${status}`),
        value: status
      })),
    [t]
  )

  const selectedStatuses = statusOptions.filter(opt =>
    params.statuses.includes(opt.value)
  )

  const handleStatusChange = selected => {
    setParams({ statuses: selected.map(s => s.value) }, { resetPage: true })
  }

  return (
    <div
      className={cn(
        'grid grid-rows-[0fr] rounded-md border border-transparent bg-background transition-all duration-300',
        isShow && 'grid-rows-[1fr] border-border'
      )}
    >
      <div className='overflow-hidden'>
        <div className='flex flex-col gap-6 p-4 md:flex-row md:*:min-w-48 md:*:flex-1'>
          <Multiselect
            options={statusOptions}
            value={selectedStatuses}
            onChange={handleStatusChange}
            placeholder={t('status.placeholder')}
          />
        </div>
      </div>
    </div>
  )
}
