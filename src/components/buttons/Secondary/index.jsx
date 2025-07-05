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

const SecondaryButtonWithIcon = ({
  iconLeft,
  text,
  iconRight,
  className,
  ...rest
}) => {
  return (
    <SecondaryButton
      className={clsx('secondary-button-with-icon', className)}
      {...rest}
    >
      {iconLeft && (
        <span className='secondary-button-with-icon__icon-left'>
          {iconLeft}
        </span>
      )}
      <span className='secondary-button-with-icon__text'>{text}</span>
      {iconRight && (
        <span className='secondary-button-with-icon__icon-right'>
          {iconRight}
        </span>
      )}
    </SecondaryButton>
  )
}

export { SecondaryButton as default, SecondaryButtonWithIcon }
