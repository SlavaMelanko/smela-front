import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { email } = rules

  return {
    [FieldName.EMAIL]: email.new
  }
}

const resolver = createResolver(makeSchema())

export default resolver
