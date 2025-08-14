import * as yup from 'yup'

const requiredStr = errorMessage => yup.string().trim().required(errorMessage)

const firstName = requiredStr('firstName.error.required')
  .min(2, 'firstName.error.min')
  .max(50, 'firstName.error.max')

const lastName = {
  required: requiredStr('lastName.error.required')
    .min(2, 'lastName.error.min')
    .max(50, 'lastName.error.max'),

  // Optional version - validates when provided but not required.
  optional: yup
    .string()
    .trim()
    .transform(value => (value === '' ? undefined : value))
    .min(2, 'lastName.error.min')
    .max(50, 'lastName.error.max')
}

const email = {
  new: requiredStr('email.error.required').email('email.error.format')
}

const captcha = requiredStr('captcha.error')

const password = {
  new: requiredStr('password.error.required')
    .min(6, 'password.error.min')
    .matches(/[a-zA-Z]/, {
      message: 'password.error.latin',
      excludeEmptyString: true
    })
}

export { captcha, email, firstName, lastName, password }
