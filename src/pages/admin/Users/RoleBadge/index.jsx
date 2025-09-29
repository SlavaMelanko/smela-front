import './styles.scss'

import clsx from 'clsx'

import { EnterpriseIcon, UserIcon } from '@/components/icons'
import { Role } from '@/lib/types'

const RoleBadge = ({ role }) => {
  const icon =
    role === Role.ENTERPRISE ? (
      <EnterpriseIcon size='xs' />
    ) : (
      <UserIcon size='xs' />
    )

  return <span className={clsx('role-badge')}>{icon}</span>
}

export default RoleBadge
