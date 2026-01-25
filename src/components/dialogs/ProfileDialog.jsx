import { StatusBadge } from '@/components/badges'
import { EmailLink } from '@/components/links'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

const Row = ({ children }) => (
  <div className='flex items-center gap-2 text-foreground'>{children}</div>
)

const Label = ({ children }) => (
  <span className='text-muted-foreground'>{children}:</span>
)

export const ProfileDialog = ({ profile, onClose }) => {
  const { t } = useLocale()

  const fields = [
    { label: 'ID', value: <span>{profile.id}</span> },
    { label: t('firstName.label'), value: <span>{profile.firstName}</span> },
    { label: t('lastName.label'), value: <span>{profile.lastName}</span> },
    { label: t('email.label'), value: <EmailLink email={profile.email} /> },
    { label: t('status.name'), value: <StatusBadge status={profile.status} /> }
  ]

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('profile')}</DialogTitle>
      </DialogHeader>
      <DialogBody className='flex flex-col gap-3'>
        {fields.map(({ label, value }) => (
          <Row key={label}>
            <Label>{label}</Label>
            {value}
          </Row>
        ))}
      </DialogBody>
    </>
  )
}
