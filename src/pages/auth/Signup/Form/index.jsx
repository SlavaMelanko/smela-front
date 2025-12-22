import { useForm } from 'react-hook-form'

import { FormContainer, FormField, FormFields } from '@/components/form'
import { PasswordInput, TextInput } from '@/components/inputs'
import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const SignupForm = ({ isLoading, onSubmit }) => {
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
    <FormContainer onSubmit={handleSubmit(data => onSubmit(data))}>
      <FormFields>
        <FormField
          label={t('firstName.label')}
          name={FieldName.FIRST_NAME}
          error={errors[FieldName.FIRST_NAME]}
        >
          <TextInput
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
          <TextInput
            placeholder={t('lastName.example')}
            {...register(FieldName.LAST_NAME)}
          />
        </FormField>

        <FormField
          label={t('email.label')}
          name={FieldName.EMAIL}
          error={errors[FieldName.EMAIL]}
        >
          <TextInput
            placeholder={t('email.example')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>

        <FormField
          label={t('password.label')}
          name={FieldName.PASSWORD}
          error={errors[FieldName.PASSWORD]}
        >
          <PasswordInput
            placeholder={t('password.placeholder.masked')}
            {...register(FieldName.PASSWORD)}
          />
        </FormField>
      </FormFields>

      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading ? t('processing') : t('signUp')}
      </Button>
    </FormContainer>
  )
}

export default SignupForm
