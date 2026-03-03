import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormRoot, PermissionsMatrix, SubmitButton } from '@/components/form'
import { useLocale } from '@/hooks/useLocale'
import { useAdminPermissions } from '@/hooks/useOwner'

export const PermissionsTab = () => {
  const { t } = useLocale()
  const { data: permissions, isPending } = useAdminPermissions()

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

  return (
    <FormRoot onSubmit={handleSubmit(() => {})}>
      <PermissionsMatrix
        control={control}
        permissions={permissions}
        isLoading={isPending}
      />
      <div className='flex justify-end'>
        <SubmitButton isLoading={false} disabled={!isDirty}>
          {t('save')}
        </SubmitButton>
      </div>
    </FormRoot>
  )
}
