// React Compiler breaks RHF's proxy-based isDirty subscription
'use no memo'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormController,
  FormField,
  FormFields,
  FormReadOnly,
  FormRoot,
  FormRow,
  SubmitButton
} from '@/components/form'
import { Input } from '@/components/ui'
import { StatusDropdown } from '@/components/UserStatus'
import { useLocale } from '@/hooks/useLocale'

import { FieldName, getDefaultValues, getValues, resolver } from './schema'

export const UserInfoForm = ({ user, isSubmitting, onSubmit }) => {
  const { t, formatDate } = useLocale()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  useEffect(() => {
    if (user) {
      reset(getValues(user))
    }
  }, [user, reset])

  return (
    <FormRoot onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <FormRow>
          <FormField
            label={t('firstName.label')}
            name={FieldName.FIRST_NAME}
            error={errors[FieldName.FIRST_NAME]}
          >
            <Input {...register(FieldName.FIRST_NAME)} />
          </FormField>

          <FormField
            label={t('lastName.label')}
            name={FieldName.LAST_NAME}
            error={errors[FieldName.LAST_NAME]}
            optional
          >
            <Input {...register(FieldName.LAST_NAME)} />
          </FormField>
        </FormRow>

        <FormRow>
          <FormController
            name={FieldName.STATUS}
            label={t('status.name')}
            control={control}
            render={({ field }) => (
              <StatusDropdown value={field.value} onChange={field.onChange} />
            )}
          />
        </FormRow>

        <FormRow forceColumns>
          <FormField label={t('createdAt')} optional>
            <FormReadOnly>{formatDate(user?.createdAt)}</FormReadOnly>
          </FormField>
          <FormField label={t('updatedAt')} optional>
            <FormReadOnly>{formatDate(user?.updatedAt)}</FormReadOnly>
          </FormField>
        </FormRow>

        <div className='flex justify-end'>
          <SubmitButton isLoading={isSubmitting} disabled={!isDirty}>
            {t('save')}
          </SubmitButton>
        </div>
      </FormFields>
    </FormRoot>
  )
}
