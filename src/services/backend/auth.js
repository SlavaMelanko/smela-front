import apiClient from './apiClient'
import {
  LOGIN_PATH,
  LOGOUT_PATH,
  REQUEST_PASSWORD_RESET_PATH,
  RESEND_VERIFICATION_EMAIL_PATH,
  RESET_PASSWORD_PATH,
  SIGNUP_PATH,
  VERIFY_EMAIL_PATH
} from './paths'

const authService = {
  signUp(data) {
    return apiClient.post(SIGNUP_PATH, data)
  },

  logIn(data) {
    return apiClient.post(LOGIN_PATH, data)
  },

  verifyEmail(token) {
    return apiClient.post(VERIFY_EMAIL_PATH, { token })
  },

  resendVerificationEmail(data) {
    return apiClient.post(RESEND_VERIFICATION_EMAIL_PATH, data)
  },

  requestPasswordReset(data) {
    return apiClient.post(REQUEST_PASSWORD_RESET_PATH, data)
  },

  resetPassword(data) {
    return apiClient.post(RESET_PASSWORD_PATH, data)
  },

  logOut() {
    return apiClient.post(LOGOUT_PATH)
  }
}

export default authService
