import './styles.scss'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'

import BaseIcon from '../Icon'

const ChevronDownIcon = props => (
  <BaseIcon {...props} icon={ChevronDown} name='chevron-down' />
)

const ChevronUpIcon = props => (
  <BaseIcon {...props} icon={ChevronUp} name='chevron-up' />
)

const ChevronLeftIcon = props => (
  <BaseIcon {...props} icon={ChevronLeft} name='chevron-left' />
)

const ChevronRightIcon = props => (
  <BaseIcon {...props} icon={ChevronRight} name='chevron-right' />
)

export { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon }
