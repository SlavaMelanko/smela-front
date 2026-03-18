import { UpdatePasswordForm } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const UpdatePasswordSection = ({ updatePassword, isUpdating }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()

  const submit = data => {
    updatePassword(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return <UpdatePasswordForm isSubmitting={isUpdating} onSubmit={submit} />
}
