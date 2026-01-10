export const FieldName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password'
}

export const getDefaultValues = () => ({
  [FieldName.FIRST_NAME]: '',
  [FieldName.LAST_NAME]: '',
  [FieldName.EMAIL]: '',
  [FieldName.PASSWORD]: ''
})
