import apiClient from './apiClient'
import { ME_PATH } from './paths'

export const userApi = {
  getCurrentUser() {
    return apiClient.get(ME_PATH)
  },

  updateUser(data) {
    return apiClient.patch(ME_PATH, data)
  }
}
