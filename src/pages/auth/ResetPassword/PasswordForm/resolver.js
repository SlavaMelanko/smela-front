import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { password } = rules

  return {
    [FieldName.NEW_PASSWORD]: password.new
  }
}

const resolver = createResolver(makeSchema())

export default resolver
