import './styles.scss'

import clsx from 'clsx'
import { useEffect } from 'react'

import useModal from '@/hooks/useModal'

import ModalContent from './Content'
import ModalOverlay from './Overlay'

const Modal = ({
  id,
  isOpen,
  isClosing,
  children,
  size,
  centered,
  closeOnOverlayClick,
  closeOnEsc,
  animationPreset,
  preserveScrollBarGap,
  onClose,
  className,
  ...rest
}) => {
  const { closeModal } = useModal()

  const handleClose = () => {
    onClose?.()

    closeModal(id)
  }

  useEffect(() => {
    if (!isOpen || !preserveScrollBarGap) {
      return
    }

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarWidth}px`

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen, preserveScrollBarGap])

  return (
    <ModalOverlay
      onClose={handleClose}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnEsc}
      className={clsx('modal-overlay', {
        'modal-overlay--open': isOpen,
        'modal-overlay--closing': isClosing
      })}
      {...rest}
    >
      <div
        className={clsx(
          'modal',
          `modal--${animationPreset}`,
          {
            'modal--closing': isClosing,
            'modal--open': !isClosing
          },
          className
        )}
      >
        <ModalContent size={size} centered={centered} {...rest}>
          {children}
        </ModalContent>
      </div>
    </ModalOverlay>
  )
}

export default Modal
