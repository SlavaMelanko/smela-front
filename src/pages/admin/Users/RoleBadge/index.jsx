import './styles.scss'

import clsx from 'clsx'

import { EnterpriseIcon, UserIcon } from '@/components/icons'

const RoleBadge = ({ role }) => {
  const icon =
    role === 'user' ? <UserIcon size='xs' /> : <EnterpriseIcon size='xs' />

  return <span className={clsx('role-badge')}>{icon}</span>
}

export default RoleBadge
