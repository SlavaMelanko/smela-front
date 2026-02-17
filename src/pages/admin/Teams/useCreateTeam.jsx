import { CreateTeamDialog } from '@/components/dialogs'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useCreateTeam } from '@/hooks/useTeam'
import { useToast } from '@/hooks/useToast'

export const useManageTeams = () => {
  const { t, te } = useLocale()
  const { openModal } = useModal()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createTeam } = useCreateTeam()

  const openCreateTeamDialog = () => {
    const close = openModal({
      children: (
        <CreateTeamDialog
          onClose={() => close()}
          onSubmit={data => {
            close()

            createTeam(data, {
              onSuccess: () => {
                showSuccessToast(t('team.add.success'))
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

  return { openCreateTeamDialog }
}
