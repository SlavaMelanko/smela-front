import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'
import { useInviteAdmin } from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'

export const AdminInvitationDialog = ({ onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: inviteAdmin, isPending } = useInviteAdmin()

  const onSubmit = data => {
    inviteAdmin(data, {
      onSuccess: () => {
        showSuccessToast(t('invite.send.success'))
        onClose()
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('invite.send.title.admin')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <UserInvitationForm
          isLoading={isPending}
          onSubmit={onSubmit}
          customConfig={{ position: false }}
        />
      </DialogBody>
    </>
  )
}
