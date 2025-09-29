import './styles.scss'

import { Eye, EyeOff } from 'lucide-react'

import BaseIcon from '../Icon'

const EyeIcon = props => (
  <BaseIcon color='secondary' size='sm' {...props} icon={Eye} name='eye' />
)

const EyeOffIcon = props => (
  <BaseIcon
    color='secondary'
    size='sm'
    {...props}
    icon={EyeOff}
    name='eye-off'
  />
)

export { EyeIcon, EyeOffIcon }
