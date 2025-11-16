import { accessTokenStorage } from '@/lib/storage'

import api from './api'
import { path } from './paths'

const storeAccessToken = response => {
  const { accessToken } = response.data

  if (accessToken) {
    accessTokenStorage.set(accessToken)
  }
}

const authService = {
  async signUp(data) {
    const response = await api.post(path.SIGNUP, data)

    storeAccessToken(response)

    return response
  },

  async logIn(data) {
    const response = await api.post(path.LOGIN, data)

    storeAccessToken(response)

    return response
  },

  async verifyEmail(token) {
    const response = await api.post(path.VERIFY_EMAIL, { token })

    storeAccessToken(response)

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

    storeAccessToken(response)

    return response
  },

  async logOut() {
    accessTokenStorage.clear()

    return api.post(path.LOGOUT)
  }
}

export default authService
