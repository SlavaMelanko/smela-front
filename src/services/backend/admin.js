import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import { ADMIN_USERS_PATH } from './paths'

const adminService = {
  getUsers(params) {
    return apiClient.get(withQuery(ADMIN_USERS_PATH, params))
  },

  getUserById(id) {
    return apiClient.get(`${ADMIN_USERS_PATH}/${id}`)
  }
}

export default adminService
