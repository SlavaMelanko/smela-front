import { RoleBadge, StatusBadge } from '@/components/badges'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

const Row = ({ children }) => (
  <div className='flex items-center gap-2 text-foreground'>{children}</div>
)

const Label = ({ children }) => (
  <span className='font-medium text-muted-foreground'>{children}:</span>
)

export const ProfileDialog = ({ profile, onClose }) => {
  const { t } = useLocale()

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('profile')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <div className='flex flex-col gap-2'>
          <Row>
            <Label>ID</Label> {profile.id}
          </Row>
          <Row>
            <Label>{t('firstName.label')}</Label> {profile.firstName}
          </Row>
          <Row>
            <Label>{t('lastName.label')}</Label> {profile.lastName}
          </Row>
          <Row>
            <Label>{t('email.label')}</Label> {profile.email}
          </Row>
          <Row>
            <Label>{t('role.name')}</Label>
            <RoleBadge role={profile.role} />
          </Row>
          <Row>
            <Label>{t('status.name')}</Label>
            <StatusBadge status={profile.status} />
          </Row>
        </div>
      </DialogBody>
    </>
  )
}
