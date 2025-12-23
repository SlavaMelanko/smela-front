import './styles.scss'

import { ModalBody, ModalHeader } from '@/components/Modal'
import StatusLabel from '@/components/StatusLabel'
import { getFullName } from '@/lib/format/user'

export const ProfileModal = ({ profile, onClose }) => {
  return (
    <>
      <ModalHeader onClose={onClose}>User Profile</ModalHeader>
      <ModalBody>
        <div className='profile-modal__content'>
          <div className='profile-modal__info'>
            <div className='profile-modal__field'>
              <strong>ID:</strong> {profile.id}
            </div>
            <div className='profile-modal__field'>
              <strong>Name:</strong> {getFullName(profile)}
            </div>
            <div className='profile-modal__field'>
              <strong>Email:</strong> {profile.email}
            </div>
            {profile.role && (
              <div className='profile-modal__field'>
                <strong>Role:</strong>{' '}
                <span className='profile-modal__role'>{profile.role}</span>
              </div>
            )}
            <div className='profile-modal__field'>
              <strong>Status:</strong> <StatusLabel status={profile.status} />
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  )
}
