import { TeamInfoForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useUpdateTeam } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const TeamInfo = ({ team }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam(team.id)

  const handleUpdateTeam = data => {
    updateTeam(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <TeamInfoForm
      team={team}
      isSubmitting={isUpdating}
      onSubmit={handleUpdateTeam}
    />
  )
}
