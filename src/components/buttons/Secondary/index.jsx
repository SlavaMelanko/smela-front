import './styles.scss'

import clsx from 'clsx'

const SecondaryButton = ({ type = 'button', className, children, ...rest }) => {
  return (
    <button
      type={type}
      className={clsx('secondary-button', className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default SecondaryButton
