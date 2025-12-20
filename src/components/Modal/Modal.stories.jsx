import { Button } from '@/components/ui/button'
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
            <Button onClick={() => close()}>OK</Button>
          </ModalFooter>
        </>
      )
    })
  }

  return <Button onClick={handleOpen}>Open simple modal</Button>
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
            <Button
              variant='outline'
              onClick={() => {
                showErrorToast('Declined')
                close()
              }}
            >
              Decline
            </Button>
            <Button
              onClick={() => {
                showSuccessToast('Accepted')
                close()
              }}
            >
              Accept
            </Button>
          </ModalFooter>
        </>
      )
    })
  }

  return <Button onClick={handleOpen}>Open modal with actions</Button>
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
            <Button
              onClick={() => {
                showSuccessToast('Child accepted')
                close()
                parentClose()
              }}
            >
              Accept & close all
            </Button>
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
            <Button onClick={() => openChildModal(closeParent)}>
              Open child modal
            </Button>
          </ModalFooter>
        </>
      )
    })
  }

  return <Button onClick={handleParentOpen}>Open modal-in-modal</Button>
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
