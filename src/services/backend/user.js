import api from './api'
import { path } from './paths'

const userService = {
  async getCurrentUser() {
    return api.get(path.ME)
  },

  async updateUser(userData) {
    return api.post(path.ME, userData)
  }
}

export default userService
