import { createResolver, rules } from '@/lib/validation'

export const FieldName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  POSITION: 'position',
  PERMISSIONS_VIEW: 'permissions.view',
  PERMISSIONS_CREATE: 'permissions.create',
  PERMISSIONS_EDIT: 'permissions.edit',
  PERMISSIONS_DELETE: 'permissions.delete'
}

export const getDefaultValues = () => ({
  [FieldName.FIRST_NAME]: '',
  [FieldName.LAST_NAME]: '',
  [FieldName.EMAIL]: '',
  [FieldName.POSITION]: '',
  permissions: {
    view: true,
    create: true,
    edit: true,
    delete: true
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
