import { UserInfoForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useAdmin, useUpdateAdmin } from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'
import { getFullName } from '@/lib/format/user'

export const ProfileTab = ({ id }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { data: admin, isPending: isUpdating } = useAdmin(id)
  const { mutate: updateAdmin } = useUpdateAdmin(id)

  const submit = data => {
    updateAdmin(data, {
      onSuccess: () => {
        showSuccessToast(t('update.success', { name: getFullName(data) }))
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
