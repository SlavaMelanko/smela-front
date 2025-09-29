import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { email, captcha } = rules

  return {
    [FieldName.USER_EMAIL]: email,
    [FieldName.CAPTCHA_TOKEN]: captcha
  }
}

const resolver = createResolver(makeSchema())

export default resolver
