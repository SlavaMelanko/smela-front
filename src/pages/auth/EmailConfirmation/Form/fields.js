const FieldName = {
  USER_EMAIL: 'email',
  CAPTCHA_TOKEN: 'captchaToken'
}

const getDefaultValues = userEmail => ({
  [FieldName.USER_EMAIL]: userEmail || '',
  [FieldName.CAPTCHA_TOKEN]: ''
})

export { FieldName, getDefaultValues }
