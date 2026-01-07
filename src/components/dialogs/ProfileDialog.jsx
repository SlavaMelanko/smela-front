import StatusLabel from '@/components/StatusLabel'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

export const ProfileDialog = ({ profile, onClose }) => {
  const { t } = useLocale()

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('profile')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <div className='flex flex-col gap-3'>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>ID:</span>{' '}
            {profile.id}
          </div>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>
              {t('firstName.label')}:
            </span>{' '}
            {profile.firstName}
          </div>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>
              {t('lastName.label')}:
            </span>{' '}
            {profile.lastName}
          </div>
          <div className='text-foreground'>
            <span className='font-medium text-muted-foreground'>
              {t('email.label')}:
            </span>{' '}
            {profile.email}
          </div>
          {profile.role && (
            <div className='text-foreground'>
              <span className='font-medium text-muted-foreground'>
                {t('role.name')}:
              </span>{' '}
              <span className='capitalize'>{profile.role}</span>
            </div>
          )}
          <div className='flex items-center gap-2 text-foreground'>
            <span className='font-medium text-muted-foreground'>
              {t('status.name')}:
            </span>
            <StatusLabel status={profile.status} />
          </div>
        </div>
      </DialogBody>
    </>
  )
}
