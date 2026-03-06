// TODO: Consolidate with src/pages/owner/Admin/ProfileTab.jsx once a shared abstraction is ready.
import { UserInfoForm } from '@/components/form'
import { useUpdateUser } from '@/hooks/useAdmin'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const ProfileTab = ({ user }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(user.id)

  const submit = data => {
    updateUser(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <UserInfoForm user={user} isSubmitting={isUpdating} onSubmit={submit} />
  )
}
