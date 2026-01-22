import { withQuery } from '@/lib/url'

import apiClient from './apiClient'
import { ADMIN_COMPANIES_PATH, ADMIN_USERS_PATH } from './paths'

export const adminApi = {
  getUsers(params) {
    return apiClient.get(withQuery(ADMIN_USERS_PATH, params))
  },

  getUserById(id) {
    return apiClient.get(`${ADMIN_USERS_PATH}/${id}`)
  },

  getCompanies(params) {
    return apiClient.get(withQuery(ADMIN_COMPANIES_PATH, params))
  },

  getCompanyById(id) {
    return apiClient.get(`${ADMIN_COMPANIES_PATH}/${id}`)
  },

  createCompany(data) {
    return apiClient.post(ADMIN_COMPANIES_PATH, data)
  },

  updateCompany(id, data) {
    return apiClient.patch(`${ADMIN_COMPANIES_PATH}/${id}`, data)
  },

  deleteCompany(id) {
    return apiClient.delete(`${ADMIN_COMPANIES_PATH}/${id}`)
  }
}
