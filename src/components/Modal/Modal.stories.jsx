import { PrimaryButton, SecondaryButton } from '@/components/buttons'
import { ModalProvider } from '@/contexts/ModalContext'
import { NotificationProvider } from '@/contexts/NotificationContext.jsx'
import { ThemeProvider } from '@/contexts/ThemeContext'
import useModal from '@/hooks/useModal'
import useNotifications from '@/hooks/useNotifications'

import { ModalBody, ModalFooter, ModalHeader } from '.'

export default {
  title: 'Modal',
  parameters: {
    layout: 'centered'
  }
}

const SimpleModalExample = () => {
  const { openModal } = useModal()

  const handleOpen = () => {
    const close = openModal({
      children: (
        <>
          <ModalHeader onClose={() => close()}>Breaking News 📰</ModalHeader>
          <ModalBody>
            <p>Congratulations! You’ve just opened a simple modal.</p>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={() => close()}>OK</PrimaryButton>
          </ModalFooter>
        </>
      )
    })
  }

  return <PrimaryButton onClick={handleOpen}>Open simple modal</PrimaryButton>
}

const ModalWithActionsExample = () => {
  const { showSuccessToast, showErrorToast } = useNotifications()
  const { openModal } = useModal()

  const handleOpen = () => {
    const close = openModal({
      children: (
        <>
          <ModalHeader onClose={() => close()}>Choose an Action</ModalHeader>
          <ModalBody>
            <p>Please confirm what you’d like to do:</p>
          </ModalBody>
          <ModalFooter>
            <SecondaryButton
              onClick={() => {
                showErrorToast('Declined')
                close()
              }}
            >
              Decline
            </SecondaryButton>
            <PrimaryButton
              onClick={() => {
                showSuccessToast('Accepted')
                close()
              }}
            >
              Accept
            </PrimaryButton>
          </ModalFooter>
        </>
      )
    })
  }

  return (
    <PrimaryButton onClick={handleOpen}>Open modal with actions</PrimaryButton>
  )
}

const ModalInModalExample = () => {
  const { showSuccessToast } = useNotifications()
  const { openModal } = useModal()

  const openChildModal = parentClose => {
    const close = openModal({
      children: (
        <>
          <ModalHeader onClose={() => close()}>Child Modal</ModalHeader>
          <ModalBody>
            <p>This is the child modal.</p>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              onClick={() => {
                showSuccessToast('Child accepted')
                close()
                parentClose()
              }}
            >
              Accept & close all
            </PrimaryButton>
          </ModalFooter>
        </>
      )
    })
  }

  const handleParentOpen = () => {
    const closeParent = openModal({
      children: (
        <>
          <ModalHeader onClose={() => closeParent()}>Parent Modal</ModalHeader>
          <ModalBody>
            <p>This is the parent modal.</p>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={() => openChildModal(closeParent)}>
              Open child modal
            </PrimaryButton>
          </ModalFooter>
        </>
      )
    })
  }

  return (
    <PrimaryButton onClick={handleParentOpen}>
      Open modal-in-modal
    </PrimaryButton>
  )
}

export const SimpleModal = () => (
  <ModalProvider>
    <SimpleModalExample />
  </ModalProvider>
)

export const ModalWithActions = () => (
  <ThemeProvider>
    <NotificationProvider>
      <ModalProvider>
        <ModalWithActionsExample />
      </ModalProvider>
    </NotificationProvider>
  </ThemeProvider>
)

export const ModalInModal = () => (
  <ThemeProvider>
    <NotificationProvider>
      <ModalProvider>
        <ModalInModalExample />
      </ModalProvider>
    </NotificationProvider>
  </ThemeProvider>
)
