import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => {
  const { captcha } = rules

  return {
    [FieldName.CAPTCHA]: captcha
  }
}

const resolver = createResolver(makeSchema())

export default resolver
