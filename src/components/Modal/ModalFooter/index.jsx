import './styles.scss'

import clsx from 'clsx'

const ModalFooter = ({ children, className, borderTop = false, ...rest }) => {
  return (
    <footer
      className={clsx(
        'modal-footer',
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
