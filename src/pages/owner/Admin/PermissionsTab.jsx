import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormActions,
  FormRoot,
  PermissionsMatrix,
  SubmitButton
} from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import {
  useAdminPermissions,
  useUpdateAdminPermissions
} from '@/hooks/useOwner'
import { useToast } from '@/hooks/useToast'

export const PermissionsTab = ({ adminId }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { data: permissions, isPending } = useAdminPermissions(adminId)
  const { mutate: updatePermissions, isPending: isUpdating } =
    useUpdateAdminPermissions(adminId)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useForm()

  useEffect(() => {
    if (permissions) {
      reset({ permissions })
    }
  }, [permissions, reset])

  const submit = data => {
    updatePermissions(data, {
      onSuccess: () => {
        showSuccessToast(t('changesSaved'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  return (
    <FormRoot onSubmit={handleSubmit(submit)}>
      <PermissionsMatrix
        control={control}
        permissions={permissions}
        isLoading={isPending}
      />
      <FormActions isDirty={isDirty}>
        <SubmitButton isLoading={isUpdating}>{t('save')}</SubmitButton>
      </FormActions>
    </FormRoot>
  )
}
