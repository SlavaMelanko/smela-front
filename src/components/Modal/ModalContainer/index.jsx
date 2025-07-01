import './styles.scss'

import useModal from '@/hooks/useModal'

import Modal from '../Modal'

const ModalContainer = () => {
  const { modals } = useModal()

  return (
    <div className='modal-container'>
      {modals.map(modal => (
        <Modal key={modal.id} {...modal} />
      ))}
    </div>
  )
}

export default ModalContainer
