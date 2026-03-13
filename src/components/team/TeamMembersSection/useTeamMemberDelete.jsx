import { useLocale } from '@/hooks/useLocale'
import { useDeleteMember } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const useDelete = teamId => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: deleteMember, isPending: isDeleting } =
    useDeleteMember(teamId)

  const handleDeleteMember = member => {
    deleteMember(member.id, {
      onSuccess: () => {
        showSuccessToast(t('team.members.remove.success'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return { handleDeleteMember, isDeleting }
}
