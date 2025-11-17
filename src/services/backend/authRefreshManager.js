import authService from '@/services/backend/auth'

class PendingRequestQueue {
  #queue = []

  enqueue(callback) {
    this.#queue.push(callback)
  }

  process() {
    this.#queue.forEach(callback => callback())
    this.#queue = []
  }

  clear() {
    this.#queue = []
  }
}

export default class TokenRefreshManager {
  #isRefreshing = false
  #pendingRequests = new PendingRequestQueue()

  async executeWithRefresh(requestFn, onAuthFailure) {
    const promise = new Promise((resolve, reject) => {
      this.#pendingRequests.enqueue(() => {
        requestFn().then(resolve).catch(reject)
      })
    })

    if (!this.#isRefreshing) {
      this.#performRefresh(onAuthFailure)
    }

    return promise
  }

  async #performRefresh(onAuthFailure) {
    this.#isRefreshing = true

    try {
      await authService.refreshToken()
      this.#pendingRequests.process()
    } catch {
      this.#pendingRequests.clear()
      onAuthFailure()
    } finally {
      this.#isRefreshing = false
    }
  }
}
