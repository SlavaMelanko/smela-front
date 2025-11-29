import './styles.scss'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { PasswordInput, TextInput } from '@/components/inputs'
import InvisibleReCaptcha2 from '@/components/InvisibleReCaptcha2'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const LoginForm = ({ isLoading, onSubmit }) => {
  const { t } = useLocale()
  const recaptchaRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const submitForm = async data => {
    const captchaToken = await recaptchaRef.current?.executeAsync()

    onSubmit({ data, captcha: { token: captchaToken } })
  }

  return (
    <form
      className='login-form'
      /* eslint-disable-next-line react-hooks/refs -- React Hook Form pattern is safe */
      onSubmit={handleSubmit(submitForm)}
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

      <InvisibleReCaptcha2 ref={recaptchaRef} />
    </form>
  )
}

export default LoginForm
