import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'

export const CreateMemberDialog = ({ onClose, onSubmit }) => {
  const { t } = useLocale()

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('invite.send.title.member')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <UserInvitationForm onSubmit={onSubmit} />
      </DialogBody>
    </>
  )
}
