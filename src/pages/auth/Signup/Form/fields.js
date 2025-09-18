const FieldName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  ROLE: 'role',
  CAPTCHA_TOKEN: 'captchaToken'
}

const getDefaultValues = role => ({
  [FieldName.FIRST_NAME]: '',
  [FieldName.LAST_NAME]: '',
  [FieldName.EMAIL]: '',
  [FieldName.PASSWORD]: '',
  [FieldName.ROLE]: role,
  [FieldName.CAPTCHA_TOKEN]: ''
})

export { FieldName, getDefaultValues }
