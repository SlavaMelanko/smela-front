import env from '@/lib/env'
import { HttpStatus } from '@/lib/httpStatus'

import { createError } from './error'

class ApiClient {
  #baseUrl
  #defaultHeaders
  #httpClient
  #timeout

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

  #prepareHeaders(options) {
    return {
      ...this.#defaultHeaders,
      ...options.headers
    }
  }
}

export { ApiClient }
