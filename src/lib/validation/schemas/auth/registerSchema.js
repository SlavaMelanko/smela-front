import * as yup from 'yup'

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('Please provide your first name.')
    .min(2, 'Your first name should have at least 2 characters.')
    .max(50, 'Your first name can have up to 50 characters.'),

  lastName: yup
    .string()
    .required('Please provide your last name.')
    .min(2, 'Your last name should have at least 2 characters.')
    .max(50, 'Your last name can have up to 50 characters.'),

  email: yup
    .string()
    .required('Please provide your email address.')
    .email('Kindly enter a valid email address.'),

  password: yup
    .string()
    .required('Please create a password.')
    .min(6, 'Your password should have at least 6 characters.')
    .matches(/[a-zA-Z]/, 'Your password should only contain Latin letters.'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),

  acceptTerms: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and privacy policy to proceed.')
})
