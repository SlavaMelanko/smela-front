import { RoleBadge, StatusBadge } from '@/components/badges'
import { EmailLink } from '@/components/EmailLink'
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
      <DialogBody className='flex flex-col gap-3'>
        <Row>
          <Label>ID</Label>
          <span>{profile.id}</span>
        </Row>
        <Row>
          <Label>{t('firstName.label')}</Label>
          <span>{profile.firstName}</span>
        </Row>
        <Row>
          <Label>{t('lastName.label')}</Label>
          <span>{profile.lastName}</span>
        </Row>
        <Row>
          <Label>{t('email.label')}</Label>
          <EmailLink email={profile.email} />
        </Row>
        <Row>
          <Label>{t('role.name')}</Label>
          <RoleBadge role={profile.role} />
        </Row>
        <Row>
          <Label>{t('status.name')}</Label>
          <StatusBadge status={profile.status} />
        </Row>
      </DialogBody>
    </>
  )
}
