const FieldName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  CAPTCHA_TOKEN: 'captchaToken'
}

const getDefaultValues = () => ({
  [FieldName.FIRST_NAME]: '',
  [FieldName.LAST_NAME]: '',
  [FieldName.EMAIL]: '',
  [FieldName.PASSWORD]: '',
  [FieldName.CAPTCHA_TOKEN]: ''
})

export { FieldName, getDefaultValues }
