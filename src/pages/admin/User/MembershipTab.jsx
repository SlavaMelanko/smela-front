import { MembershipForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useTeamMember, useUpdateMember } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const MembershipTab = ({ user }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { data: member } = useTeamMember(user.team.id, user.id)
  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember(
    user.team.id,
    user.id
  )

  const submit = data => {
    updateMember(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <MembershipForm
      member={member}
      team={user.team}
      isSubmitting={isUpdating}
      onSubmit={submit}
    />
  )
}
