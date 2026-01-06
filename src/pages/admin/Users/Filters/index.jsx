import { useMemo } from 'react'

import { Multiselect } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'
import { Role, UserStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const Filters = ({ isShow, params, setParams }) => {
  const { t } = useLocale()

  const roleOptions = useMemo(
    () =>
      Object.values(Role).map(role => ({
        label: t(`role.values.${role}`),
        value: role
      })),
    [t]
  )

  const statusOptions = useMemo(
    () =>
      Object.values(UserStatus).map(status => ({
        label: t(`status.values.${status}`),
        value: status
      })),
    [t]
  )

  const selectedRoles = roleOptions.filter(opt =>
    params.roles.includes(opt.value)
  )

  const selectedStatuses = statusOptions.filter(opt =>
    params.statuses.includes(opt.value)
  )

  const handleRoleChange = selected => {
    setParams({ roles: selected.map(s => s.value) }, { resetPage: true })
  }

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
        <div className='flex flex-col gap-6 p-4 md:flex-row md:[&>*]:min-w-48 md:[&>*]:flex-1'>
          <Multiselect
            options={roleOptions}
            value={selectedRoles}
            onChange={handleRoleChange}
            placeholder={t('role.placeholder')}
          />

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

export default Filters
