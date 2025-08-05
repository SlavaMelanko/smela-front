const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL

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
    error.code = errorData.code || 'unknown'

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
