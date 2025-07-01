import './styles.scss'

import { SquareArrowOutUpRight } from 'lucide-react'

import BaseIcon from '../Icon'

const ExternalIcon = props => (
  <BaseIcon {...props} icon={SquareArrowOutUpRight} name='external' />
)

export default ExternalIcon
