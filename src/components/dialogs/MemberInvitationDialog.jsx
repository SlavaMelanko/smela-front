import { UserInvitationForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useInviteCompanyMember } from '@/hooks/useAdmin'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const MemberInvitationDialog = ({ companyId, onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: inviteMember, isPending } = useInviteCompanyMember(companyId)

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
