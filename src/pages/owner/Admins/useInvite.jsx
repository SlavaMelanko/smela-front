import { CreateAdminDialog } from '@/components/dialogs'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useCreateAdmin, useResendAdminInvite } from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'

export const useInvite = () => {
  const { t, te } = useLocale()
  const { openModal } = useModal()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createAdmin } = useCreateAdmin()
  const { mutate: resendInvite, isPending: isResending } =
    useResendAdminInvite()

  const handleResendInvite = admin => {
    resendInvite(admin.id, {
      onSuccess: () => {
        showSuccessToast(t('invite.resend.success'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  const openInviteDialog = () => {
    const close = openModal({
      children: (
        <CreateAdminDialog
          onClose={() => close()}
          onSubmit={data => {
            close()

            createAdmin(data, {
              onSuccess: () => {
                showSuccessToast(t('invite.send.success'))
              },
              onError: error => {
                showErrorToast(te(error))
              }
            })
          }}
        />
      )
    })
  }

  const handleCancelInvitation = () => {
    // TODO: Implement cancel invitation
  }

  return {
    openInviteDialog,
    handleResendInvite,
    isResending,
    handleCancelInvitation,
    isCancelling: false
  }
}
