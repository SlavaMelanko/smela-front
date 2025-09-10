import './styles.scss'

import { EyeOff } from 'lucide-react'

import BaseIcon from '../Icon'

const EyeOffIcon = props => (
  <BaseIcon
    color='secondary'
    size='sm'
    {...props}
    icon={EyeOff}
    name='eye-off'
  />
)

export default EyeOffIcon
