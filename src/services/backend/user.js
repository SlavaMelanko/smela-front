import api from './api'

const userService = {
  async getCurrentUser() {
    return api.get('/api/v1/me')
  }
}

export default userService
