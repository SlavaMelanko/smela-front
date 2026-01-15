import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormRoot,
  SubmitButton
} from '@/components/form'
import { Input } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

export const UserInvitationForm = ({ isLoading, submitLabel, onSubmit }) => {
  const { t } = useLocale()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  return (
    <FormRoot onSubmit={handleSubmit(data => onSubmit(data))}>
      <FormFields>
        <FormField
          label={t('firstName.label')}
          name={FieldName.FIRST_NAME}
          error={errors[FieldName.FIRST_NAME]}
        >
          <Input
            placeholder={t('firstName.example')}
            {...register(FieldName.FIRST_NAME)}
          />
        </FormField>

        <FormField
          label={t('lastName.label')}
          name={FieldName.LAST_NAME}
          error={errors[FieldName.LAST_NAME]}
          optional
        >
          <Input
            placeholder={t('lastName.example')}
            {...register(FieldName.LAST_NAME)}
          />
        </FormField>

        <FormField
          label={t('email.label')}
          name={FieldName.EMAIL}
          error={errors[FieldName.EMAIL]}
        >
          <Input
            placeholder={t('email.example')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>
      </FormFields>

      <SubmitButton isLoading={isSubmitting || isLoading}>
        {submitLabel}
      </SubmitButton>
    </FormRoot>
  )
}
