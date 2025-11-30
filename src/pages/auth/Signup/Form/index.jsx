import './styles.scss'

import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { PasswordInput, TextInput } from '@/components/inputs'
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
    <form
      className='signup-form'
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      <div className='signup-form__fields'>
        <FormField
          label={t('firstName.label')}
          name={FieldName.FIRST_NAME}
          error={errors[FieldName.FIRST_NAME]}
          required
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
          required
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
          required
        >
          <PasswordInput
            placeholder={t('password.placeholder.masked')}
            {...register(FieldName.PASSWORD)}
          />
        </FormField>
      </div>

      <PrimaryButton type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading ? t('processing') : t('signUp')}
      </PrimaryButton>
    </form>
  )
}

export default SignupForm
