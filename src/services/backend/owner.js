import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import {
  buildPath,
  OWNER_ADMIN_PATH,
  OWNER_ADMINS_CANCEL_INVITE_PATH,
  OWNER_ADMINS_PATH,
  OWNER_ADMINS_PERMISSIONS_PATH,
  OWNER_ADMINS_RESEND_INVITE_PATH
} from './paths'

export const ownerApi = {
  getAdmins(params) {
    return apiClient.get(withQuery(OWNER_ADMINS_PATH, params))
  },

  getAdmin(adminId) {
    const path = buildPath(OWNER_ADMIN_PATH, { adminId })

    return apiClient.get(path)
  },

  updateAdmin(adminId, data) {
    const path = buildPath(OWNER_ADMIN_PATH, { adminId })

    return apiClient.patch(path, data)
  },

  getAdminPermissions() {
    return apiClient.get(OWNER_ADMINS_PERMISSIONS_PATH)
  },

  createAdmin(data) {
    return apiClient.post(OWNER_ADMINS_PATH, data)
  },

  resendAdminInvite(adminId) {
    const path = buildPath(OWNER_ADMINS_RESEND_INVITE_PATH, { adminId })

    return apiClient.post(path)
  },

  cancelAdminInvite(adminId) {
    const path = buildPath(OWNER_ADMINS_CANCEL_INVITE_PATH, { adminId })

    return apiClient.post(path)
  }
}
