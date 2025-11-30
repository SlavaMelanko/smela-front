import apiClient from './apiClient'
import { ME_PATH } from './paths'

const userService = {
  getCurrentUser() {
    return apiClient.get(ME_PATH)
  },

  updateUser(data) {
    return apiClient.post(ME_PATH, data)
  }
}

export default userService
