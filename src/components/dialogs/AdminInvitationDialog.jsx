import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import useLocale from '@/hooks/useLocale'
import { useInviteAdmin } from '@/hooks/useOwner'
import useToast from '@/hooks/useToast'
import { toTranslationKey } from '@/services/catch'

export const AdminInvitationDialog = ({ onClose }) => {
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: inviteAdmin, isPending } = useInviteAdmin()

  const onSubmit = data => {
    inviteAdmin(data, {
      onSuccess: () => {
        showSuccessToast(t('invitation.send.success'))
        onClose()
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
  }

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('invitation.send.title.admin')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <UserInvitationForm isLoading={isPending} onSubmit={onSubmit} />
      </DialogBody>
    </>
  )
}
