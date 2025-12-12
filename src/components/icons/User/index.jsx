import './styles.scss'

import { User, UserRoundPlus, Users } from 'lucide-react'

import BaseIcon from '../Icon'

const UserIcon = props => <BaseIcon {...props} icon={User} name='user' />

const UserPlusIcon = props => (
  <BaseIcon {...props} icon={UserRoundPlus} name='user-plus' />
)

const UsersIcon = props => <BaseIcon {...props} icon={Users} name='users' />

export { UserIcon, UserPlusIcon, UsersIcon }
