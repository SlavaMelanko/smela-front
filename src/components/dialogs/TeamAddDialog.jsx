import { TeamAddForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useCreateTeam } from '@/hooks/useAdmin'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const TeamAddDialog = ({ onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createTeam, isPending } = useCreateTeam()

  const onSubmit = data => {
    createTeam(data, {
      onSuccess: () => {
        showSuccessToast(t('team.add.success'))
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
        <DialogTitle>{t('team.add.title')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <TeamAddForm
          isLoading={isPending}
          submitLabel={t('team.add.cta')}
          onSubmit={onSubmit}
        />
      </DialogBody>
    </>
  )
}
