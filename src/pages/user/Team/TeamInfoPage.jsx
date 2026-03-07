import { useOutletContext } from 'react-router-dom'

import { TeamInfoForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useUpdateTeam } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const TeamInfoPage = () => {
  const { team, teamId } = useOutletContext()
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam(teamId)

  const submit = data => {
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
    <TeamInfoForm team={team} isSubmitting={isUpdating} onSubmit={submit} />
  )
}
