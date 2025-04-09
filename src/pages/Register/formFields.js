const FormFieldEnum = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  ACCEPT_TERMS: 'acceptTerms'
}

export const getDefaultValues = () => ({
  [FormFieldEnum.FIRST_NAME]: '',
  [FormFieldEnum.LAST_NAME]: '',
  [FormFieldEnum.EMAIL]: '',
  [FormFieldEnum.PASSWORD]: '',
  [FormFieldEnum.CONFIRM_PASSWORD]: '',
  [FormFieldEnum.ACCEPT_TERMS]: false
})

export default FormFieldEnum
