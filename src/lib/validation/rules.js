import * as yup from 'yup'

const requiredString = errorMessage =>
  yup.string().trim().required(errorMessage)

const firstName = requiredString('firstName.error.required')
  .min(2, 'firstName.error.min')
  .max(50, 'firstName.error.max')

const lastName = requiredString('lastName.error.required')
  .min(2, 'lastName.error.min')
  .max(50, 'lastName.error.max')

const email = {
  new: requiredString('email.error.required').email('email.error.format')
}

const captcha = requiredString('captcha.error')

const password = {
  new: requiredString('password.error.required')
    .min(6, 'password.error.min')
    .matches(/[a-zA-Z]/, {
      message: 'password.error.latin',
      excludeEmptyString: true
    })
}

export { captcha, email, firstName, lastName, password }
