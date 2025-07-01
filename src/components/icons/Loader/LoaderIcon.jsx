import './styles.scss'

import { Loader } from 'lucide-react'

import BaseIcon from '../Icon'

export const LoaderIcon = props => (
  <BaseIcon {...props} icon={Loader} name='loader' />
)
