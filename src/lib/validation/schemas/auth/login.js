import * as yup from 'yup'

import { email, password } from './rules'

export const login = yup.object({
  email,
  password
})
