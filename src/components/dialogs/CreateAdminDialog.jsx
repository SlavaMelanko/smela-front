import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'
import { useCreateAdmin } from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'

export const CreateAdminDialog = ({ onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createAdmin, isPending } = useCreateAdmin()

  const onSubmit = data => {
    createAdmin(data, {
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
