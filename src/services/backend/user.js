import api from './api'

const userService = {
  async getCurrentUser() {
    return api.get('/api/v1/protected/me')
  },

  async updateUser(userData) {
    return api.post('/api/v1/protected/me', userData)
  }
}

export default userService
