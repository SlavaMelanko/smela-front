import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import {
  ADMIN_TEAMS_PATH,
  TEAM_MEMBER_PATH,
  TEAM_MEMBER_RESEND_INVITE_PATH,
  TEAM_MEMBERS_PATH,
  TEAMS_PATH
} from './paths'

export const teamApi = {
  // Admin-only operations
  listTeams(params) {
    return apiClient.get(withQuery(ADMIN_TEAMS_PATH, params))
  },

  createTeam(data) {
    return apiClient.post(ADMIN_TEAMS_PATH, data)
  },

  // Verified user + admin operations
  getTeam(teamId) {
    const url = TEAMS_PATH.replace(':teamId', teamId)

    return apiClient.get(url)
  },

  updateTeam(teamId, data) {
    const url = TEAMS_PATH.replace(':teamId', teamId)

    return apiClient.patch(url, data)
  },

  getMembers(teamId) {
    const url = TEAM_MEMBERS_PATH.replace(':teamId', teamId)

    return apiClient.get(url)
  },

  inviteMember(teamId, data) {
    const url = TEAM_MEMBERS_PATH.replace(':teamId', teamId)

    return apiClient.post(url, data)
  },

  getMember(teamId, memberId) {
    const url = TEAM_MEMBER_PATH.replace(':teamId', teamId).replace(
      ':memberId',
      memberId
    )

    return apiClient.get(url)
  },

  updateMember(teamId, memberId, data) {
    const url = TEAM_MEMBER_PATH.replace(':teamId', teamId).replace(
      ':memberId',
      memberId
    )

    return apiClient.patch(url, data)
  },

  resendInvite(teamId, memberId) {
    const url = TEAM_MEMBER_RESEND_INVITE_PATH.replace(
      ':teamId',
      teamId
    ).replace(':memberId', memberId)

    return apiClient.post(url)
  }
}
