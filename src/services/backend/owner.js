import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import { OWNER_ADMINS_PATH, OWNER_ADMINS_RESEND_INVITE_PATH } from './paths'

export const ownerApi = {
  getAdmins(params) {
    return apiClient.get(withQuery(OWNER_ADMINS_PATH, params))
  },

  createAdmin(data) {
    return apiClient.post(OWNER_ADMINS_PATH, data)
  },

  resendAdminInvite(id) {
    return apiClient.post(OWNER_ADMINS_RESEND_INVITE_PATH.replace(':id', id))
  }
}
