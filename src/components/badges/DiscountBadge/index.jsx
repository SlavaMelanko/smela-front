import './styles.scss'

import clsx from 'clsx'

const DiscountBadge = ({ prefix, label, className }) => {
  return (
    <span className={clsx('discount-badge', className)}>
      {prefix && `${prefix}: `}
      {label}
    </span>
  )
}

export default DiscountBadge
