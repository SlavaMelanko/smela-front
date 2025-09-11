import './styles.scss'

import { Calendar, CalendarX } from 'lucide-react'

import BaseIcon from '../Icon'

const CalendarIcon = props => (
  <BaseIcon {...props} icon={Calendar} name='calendar' />
)

const CalendarXIcon = props => (
  <BaseIcon {...props} icon={CalendarX} name='calendar-x' />
)

export { CalendarIcon, CalendarXIcon }
