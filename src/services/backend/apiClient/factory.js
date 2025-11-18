import { ApiClient } from './apiClient'

const createApiClient = (config = {}) => new ApiClient(config)

export { createApiClient }
