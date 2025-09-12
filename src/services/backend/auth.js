import api from './api'
import { path } from './paths'

const authService = {
  signUp(data) {
    return api.post(path.SIGNUP, data)
  },

  logIn(data) {
    return api.post(path.LOGIN, data)
  },

  verifyEmail(token) {
    return api.post(path.VERIFY_EMAIL, { token })
  },

  resendVerificationEmail(data) {
    return api.post(path.RESEND_VERIFICATION_EMAIL, data)
  },

  requestPasswordReset(data) {
    return api.post(path.REQUEST_PASSWORD_RESET, data)
  },

  resetPassword(data) {
    return api.post(path.RESET_PASSWORD, data)
  },

  logOut() {
    return api.post(path.LOGOUT)
  }
}

export default authService
