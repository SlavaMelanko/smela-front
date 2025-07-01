import './styles.scss'

import clsx from 'clsx'

const PrimaryButton = ({
  type = 'button',
  variant = 'solid', // solid or outlined
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'primary-button',
        {
          'primary-button--outlined': variant === 'outlined'
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
