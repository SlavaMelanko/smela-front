import './styles.scss'

import { ModalBody, ModalHeader } from '@/components/Modal'

export const ProfileModal = ({ profile, onClose }) => {
  return (
    <>
      <ModalHeader onClose={onClose}>User Profile</ModalHeader>
      <ModalBody>
        <div className='profile-modal__content'>
          <div className='profile-modal__info'>
            <div className='profile-modal__field'>
              <strong>Name:</strong> {profile.firstName} {profile.lastName}
            </div>
            <div className='profile-modal__field'>
              <strong>Email:</strong> {profile.email}
            </div>
            <div className='profile-modal__field'>
              <strong>Status:</strong>{' '}
              <span
                className={`profile-modal__status ${
                  profile.status === 'verified'
                    ? 'profile-modal__status--verified'
                    : 'profile-modal__status--unverified'
                }`}
              >
                {profile?.status}
              </span>
            </div>
            <div className='profile-modal__field'>
              <strong>User ID:</strong> {profile.uid}
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  )
}
