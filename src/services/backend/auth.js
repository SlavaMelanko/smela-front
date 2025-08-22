import api from './api'

const authService = {
  async signUp(userData) {
    return api.post('/api/v1/auth/signup', { ...userData })
  },

  async logIn(email, password) {
    return api.post('/api/v1/auth/login', { email, password })
  },

  async verifyEmail(token) {
    return api.post('/api/v1/auth/verify-email', { token })
  },

  async resendVerificationEmail(email) {
    return api.post('/api/v1/auth/resend-verification-email', { email })
  },

  async requestPasswordReset(email) {
    return api.post('/api/v1/auth/request-password-reset', { email })
  },

  async resetPassword(token, password) {
    return api.post('/api/v1/auth/reset-password', { token, password })
  },

  async logOut() {
    return api.post('/api/v1/auth/logout')
  }
}

export default authService
