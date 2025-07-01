import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { email, password } = rules

  return {
    [FieldName.EMAIL]: email.new,
    [FieldName.PASSWORD]: password.new
  }
}

const resolver = createResolver(makeSchema())

export default resolver
