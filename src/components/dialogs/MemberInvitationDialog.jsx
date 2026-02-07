import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useInviteTeamMember } from '@/hooks/useAdmin'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const MemberInvitationDialog = ({ teamId, onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: inviteMember, isPending } = useInviteTeamMember(teamId)

  const onSubmit = data => {
    inviteMember(data, {
      onSuccess: () => {
        showSuccessToast(t('invitation.send.success'))
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
        <DialogTitle>{t('invitation.send.title.member')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <UserInvitationForm isLoading={isPending} onSubmit={onSubmit} />
      </DialogBody>
    </>
  )
}
