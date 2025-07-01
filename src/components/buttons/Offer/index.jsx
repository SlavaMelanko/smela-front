import './styles.scss'

import clsx from 'clsx'

const OfferButton = ({
  type = 'button',
  variant = 'solid', // solid or outlined
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'offer-button',
        {
          'offer-button--outlined': variant === 'outlined'
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default OfferButton
