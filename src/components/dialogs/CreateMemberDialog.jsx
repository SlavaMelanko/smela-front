import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'
import { useInviteMember } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const CreateMemberDialog = ({ teamId, onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: inviteMember, isPending } = useInviteMember(teamId)

  const onSubmit = data => {
    inviteMember(data, {
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
        <DialogTitle>{t('invite.send.title.member')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <UserInvitationForm isLoading={isPending} onSubmit={onSubmit} />
      </DialogBody>
    </>
  )
}
