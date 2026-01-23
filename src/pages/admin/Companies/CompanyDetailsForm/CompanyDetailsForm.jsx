import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormField, FormFields, FormRoot, FormRow } from '@/components/form'
import { Button, Input, Textarea } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

export const CompanyDetailsForm = ({ company, isLoading, onSubmit }) => {
  const { t } = useLocale()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  useEffect(() => {
    if (company) {
      reset({
        [FieldName.NAME]: company.name ?? '',
        [FieldName.WEBSITE]: company.website ?? '',
        [FieldName.DESCRIPTION]: company.description ?? ''
      })
    }
  }, [company, reset])

  if (isLoading) {
    return null
  }

  return (
    <FormRoot onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <FormRow className='grid-cols-1 md:grid-cols-2'>
          <FormField
            label={t('company.name.label')}
            name={FieldName.NAME}
            error={errors[FieldName.NAME]}
          >
            <Input {...register(FieldName.NAME)} />
          </FormField>

          <FormField
            label={t('company.website.label')}
            name={FieldName.WEBSITE}
            error={errors[FieldName.WEBSITE]}
            optional
          >
            <Input {...register(FieldName.WEBSITE)} placeholder='https://' />
          </FormField>
        </FormRow>

        <FormField
          label={t('company.description.label')}
          name={FieldName.DESCRIPTION}
          error={errors[FieldName.DESCRIPTION]}
          optional
        >
          <Textarea {...register(FieldName.DESCRIPTION)} />
        </FormField>

        <div className='flex justify-end'>
          <Button type='submit' disabled={!isDirty}>
            {t('save')}
          </Button>
        </div>
      </FormFields>
    </FormRoot>
  )
}
