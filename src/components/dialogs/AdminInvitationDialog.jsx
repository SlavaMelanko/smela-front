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
        showSuccessToast(t('admin.invite.success'))
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
        <DialogTitle>{t('admin.invite.title')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <UserInvitationForm
          isLoading={isPending}
          submitLabel={t('admin.invite.cta')}
          onSubmit={onSubmit}
        />
      </DialogBody>
    </>
  )
}
