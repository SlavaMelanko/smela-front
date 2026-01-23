import * as yup from 'yup'

import { createResolver } from '@/lib/validation'

import { FieldName } from './fields'

const makeSchema = () => ({
  [FieldName.NAME]: yup.string().trim().required('company.name.error.required'),
  [FieldName.WEBSITE]: yup
    .string()
    .trim()
    .transform(value => (value === '' ? undefined : value))
    .url('company.website.error.format'),
  [FieldName.DESCRIPTION]: yup
    .string()
    .trim()
    .transform(value => (value === '' ? undefined : value))
    .max(500, 'company.description.error.max')
})

const resolver = createResolver(makeSchema())

export default resolver
