import localStorage from './localStorage'

const ACCESS_TOKEN_KEY = 'access_token'

export default {
  get() {
    const token = localStorage.get(ACCESS_TOKEN_KEY)

    return token
  },

  set(value) {
    localStorage.set(ACCESS_TOKEN_KEY, value)
  },

  remove() {
    localStorage.remove(ACCESS_TOKEN_KEY)
  }
}
