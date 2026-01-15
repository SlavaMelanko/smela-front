import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import { OWNER_ADMINS_PATH } from './paths'

const ownerService = {
  getAdmins(params) {
    return apiClient.get(withQuery(OWNER_ADMINS_PATH, params))
  }
}

export default ownerService
