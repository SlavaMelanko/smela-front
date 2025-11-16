import { accessTokenStorage } from '@/lib/storage'

import api from './api'
import { path } from './paths'

const authService = {
  async signUp(data) {
    const response = await api.post(path.SIGNUP, data)

    if (response.data.accessToken) {
      accessTokenStorage.set(response.data.accessToken)
    }

    return response
  },

  async logIn(data) {
    const response = await api.post(path.LOGIN, data)

    if (response.data.accessToken) {
      accessTokenStorage.set(response.data.accessToken)
    }

    return response
  },

  async verifyEmail(token) {
    const response = await api.post(path.VERIFY_EMAIL, { token })

    if (response.data.accessToken) {
      accessTokenStorage.set(response.data.accessToken)
    }

    return response
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

  async refreshToken() {
    const response = await api.post(path.REFRESH_TOKEN)

    if (response.data.accessToken) {
      accessTokenStorage.set(response.data.accessToken)
    }

    return response
  },

  async logOut() {
    accessTokenStorage.clear()

    return api.post(path.LOGOUT)
  }
}

export default authService
