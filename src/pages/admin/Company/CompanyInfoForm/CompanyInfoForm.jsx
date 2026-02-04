import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormRoot,
  FormRow,
  SubmitButton
} from '@/components/form'
import { Input, Textarea } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues, getValues, resolver } from './schema'

export const CompanyInfoForm = ({ company, isSubmitting, onSubmit }) => {
  const { t, formatDate } = useLocale()

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
      reset(getValues(company))
    }
  }, [company, reset])

  return (
    <FormRoot onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
        <FormRow>
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

        <FormRow forceColumns>
          <FormField label={t('createdAt')} optional>
            <p className='text-base'>{formatDate(company.createdAt)}</p>
          </FormField>
          <FormField label={t('updatedAt')} optional>
            <p className='text-base'>{formatDate(company.updatedAt)}</p>
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
