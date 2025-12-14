import './styles.scss'

import clsx from 'clsx'
import { useMemo } from 'react'

import { Multiselect } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'
import { Role, UserStatus } from '@/lib/types'

const Filters = ({ isShow, params, setParams }) => {
  const { t } = useLocale()

  const overrideStrings = useMemo(
    () => ({
      allItemsAreSelected: t('multiselect.allItemsAreSelected'),
      clearSearch: t('multiselect.clearSearch'),
      clearSelected: t('multiselect.clearSelected'),
      noOptions: t('multiselect.noOptions'),
      search: t('multiselect.search'),
      selectAll: t('multiselect.selectAll'),
      selectAllFiltered: t('multiselect.selectAllFiltered'),
      selectSomeItems: t('multiselect.selectSomeItems'),
      create: t('multiselect.create')
    }),
    [t]
  )

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
      className={clsx('filters-container', {
        'filters-container--open': isShow
      })}
    >
      <div className='filters-container__content'>
        <div className='filters-container__group'>
          <h4 className='filters-container__title'>{t('role.name')}</h4>
          <Multiselect
            options={roleOptions}
            value={selectedRoles}
            onChange={handleRoleChange}
            labelledBy={t('role.name')}
            overrideStrings={overrideStrings}
          />
        </div>

        <div className='filters-container__group'>
          <h4 className='filters-container__title'>{t('status.name')}</h4>
          <Multiselect
            options={statusOptions}
            value={selectedStatuses}
            onChange={handleStatusChange}
            labelledBy={t('status.name')}
            overrideStrings={overrideStrings}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
