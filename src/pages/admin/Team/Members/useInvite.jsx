import { CreateMemberDialog } from '@/components/dialogs'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useInviteMember } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const useInvite = teamId => {
  const { t, te } = useLocale()
  const { openModal } = useModal()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: inviteMember } = useInviteMember(teamId)

  const openInviteDialog = () => {
    const close = openModal({
      children: (
        <CreateMemberDialog
          onClose={() => close()}
          onSubmit={data => {
            close()

            inviteMember(data, {
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

  return { openInviteDialog }
}
