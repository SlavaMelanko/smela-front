import './styles.scss'

import clsx from 'clsx'
import { Link } from 'react-router-dom'

const InternalLink = ({
  to,
  children,
  size = 'md',
  underline = 'hover', // 'hover' | 'always' | 'none'
  className = '',
  newTab = false,
  ...rest
}) => {
  const underlineClass =
    underline === 'always'
      ? 'internal-link--underline-always'
      : underline === 'hover'
        ? 'internal-link--underline-hover'
        : ''

  return (
    <Link
      to={to}
      className={clsx(
        'internal-link',
        `internal-link--${size}`,
        underlineClass,
        className
      )}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default InternalLink
