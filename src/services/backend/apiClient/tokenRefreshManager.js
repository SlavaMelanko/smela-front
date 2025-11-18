class PendingRequestQueue {
  #queue = []

  enqueue(callback) {
    this.#queue.push(callback)
  }

  resolve() {
    this.#queue.forEach(callback => callback())
    this.#queue = []
  }

  reject(error) {
    this.#queue.forEach(callback => callback(error))
    this.#queue = []
  }
}

export default class TokenRefreshManager {
  #isRefreshing = false
  #pendingRequests = new PendingRequestQueue()

  async executeWithRefresh(requestFn, refreshFn, onSuccess, onFailure) {
    const promise = new Promise((resolve, reject) => {
      this.#pendingRequests.enqueue(error => {
        if (error) {
          reject(error)
        } else {
          requestFn().then(resolve).catch(reject)
        }
      })
    })

    if (!this.#isRefreshing) {
      this.#performRefresh(refreshFn, onSuccess, onFailure)
    }

    return promise
  }

  async #performRefresh(refreshFn, onSuccess, onFailure) {
    this.#isRefreshing = true

    try {
      const { accessToken } = await refreshFn()

      if (!accessToken) {
        throw new Error('No access token')
      }

      this.#pendingRequests.resolve()

      if (onSuccess) {
        onSuccess(accessToken)
      }
    } catch (error) {
      this.#pendingRequests.reject(error)

      if (onFailure) {
        onFailure()
      }
    } finally {
      this.#isRefreshing = false
    }
  }
}
