const FieldName = {
  USER_EMAIL: 'email'
}

const getDefaultValues = userEmail => ({
  [FieldName.USER_EMAIL]: userEmail || ''
})

export { FieldName, getDefaultValues }
