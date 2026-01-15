import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormGroup,
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
      <FormGroup legend={t('personalDetails')}>
        <FormFields>
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

          <FormField
            label={t('email.label')}
            name={FieldName.EMAIL}
            error={errors[FieldName.EMAIL]}
          >
            <Input {...register(FieldName.EMAIL)} />
          </FormField>
        </FormFields>
      </FormGroup>

      <FormGroup legend={t('permissions')}>
        <FormFields></FormFields>
      </FormGroup>

      <SubmitButton isLoading={isSubmitting || isLoading}>
        {submitLabel}
      </SubmitButton>
    </FormRoot>
  )
}
