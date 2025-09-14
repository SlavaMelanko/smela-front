import api from './api'
import { path } from './paths'

const userService = {
  getCurrentUser() {
    return api.get(path.ME)
  },

  updateUser(data) {
    return api.post(path.ME, data)
  }
}

export default userService
