import { createResolver, rules } from '@/lib/validation'

export const FieldName = {
  NAME: 'name',
  WEBSITE: 'website',
  DESCRIPTION: 'description'
}

export const getDefaultValues = () => ({
  [FieldName.NAME]: '',
  [FieldName.WEBSITE]: '',
  [FieldName.DESCRIPTION]: ''
})

export const resolver = createResolver({
  [FieldName.NAME]: rules.companyName({
    required: 'company.name.error.required',
    min: 'company.name.error.min',
    max: 'company.name.error.max'
  }),
  [FieldName.WEBSITE]: rules.url('company.website.error.format'),
  [FieldName.DESCRIPTION]: rules.description('company.description.error.max')
})
