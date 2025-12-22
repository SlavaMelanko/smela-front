import { useForm } from 'react-hook-form'

import { FormContainer, FormField, FormFields } from '@/components/form'
import { PasswordInput } from '@/components/inputs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    <FormContainer onSubmit={handleSubmit(data => onSubmit(data))}>
      <FormFields>
        <FormField name={FieldName.EMAIL} error={errors[FieldName.EMAIL]}>
          <Input
            placeholder={t('email.placeholder')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>

        <FormField name={FieldName.PASSWORD} error={errors[FieldName.PASSWORD]}>
          <PasswordInput
            placeholder={t('password.placeholder.default')}
            {...register(FieldName.PASSWORD)}
          />
        </FormField>
      </FormFields>

      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading ? t('processing') : t('login.verb')}
      </Button>
    </FormContainer>
  )
}

export default LoginForm
