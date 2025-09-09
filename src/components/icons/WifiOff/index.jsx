import './styles.scss'

import { WifiOff } from 'lucide-react'

import BaseIcon from '../Icon'

const WifiOffIcon = props => (
  <BaseIcon
    {...props}
    icon={WifiOff}
    color='secondary'
    size='sm'
    name='wifi-off'
  />
)

export default WifiOffIcon
