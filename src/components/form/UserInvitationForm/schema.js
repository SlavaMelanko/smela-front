import { createResolver, rules } from '@/lib/validation'

export const FieldName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  POSITION: 'position'
}

export const getDefaultValues = () => ({
  [FieldName.FIRST_NAME]: '',
  [FieldName.LAST_NAME]: '',
  [FieldName.EMAIL]: '',
  [FieldName.POSITION]: '',
  permissions: {
    users: {
      view: true,
      manage: true
    },
    teams: {
      view: true,
      manage: false
    }
  }
})

export const resolver = createResolver({
  [FieldName.FIRST_NAME]: rules.firstName,
  [FieldName.LAST_NAME]: rules.lastName.optional,
  [FieldName.EMAIL]: rules.email.new,
  [FieldName.POSITION]: rules.position
})

export const defaultConfig = {
  [FieldName.FIRST_NAME]: true,
  [FieldName.LAST_NAME]: true,
  [FieldName.EMAIL]: true,
  [FieldName.POSITION]: true,
  permissions: true
}
