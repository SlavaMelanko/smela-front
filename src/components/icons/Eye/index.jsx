import './styles.scss'

import { Eye } from 'lucide-react'

import BaseIcon from '../Icon'

const EyeIcon = props => (
  <BaseIcon color='secondary' size='sm' {...props} icon={Eye} name='eye' />
)

export default EyeIcon
