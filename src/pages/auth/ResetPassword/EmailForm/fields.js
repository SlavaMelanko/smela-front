const FieldName = {
  EMAIL: 'email',
  CAPTCHA: 'captcha'
}

const getDefaultValues = () => ({
  [FieldName.EMAIL]: '',
  [FieldName.CAPTCHA]: ''
})

export { FieldName, getDefaultValues }
