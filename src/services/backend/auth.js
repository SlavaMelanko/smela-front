import api from './api'
import { path } from './paths'

const authService = {
  async signUp(userData) {
    return api.post(path.SIGNUP, { ...userData })
  },

  async logIn(email, password) {
    return api.post(path.LOGIN, { email, password })
  },

  async verifyEmail(token) {
    return api.post(path.VERIFY_EMAIL, { token })
  },

  async resendVerificationEmail(email, captchaToken) {
    return api.post(path.RESEND_VERIFICATION_EMAIL, { email, captchaToken })
  },

  async requestPasswordReset(data) {
    return api.post(path.REQUEST_PASSWORD_RESET, data)
  },

  async resetPassword(token, password) {
    return api.post(path.RESET_PASSWORD, { token, password })
  },

  async logOut() {
    return api.post(path.LOGOUT)
  }
}

export default authService
