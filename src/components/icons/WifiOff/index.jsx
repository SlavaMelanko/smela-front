import './styles.scss'

import { WifiOff } from 'lucide-react'

import BaseIcon from '../Icon'

const WifiOffIcon = props => (
  <BaseIcon
    color='secondary'
    size='sm'
    {...props}
    icon={WifiOff}
    name='wifi-off'
  />
)

export default WifiOffIcon
