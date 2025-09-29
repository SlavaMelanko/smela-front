import './styles.scss'

import clsx from 'clsx'

const ModalContent = ({
  children,
  className,
  size = 'md',
  centered = true,
  fullHeight = false,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'modal-content',
        `modal-content--${size}`,
        {
          'modal-content--centered': centered,
          'modal-content--full-height': fullHeight
        },
        className
      )}
      onClick={e => e.stopPropagation()}
      {...rest}
    >
      {children}
    </div>
  )
}

export default ModalContent
