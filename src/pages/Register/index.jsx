import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import FormField from '@/components/Form'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'
import {
  registerSchema,
  useYupValidationResolver
} from '@/lib/useYupValidationResolver'

import ForgotYourPasswordPrompt from '../Login/ForgotYourPasswordPrompt'
import FormFieldEnum, { getDefaultValues } from './formFields'
import LoginPrompt from './LoginPrompt'

const Register = () => {
  const resolver = useYupValidationResolver(registerSchema)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className='register-page'>
      <form className='register-page__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='register-page__fields'>
          <FormField
            label='First Name'
            name={FormFieldEnum.FIRST_NAME}
            error={errors.firstName?.message}
          >
            <TextInput
              name={FormFieldEnum.FIRST_NAME}
              placeholder='Insert first name'
              required={true}
              error={errors.firstName?.message}
              {...register(FormFieldEnum.FIRST_NAME)}
            />
          </FormField>

          <FormField
            label='Last Name'
            name={FormFieldEnum.LAST_NAME}
            error={errors.lastName?.message}
          >
            <TextInput
              name={FormFieldEnum.LAST_NAME}
              placeholder='Insert last name'
              required={true}
              error={errors.lastName?.message}
              {...register(FormFieldEnum.LAST_NAME)}
            />
          </FormField>

          <FormField
            label='Email'
            name={FormFieldEnum.EMAIL}
            error={errors.email?.message}
          >
            <TextInput
              name={FormFieldEnum.EMAIL}
              placeholder='example@email.com'
              required={true}
              error={errors.email?.message}
              {...register(FormFieldEnum.EMAIL)}
            />
          </FormField>

          <FormField
            label='Password'
            name={FormFieldEnum.PASSWORD}
            error={errors.password?.message}
          >
            <PasswordInput
              name={FormFieldEnum.PASSWORD}
              required={true}
              error={errors.password?.message}
              {...register(FormFieldEnum.PASSWORD)}
            />
          </FormField>

          <FormField
            label='Confirm Password'
            name={FormFieldEnum.CONFIRM_PASSWORD}
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              name={FormFieldEnum.CONFIRM_PASSWORD}
              required={true}
              error={errors.confirmPassword?.message}
              {...register(FormFieldEnum.CONFIRM_PASSWORD)}
            />
          </FormField>

          <FormField
            name={FormFieldEnum.ACCEPT_TERMS}
            error={errors.acceptTerms?.message}
          >
            <div className='register-page__checkbox'>
              <input
                type='checkbox'
                {...register(FormFieldEnum.ACCEPT_TERMS)}
              />
              <label className='register-page__checkbox-label'>
                I agree to the <a href='/terms'>Terms</a> &{' '}
                <a href='/privacy'>Privacy Policy</a>
              </label>
            </div>
          </FormField>
        </div>
        <PrimaryButton type='submit'>Register</PrimaryButton>
      </form>
      <div className='register-page__separator'>
        <Separator />
      </div>
      <GoogleLoginButton />
      <div className='register-page__prompts'>
        <LoginPrompt />
        <ForgotYourPasswordPrompt />
      </div>
    </div>
  )
}

export default Register
