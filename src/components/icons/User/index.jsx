import './styles.scss'

import { User, UserRoundPlus } from 'lucide-react'

import BaseIcon from '../Icon'

const UserIcon = props => <BaseIcon {...props} icon={User} name='user' />

const UserPlusIcon = props => (
  <BaseIcon {...props} icon={UserRoundPlus} name='user-plus' />
)

export { UserIcon, UserPlusIcon }
