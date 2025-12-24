import './styles.scss'

import { User, Users } from 'lucide-react'

import BaseIcon from '../Icon'

const UserIcon = props => <BaseIcon {...props} icon={User} name='user' />

const UsersIcon = props => <BaseIcon {...props} icon={Users} name='users' />

export { UserIcon, UsersIcon }
