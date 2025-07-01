import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { ModalContainer } from '@/components/Modal'

const ModalContext = createContext()

const CLOSE_ANIMATION_MS = 200

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([])

  const closeModal = useCallback(id => {
    setModals(prev =>
      prev.map(modal =>
        modal.id === id ? { ...modal, isOpen: false, isClosing: true } : modal
      )
    )

    setTimeout(() => {
      setModals(prev => prev.filter(modal => modal.id !== id))
    }, CLOSE_ANIMATION_MS)
  }, [])

  const openModal = useCallback(
    modalConfig => {
      const id = crypto.randomUUID()
      const modal = {
        id,
        isOpen: true,
        size: 'md',
        centered: true,
        closeOnOverlayClick: true,
        closeOnEsc: true,
        preserveScrollBarGap: true,
        animationPreset: 'slide-in-bottom',
        ...modalConfig
      }

      setModals(prev => [...prev, modal])

      return () => closeModal(id)
    },
    [closeModal]
  )

  const closeAllModals = useCallback(() => {
    setModals(prev =>
      prev.map(modal => ({ ...modal, isOpen: false, isClosing: true }))
    )

    setTimeout(() => {
      setModals([])
    }, CLOSE_ANIMATION_MS)
  }, [])

  const updateModal = useCallback((id, updates) => {
    setModals(prev =>
      prev.map(modal => (modal.id === id ? { ...modal, ...updates } : modal))
    )
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      if (modals.length > 0) {
        closeAllModals()
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [modals.length, closeAllModals])

  const value = useMemo(
    () => ({
      modals,
      openModal,
      closeModal,
      closeAllModals,
      updateModal
    }),
    [modals, openModal, closeModal, closeAllModals, updateModal]
  )

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  )
}

export default ModalContext
