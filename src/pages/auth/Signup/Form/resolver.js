import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { firstName, lastName, email, password } = rules

  return {
    [FieldName.FIRST_NAME]: firstName,
    [FieldName.LAST_NAME]: lastName.optional,
    [FieldName.EMAIL]: email.new,
    [FieldName.PASSWORD]: password.new
  }
}

const resolver = createResolver(makeSchema())

export default resolver
