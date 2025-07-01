import './styles.scss'

import clsx from 'clsx'

const Badge = ({ children, className = '' }) => {
  return <span className={clsx('badge', className)}>{children}</span>
}

export default Badge
