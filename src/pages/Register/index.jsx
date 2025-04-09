import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import FormField from '@/components/inputs/Form'
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
      <div className='register-page__card'>
        <div className='register-page__logo'>
          <MassiveLogo width={240} height={45} />
        </div>
        <form className='register-page__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='register-page__fields'>
            <div className='register-page__row'>
              <FormField
                label='First Name'
                name={FormFieldEnum.FIRST_NAME}
                error={errors.firstName?.message}
              >
                <TextInput
                  name={FormFieldEnum.FIRST_NAME}
                  placeholder='Insert first name'
                  required={true}
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
                  {...register(FormFieldEnum.LAST_NAME)}
                />
              </FormField>
            </div>

            <FormField
              label='Email'
              name={FormFieldEnum.EMAIL}
              error={errors.email?.message}
            >
              <TextInput
                name={FormFieldEnum.EMAIL}
                placeholder='example@email.com'
                required={true}
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
                {...register(FormFieldEnum.CONFIRM_PASSWORD)}
              />
            </FormField>

            <FormField
              name={FormFieldEnum.ACCEPT_TERMS}
              error={errors.acceptTerms?.message}
            >
              <label>
                <input
                  type='checkbox'
                  {...register(FormFieldEnum.ACCEPT_TERMS)}
                />
                I accept the <a href='/terms'>terms</a> and{' '}
                <a href='/privacy'>privacy policy</a>.
              </label>
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
    </div>
  )
}

export default Register
