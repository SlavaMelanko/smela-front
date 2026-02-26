import { InviteForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'

export const CreateAdminDialog = ({ onClose, onSubmit }) => {
  const { t } = useLocale()

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('invite.send.title.admin')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <InviteForm onSubmit={onSubmit} customConfig={{ position: false }} />
      </DialogBody>
    </>
  )
}
