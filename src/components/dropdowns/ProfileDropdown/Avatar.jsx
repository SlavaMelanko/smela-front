import './styles.scss'

import clsx from 'clsx'

import { UserIcon } from '@/components/icons'

const Avatar = ({ className = '' }) => {
  return <UserIcon className={clsx('profile-dropdown__avatar', className)} />
}

export default Avatar
