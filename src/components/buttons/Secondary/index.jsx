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

const SecondaryButtonWithIcon = ({ icon, text, className, ...rest }) => {
  return (
    <SecondaryButton
      className={clsx('secondary-button-with-icon', className)}
      {...rest}
    >
      {icon}
      <span className='secondary-button-with-icon__text'>{text}</span>
    </SecondaryButton>
  )
}

export { SecondaryButton as default, SecondaryButtonWithIcon }
