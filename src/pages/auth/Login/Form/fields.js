const FieldName = {
  EMAIL: 'email',
  PASSWORD: 'password'
}

const getDefaultValues = () => ({
  [FieldName.EMAIL]: '',
  [FieldName.PASSWORD]: ''
})

export { FieldName, getDefaultValues }
