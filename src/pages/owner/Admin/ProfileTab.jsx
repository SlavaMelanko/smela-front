import { UserInfoForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useUpdateAdmin } from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'

export const ProfileTab = ({ admin }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: updateAdmin, isPending: isUpdating } = useUpdateAdmin(
    admin.id
  )

  const submit = data => {
    updateAdmin(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <UserInfoForm user={admin} isSubmitting={isUpdating} onSubmit={submit} />
  )
}
