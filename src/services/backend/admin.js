import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import {
  ADMIN_TEAMS_MEMBERS_PATH,
  ADMIN_TEAMS_PATH,
  ADMIN_TEAMS_RESEND_INVITE_PATH,
  ADMIN_USERS_PATH
} from './paths'

export const adminApi = {
  getUsers(params) {
    return apiClient.get(withQuery(ADMIN_USERS_PATH, params))
  },

  getUserById(id) {
    return apiClient.get(`${ADMIN_USERS_PATH}/${id}`)
  },

  getTeams(params) {
    return apiClient.get(withQuery(ADMIN_TEAMS_PATH, params))
  },

  getTeamById(id) {
    return apiClient.get(`${ADMIN_TEAMS_PATH}/${id}`)
  },

  createTeam(data) {
    return apiClient.post(ADMIN_TEAMS_PATH, data)
  },

  updateTeam(id, data) {
    return apiClient.patch(`${ADMIN_TEAMS_PATH}/${id}`, data)
  },

  deleteTeam(id) {
    return apiClient.delete(`${ADMIN_TEAMS_PATH}/${id}`)
  },

  inviteTeamMember(teamId, data) {
    const url = ADMIN_TEAMS_MEMBERS_PATH.replace(':id', teamId)

    return apiClient.post(url, data)
  },

  resendTeamInvite(teamId, memberId) {
    const url = ADMIN_TEAMS_RESEND_INVITE_PATH.replace(':id', teamId).replace(
      ':memberId',
      memberId
    )

    return apiClient.post(url)
  }
}
