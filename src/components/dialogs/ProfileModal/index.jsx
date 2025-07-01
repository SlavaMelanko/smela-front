import './styles.scss'

import { ModalBody, ModalFooter, ModalHeader } from '@/components/Modal'

export const ProfileModal = ({ profile, onClose }) => {
  const handleEditProfile = () => {
    onClose()
  }

  return (
    <>
      <ModalHeader onClose={onClose}>Profile Information</ModalHeader>
      <ModalBody>
        <div className='profile-modal__content'>
          <h3 className='profile-modal__title'>User Profile</h3>
          <div className='profile-modal__info'>
            {(profile.firstName || profile.lastName) && (
              <div className='profile-modal__field'>
                <strong>Name:</strong> {profile.firstName} {profile.lastName}
              </div>
            )}
            {profile.email && (
              <div className='profile-modal__field'>
                <strong>Email:</strong> {profile.email}
              </div>
            )}
            {/* TODO: this is just example for demo, can be removed\restyled */}
            {profile.status && (
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
            )}
            {profile.uid && (
              <div className='profile-modal__field'>
                <strong>User ID:</strong> {profile.uid}
              </div>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type='button'
          className='profile-modal__button profile-modal__button--primary'
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
        <button
          type='button'
          className='profile-modal__button profile-modal__button--secondary'
          onClick={onClose}
        >
          Close
        </button>
      </ModalFooter>
    </>
  )
}
