import apiClient from './apiClient'
import { path } from './paths'

const userService = {
  getCurrentUser() {
    return apiClient.get(path.ME)
  },

  updateUser(data) {
    return apiClient.post(path.ME, data)
  }
}

export default userService
