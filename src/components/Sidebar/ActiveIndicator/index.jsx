import './styles.scss'

import clsx from 'clsx'

const ActiveIndicator = ({ variant }) => {
  return (
    <div
      className={clsx('active-indicator', {
        [`active-indicator--${variant}`]: variant
      })}
    />
  )
}

export default ActiveIndicator
