import * as yup from 'yup'

import { email, password } from './rules'

export const loginSchema = yup.object({
  email,
  password
})
