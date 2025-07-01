import './styles.scss'

import { EyeOff } from 'lucide-react'

import BaseIcon from '../Icon'

const EyeOffIcon = props => (
  <BaseIcon
    {...props}
    icon={EyeOff}
    color='secondary'
    size='sm'
    name='eye-off'
  />
)

export default EyeOffIcon
