import './styles.scss'

import { MessageCircleQuestion } from 'lucide-react'

import BaseIcon from '../Icon'

const HelpIcon = props => (
  <BaseIcon {...props} icon={MessageCircleQuestion} name='help' />
)

export default HelpIcon
