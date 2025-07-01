import './styles.scss'

import { X } from 'lucide-react'

import BaseIcon from '../Icon'

const CloseIcon = props => (
  <BaseIcon color='secondary' {...props} icon={X} name='close' />
)

export default CloseIcon
