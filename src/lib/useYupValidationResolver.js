import { useCallback } from 'react'
import * as yup from 'yup'

/*
 * Took from:
 * https://www.react-hook-form.com/advanced-usage/#CustomHookwithResolver
 */
export const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required!')
    .min(2, 'Full name must have at least 2 characters!')
    .max(50, 'Full name must have at most 50 characters!'),

  email: yup
    .string()
    .required('Email is required!')
    .email('Please enter a valid email address!'),

  password: yup
    .string()
    .required('Password is required!')
    .min(6, 'Password must have at least 6 characters!')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters!'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required!')
    .oneOf([yup.ref('password')], 'Passwords must match!')
})
