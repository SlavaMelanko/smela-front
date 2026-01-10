import * as yup from 'yup'

import {
  EmailConstraint,
  NameConstraint,
  PasswordConstraint
} from './constants'

const requiredStr = errorMessage => yup.string().trim().required(errorMessage)

export const firstName = requiredStr('firstName.error.required')
  .min(NameConstraint.MIN_LENGTH, 'firstName.error.min')
  .max(NameConstraint.MAX_LENGTH, 'firstName.error.max')

export const lastName = {
  required: requiredStr('lastName.error.required')
    .min(NameConstraint.MIN_LENGTH, 'lastName.error.min')
    .max(NameConstraint.MAX_LENGTH, 'lastName.error.max'),

  // Optional version - validates when provided but not required
  optional: yup
    .string()
    .trim()
    .transform(value => (value === '' ? undefined : value))
    .min(NameConstraint.MIN_LENGTH, 'lastName.error.min')
    .max(NameConstraint.MAX_LENGTH, 'lastName.error.max')
}

export const email = {
  new: requiredStr('email.error.required').matches(
    EmailConstraint.STANDARD,
    'email.error.format'
  )
}

export const captcha = requiredStr('captcha.error')

export const password = {
  new: requiredStr('password.error.required')
    .min(PasswordConstraint.MIN_LENGTH, 'password.error.min')
    .matches(PasswordConstraint.STRONG, {
      message: 'password.error.strong',
      excludeEmptyString: true
    })
}
