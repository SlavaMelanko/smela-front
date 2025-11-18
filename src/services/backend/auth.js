import apiClient from './apiClient'
import { path } from './paths'

const authService = {
  signUp(data) {
    return apiClient.post(path.SIGNUP, data)
  },

  logIn(data) {
    return apiClient.post(path.LOGIN, data)
  },

  verifyEmail(token) {
    return apiClient.post(path.VERIFY_EMAIL, { token })
  },

  resendVerificationEmail(data) {
    return apiClient.post(path.RESEND_VERIFICATION_EMAIL, data)
  },

  requestPasswordReset(data) {
    return apiClient.post(path.REQUEST_PASSWORD_RESET, data)
  },

  resetPassword(data) {
    return apiClient.post(path.RESET_PASSWORD, data)
  },

  refreshToken() {
    return apiClient.post(path.REFRESH_TOKEN)
  },

  logOut() {
    return apiClient.post(path.LOGOUT)
  }
}

export default authService
