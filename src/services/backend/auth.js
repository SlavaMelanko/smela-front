import api from './api'

const authService = {
  async signUp(userData) {
    return api.post('/auth/signup', { ...userData })
  },

  async logIn(email, password) {
    return api.post('/auth/login', { email, password })
  },

  async verifyEmail(token) {
    return api.post('/auth/verify-email', { token })
  },

  async resendVerificationEmail(email) {
    return api.post('/auth/resend-verification-email', { email })
  },

  async requestPasswordReset(email) {
    return api.post('/auth/request-password-reset', { email })
  },

  async resetPassword(token, password) {
    return api.post('/auth/reset-password', { token, password })
  },

  async logOut() {
    return api.post('/auth/logout')
  }
}

export default authService
