import './styles.scss'

import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { PasswordInput, TextInput } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const LoginForm = ({ isLoading, onSubmit }) => {
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
      className='login-form'
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      <div className='login-form__fields'>
        <FormField
          name={FieldName.EMAIL}
          error={errors[FieldName.EMAIL]}
          required
        >
          <TextInput
            placeholder={t('email.placeholder')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>

        <FormField
          name={FieldName.PASSWORD}
          error={errors[FieldName.PASSWORD]}
          required
        >
          <PasswordInput
            placeholder={t('password.placeholder.default')}
            {...register(FieldName.PASSWORD)}
          />
        </FormField>
      </div>

      <PrimaryButton type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading ? t('processing') : t('login.verb')}
      </PrimaryButton>
    </form>
  )
}

export default LoginForm
