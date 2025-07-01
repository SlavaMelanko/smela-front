import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { email, captcha } = rules

  return {
    [FieldName.EMAIL]: email.new,
    [FieldName.CAPTCHA]: captcha
  }
}

const resolver = createResolver(makeSchema())

export default resolver
