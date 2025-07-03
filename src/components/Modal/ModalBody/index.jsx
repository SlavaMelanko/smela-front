import './styles.scss'

import clsx from 'clsx'

const ModalBody = ({
  children,
  className,
  scrollable = true,
  dividers = false,
  ...rest
}) => {
  return (
    <main
      className={clsx(
        'modal-body',
        {
          'modal-body--scrollable': scrollable,
          'modal-body--dividers': dividers
        },
        className
      )}
      {...rest}
    >
      {children}
    </main>
  )
}

export default ModalBody
