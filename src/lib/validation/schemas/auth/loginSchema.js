import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Please provide your email address.')
    .email('Kindly enter a valid email address.'),

  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Your password should have at least 6 characters.')
    .matches(/[a-zA-Z]/, 'Your password should only contain Latin letters.')
})
