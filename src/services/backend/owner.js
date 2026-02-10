import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import { OWNER_ADMINS_PATH, OWNER_ADMINS_RESEND_INVITE_PATH } from './paths'

export const ownerApi = {
  getAdmins(params) {
    return apiClient.get(withQuery(OWNER_ADMINS_PATH, params))
  },

  inviteAdmin(data) {
    return apiClient.post(OWNER_ADMINS_PATH, data)
  },

  resendAdminInvitation(id) {
    return apiClient.post(OWNER_ADMINS_RESEND_INVITE_PATH.replace(':id', id))
  }
}
