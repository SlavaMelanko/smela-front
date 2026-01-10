export const FieldName = {
  EMAIL: 'email'
}

export const getDefaultValues = email => ({
  [FieldName.EMAIL]: email || ''
})
