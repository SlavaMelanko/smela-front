import StatusLabel from '@/components/StatusLabel'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { getFullName } from '@/lib/format/user'

export const ProfileModal = ({ profile, onClose }) => {
  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>User Profile</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <div className='flex flex-col gap-3'>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>ID:</span>{' '}
            {profile.id}
          </div>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>Name:</span>{' '}
            {getFullName(profile)}
          </div>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>Email:</span>{' '}
            {profile.email}
          </div>
          {profile.role && (
            <div className='text-foreground'>
              <span className='font-medium text-muted-foreground'>Role:</span>{' '}
              <span className='capitalize'>{profile.role}</span>
            </div>
          )}
          <div className='flex items-center gap-2 text-foreground'>
            <span className='font-medium text-muted-foreground'>Status:</span>
            <StatusLabel status={profile.status} />
          </div>
        </div>
      </DialogBody>
    </>
  )
}
