const FieldName = {
  EMAIL: 'email'
}

const getDefaultValues = email => ({
  [FieldName.EMAIL]: email || ''
})

export { FieldName, getDefaultValues }
