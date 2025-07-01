import './styles.scss'

import React, { useState } from 'react'

import { ModalProvider } from '@/contexts/ModalContext'
import useModal from '@/hooks/useModal'

import { ModalBody, ModalHeader } from '..'

export default {
  title: 'Components/Modals',
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
          <ModalHeader onClose={() => close()}>Simple Modal</ModalHeader>
          <ModalBody>
            <div className='examples-page__modal-content'>
              This is a simple modal.
            </div>
          </ModalBody>
        </>
      )
    })
  }

  return (
    <button
      className='examples-page__action-button examples-page__action-button--primary'
      onClick={handleOpen}
    >
      Open Simple Modal
    </button>
  )
}

const ModalWithActionsExample = () => {
  const { openModal } = useModal()
  const [result, setResult] = useState('')

  const handleOpen = () => {
    const close = openModal({
      children: (
        <>
          <ModalHeader onClose={() => close()}>Modal With Actions</ModalHeader>
          <ModalBody>
            <div className='examples-page__modal-content'>
              <div className='examples-page__modal-description'>
                Click a button below:
              </div>
              <div className='examples-page__modal-actions'>
                <button
                  className='examples-page__action-button examples-page__action-button--primary'
                  onClick={() => {
                    setResult('Accepted')
                    close()
                  }}
                >
                  Accept
                </button>
                <button
                  className='examples-page__action-button examples-page__action-button--secondary'
                  onClick={() => {
                    setResult('Declined')
                    close()
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </ModalBody>
        </>
      )
    })
  }

  return (
    <div>
      <button
        className='examples-page__action-button examples-page__action-button--primary'
        onClick={handleOpen}
      >
        Open Modal With Actions
      </button>
      {result && (
        <div className='examples-page__result'>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  )
}

const ModalInModalExample = () => {
  const { openModal } = useModal()
  const [result, setResult] = useState('')

  const openChildModal = parentClose => {
    const close = openModal({
      children: (
        <>
          <ModalHeader onClose={() => close()}>Child Modal</ModalHeader>
          <ModalBody>
            <div className='examples-page__modal-content'>
              This is the child modal.
              <div>
                <button
                  className='examples-page__action-button examples-page__action-button--primary'
                  onClick={() => {
                    setResult('Child Accepted')
                    close()
                    parentClose()
                  }}
                >
                  Accept & Close All
                </button>
              </div>
            </div>
          </ModalBody>
        </>
      )
    })
  }

  const handleOpen = () => {
    const closeParent = openModal({
      children: (
        <>
          <ModalHeader onClose={() => closeParent()}>Parent Modal</ModalHeader>
          <ModalBody>
            <div className='examples-page__modal-content'>
              <div className='examples-page__modal-description'>
                This is the parent modal.
              </div>
              <button
                className='examples-page__action-button examples-page__action-button--primary'
                onClick={() => openChildModal(closeParent)}
              >
                Open Child Modal
              </button>
            </div>
          </ModalBody>
        </>
      )
    })
  }

  return (
    <div>
      <button
        className='examples-page__action-button examples-page__action-button--primary'
        onClick={handleOpen}
      >
        Open Modal-in-Modal
      </button>
      {result && (
        <div className='examples-page__result'>
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  )
}

export const SimpleModal = () => (
  <ModalProvider>
    <SimpleModalExample />
  </ModalProvider>
)

export const ModalWithActions = () => (
  <ModalProvider>
    <ModalWithActionsExample />
  </ModalProvider>
)

export const ModalInModal = () => (
  <ModalProvider>
    <ModalInModalExample />
  </ModalProvider>
)
