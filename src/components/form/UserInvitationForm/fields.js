export const FieldName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email'
}

export const getDefaultValues = () => ({
  [FieldName.FIRST_NAME]: '',
  [FieldName.LAST_NAME]: '',
  [FieldName.EMAIL]: ''
})
