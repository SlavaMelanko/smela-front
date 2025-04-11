import * as yup from 'yup'

import { email, firstName, lastName, password } from './rules'

export const registerSchema = yup.object({
  firstName,
  lastName,
  email,
  password,
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),

  acceptTerms: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and privacy policy to proceed.')
})
