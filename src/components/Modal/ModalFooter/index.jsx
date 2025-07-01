import './styles.scss'

import clsx from 'clsx'

const ModalFooter = ({
  children,
  className,
  justify = 'end',
  borderTop = true,
  spacing = 'default',
  ...rest
}) => {
  return (
    <footer
      className={clsx(
        'modal-footer',
        `modal-footer--justify-${justify}`,
        `modal-footer--spacing-${spacing}`,
        {
          'modal-footer--border-top': borderTop
        },
        className
      )}
      {...rest}
    >
      {children}
    </footer>
  )
}

export default ModalFooter
