import inMemoryStorage from './inMemoryStorage'

const ACCESS_TOKEN_KEY = 'access_token'

export default {
  get() {
    return inMemoryStorage.get(ACCESS_TOKEN_KEY)
  },

  set(value) {
    inMemoryStorage.set(ACCESS_TOKEN_KEY, value)
  },

  clear() {
    inMemoryStorage.clear(ACCESS_TOKEN_KEY)
  }
}
