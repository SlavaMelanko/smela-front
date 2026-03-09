import { MembershipForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const MembershipSection = ({ member, team, update, isUpdating }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()

  const handleUpdate = data => {
    update(data, {
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
      team={team}
      isSubmitting={isUpdating}
      onSubmit={handleUpdate}
    />
  )
}
