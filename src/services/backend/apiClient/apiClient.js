import env from '@/lib/env'
import { HttpStatus } from '@/lib/httpStatus'
import { accessTokenStorage } from '@/lib/storage'

import { createError } from './error'
import TokenRefreshManager from './tokenRefreshManager'

class ApiClient {
  #baseUrl
  #defaultHeaders
  #httpClient
  #timeout
  #tokenRefreshManager = new TokenRefreshManager()

  constructor(config = {}) {
    this.#baseUrl = config.baseUrl || env.BE_BASE_URL
    this.#httpClient = config.httpClient || fetch
    this.#timeout = config.timeout ?? 15_000 // 15 seconds
    this.#defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers
    }
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

  async #doRequest(path, options = {}) {
    const url = `${this.#baseUrl}${path}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.#timeout)

    try {
      const config = {
        ...options,
        credentials: 'include',
        headers: this.#prepareHeaders(options),
        signal: controller.signal
      }

      const response = await this.#httpClient(url, config)

      if (!response.ok) {
        if (response.status === HttpStatus.UNAUTHORIZED) {
          return this.#tokenRefreshManager.executeWithRefresh(
            () => this.#doRequest(path, options),
            () => this.#refreshToken(),
            accessToken => {
              accessTokenStorage.set(accessToken)
            },
            () => {
              accessTokenStorage.remove()

              if (typeof window !== 'undefined') {
                window.location.href = '/login'
              }
            }
          )
        }

        throw await createError(response)
      }

      if (response.status === HttpStatus.NO_CONTENT) {
        return null
      }

      return response.json()
    } finally {
      clearTimeout(timeoutId)
    }
  }

  async #refreshToken() {
    const url = `${this.#baseUrl}/api/v1/auth/refresh-token`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.#timeout)

    try {
      const config = {
        method: 'POST',
        credentials: 'include',
        headers: this.#defaultHeaders,
        signal: controller.signal
      }

      const response = await this.#httpClient(url, config)

      if (!response.ok) {
        throw await createError(response)
      }

      return response.json()
    } finally {
      clearTimeout(timeoutId)
    }
  }

  #prepareHeaders(options) {
    const headers = {
      ...this.#defaultHeaders,
      ...options.headers
    }

    const token = accessTokenStorage.get()

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }
}

export { ApiClient }
