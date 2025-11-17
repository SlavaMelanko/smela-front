import env from '@/lib/env'
import { HttpStatus } from '@/lib/http-status'
import accessTokenStorage from '@/lib/storage/accessTokenStorage'
import TokenRefreshManager from '@/services/backend/authRefreshManager'

const createError = async response => {
  const errorData = await response.json().catch(() => ({}))

  const error = new Error(
    errorData.error || `HTTP error! status: ${response.status}`
  )

  error.name = errorData.name || 'AppError'
  error.code = errorData.code || 'system:internal-error'
  error.status = response.status || HttpStatus.INTERNAL_SERVER_ERROR

  return error
}

const handleAuthFailure = () => {
  accessTokenStorage.clear()
  window.location.href = '/login'
}

class ApiClient {
  #baseUrl
  #defaultHeaders
  #refreshManager

  constructor() {
    this.#baseUrl = env.BE_BASE_URL
    this.#defaultHeaders = {
      'Content-Type': 'application/json'
    }

    this.#refreshManager = new TokenRefreshManager()
  }

  get(path, options = {}) {
    return this.#doRequest(path, {
      ...options,
      method: 'GET'
    })
  }

  post(path, data, options = {}) {
    return this.#doRequest(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  put(path, data, options = {}) {
    return this.#doRequest(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  delete(path, options = {}) {
    return this.#doRequest(path, {
      ...options,
      method: 'DELETE'
    })
  }

  async #doRequest(path, options = {}, isRetry = false) {
    const url = `${this.#baseUrl}${path}`
    const config = {
      ...options,
      credentials: 'include',
      headers: this.#prepareHeaders(options)
    }

    const response = await fetch(url, config)

    if (response.status === HttpStatus.UNAUTHORIZED) {
      // Don't attempt refresh if we have no access token
      // (means refresh already failed or user never logged in)
      if (isRetry || !accessTokenStorage.get()) {
        handleAuthFailure()
        throw await createError(response)
      }

      return this.#refreshManager.executeWithRefresh(
        () => this.#doRequest(path, options, true),
        handleAuthFailure
      )
    }

    if (!response.ok) {
      throw await createError(response)
    }

    if (response.status === HttpStatus.NO_CONTENT) {
      return null
    }

    return response.json()
  }

  #prepareHeaders(options) {
    const headers = {
      ...this.#defaultHeaders,
      ...options.headers
    }

    const token = accessTokenStorage.get()

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }
}

// Export singleton instance for shared use across the application
export default new ApiClient()
