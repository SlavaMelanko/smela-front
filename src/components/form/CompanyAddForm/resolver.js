import { createResolver, rules } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => ({
  [FieldName.NAME]: rules.companyName({
    required: 'company.name.error.required',
    min: 'company.name.error.min',
    max: 'company.name.error.max'
  }),
  [FieldName.WEBSITE]: rules.url('company.website.error.format'),
  [FieldName.DESCRIPTION]: rules.description('company.description.error.max')
})

const resolver = createResolver(makeSchema())

export default resolver
