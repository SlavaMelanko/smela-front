import './styles.scss'

import clsx from 'clsx'

import CloseIcon from '@/components/icons/Close'

const ModalHeader = ({
  children,
  className,
  onClose,
  showCloseButton = true,
  closeButtonProps = {},
  borderBottom = true,
  ...rest
}) => {
  return (
    <header
      className={clsx(
        'modal-header',
        {
          'modal-header--border-bottom': borderBottom
        },
        className
      )}
      {...rest}
    >
      <div className='modal-header__content'>{children}</div>
      {showCloseButton && (
        <button
          type='button'
          className='modal-header__close'
          onClick={onClose ?? (() => {})}
          aria-label='Close modal'
          {...closeButtonProps}
        >
          <CloseIcon size='sm' />
        </button>
      )}
    </header>
  )
}

export default ModalHeader
