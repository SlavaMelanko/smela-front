import './styles.scss'

import clsx from 'clsx'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const ModalOverlay = ({
  children,
  onClose,
  className,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  ...rest
}) => {
  const overlayRef = useRef(null)

  const handleOverlayClick = e => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose()
    }
  }

  const handleKeyDown = useCallback(
    e => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose()
      }
    },
    [closeOnEsc, onClose]
  )

  useEffect(() => {
    if (closeOnEsc) {
      document.addEventListener('keydown', handleKeyDown)

      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeOnEsc, handleKeyDown])

  return createPortal(
    <div
      ref={overlayRef}
      className={clsx(className)}
      onClick={handleOverlayClick}
      {...rest}
    >
      {children}
    </div>,
    document.body
  )
}

export default ModalOverlay
