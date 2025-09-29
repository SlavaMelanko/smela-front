import { StatusCodes } from 'http-status-codes'

const API_BASE_URL = import.meta.env.VITE_APP_BE_BASE_URL

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    }
  }

  async #buildError(response) {
    const errorData = await response.json().catch(() => ({}))

    const error = new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    )

    error.name = errorData.name || 'AppError'
    error.code = errorData.code || 'system:internal-error'
    error.status = response.status || StatusCodes.INTERNAL_SERVER_ERROR

    return error
  }

  async #request(path, options = {}) {
    const url = `${this.baseUrl}${path}`

    const config = {
      ...options,
      credentials: 'include',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await this.#buildError(response)

      throw error
    }

    // Handle 204 No Content status - return null instead of trying to parse JSON.
    if (response.status === StatusCodes.NO_CONTENT) {
      return null
    }

    return response.json()
  }

  get(path, options = {}) {
    return this.#request(path, {
      ...options,
      method: 'GET'
    })
  }

  post(path, data, options = {}) {
    return this.#request(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  put(path, data, options = {}) {
    return this.#request(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  delete(path, options = {}) {
    return this.#request(path, {
      ...options,
      method: 'DELETE'
    })
  }
}

export default new ApiClient()
