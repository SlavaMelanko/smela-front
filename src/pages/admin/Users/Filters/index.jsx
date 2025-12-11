import './styles.scss'

import clsx from 'clsx'

import { Checkbox } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'
import Role from '@/lib/types/user/role'
import UserStatus from '@/lib/types/user/status'

const Filters = ({ isShow, params, setParams }) => {
  const { t } = useLocale()

  const handleRoleChange = role => {
    const currentRoles = params.roles
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(r => r !== role)
      : [...currentRoles, role]

    setParams({ roles: newRoles }, { resetPage: true })
  }

  const handleStatusChange = status => {
    const currentStatuses = params.statuses
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status]

    setParams({ statuses: newStatuses }, { resetPage: true })
  }

  return (
    <div
      className={clsx('filters-container', {
        'filters-container--open': isShow
      })}
    >
      <div className='filters-container__content'>
        <div className='filters-container__group'>
          <h4 className='filters-container__title'>{t('filters.role')}</h4>
          <div className='filters-container__options'>
            {Object.values(Role).map(role => (
              <Checkbox
                key={role}
                name={`role-${role}`}
                checked={params.roles.includes(role)}
                onChange={() => handleRoleChange(role)}
              >
                {t(`role.${role}`)}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className='filters-container__group'>
          <h4 className='filters-container__title'>{t('filters.status')}</h4>
          <div className='filters-container__options'>
            {Object.values(UserStatus).map(status => (
              <Checkbox
                key={status}
                name={`status-${status}`}
                checked={params.statuses.includes(status)}
                onChange={() => handleStatusChange(status)}
              >
                {t(`status.${status}`)}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
