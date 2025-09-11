import './styles.scss'

import { TriangleAlert } from 'lucide-react'

import BaseIcon from '../Icon'

const WarningIcon = props => (
  <BaseIcon
    color='secondary'
    size='sm'
    {...props}
    icon={TriangleAlert}
    name='warning'
  />
)

export default WarningIcon
