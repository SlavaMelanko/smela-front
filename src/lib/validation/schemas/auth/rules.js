import * as yup from 'yup'

export const firstName = yup
  .string()
  .required('Please provide your first name.')
  .min(2, 'Your first name should have at least 2 characters.')
  .max(50, 'Your first name can have up to 50 characters.')

export const lastName = yup
  .string()
  .required('Please provide your last name.')
  .min(2, 'Your last name should have at least 2 characters.')
  .max(50, 'Your last name can have up to 50 characters.')

export const email = yup
  .string()
  .required('Please provide your email address.')
  .email('Kindly enter a valid email address.')

export const password = yup
  .string()
  .required('Please create a password.')
  .min(6, 'Your password should have at least 6 characters.')
  .matches(/[a-zA-Z]/, 'Your password should only contain Latin letters.')
