import './styles.scss'

import clsx from 'clsx'

import { ChevronDownIcon } from '@/components/icons'

const ChevronToggle = ({ isOpen, className, size = 'xs', ...rest }) => (
  <ChevronDownIcon
    className={clsx(
      'chevron-toggle',
      isOpen && 'chevron-toggle--open',
      className
    )}
    size={size}
    {...rest}
  />
)

export default ChevronToggle
