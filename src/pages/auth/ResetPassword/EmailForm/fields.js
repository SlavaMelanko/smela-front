const FieldName = {
  EMAIL: 'email',
  CAPTCHA_TOKEN: 'captchaToken'
}

const getDefaultValues = () => ({
  [FieldName.EMAIL]: '',
  [FieldName.CAPTCHA_TOKEN]: ''
})

export { FieldName, getDefaultValues }
