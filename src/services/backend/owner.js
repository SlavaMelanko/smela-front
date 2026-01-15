import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import { OWNER_ADMINS_INVITE_PATH, OWNER_ADMINS_PATH } from './paths'

const ownerService = {
  getAdmins(params) {
    return apiClient.get(withQuery(OWNER_ADMINS_PATH, params))
  },

  inviteAdmin(data) {
    return apiClient.post(OWNER_ADMINS_INVITE_PATH, data)
  }
}

export default ownerService
