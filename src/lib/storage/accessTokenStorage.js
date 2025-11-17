import inMemoryStorage from './inMemoryStorage'

const ACCESS_TOKEN_KEY = 'access_token'

export default {
  get() {
    const token = inMemoryStorage.get(ACCESS_TOKEN_KEY)

    // eslint-disable-next-line no-console
    console.log(`got ${token}`)

    return token
  },

  set(value) {
    // eslint-disable-next-line no-console
    console.log(`setting ${value}`)

    inMemoryStorage.set(ACCESS_TOKEN_KEY, value)
  },

  clear() {
    // eslint-disable-next-line no-console
    console.log(`clear access token`)

    inMemoryStorage.clear(ACCESS_TOKEN_KEY)
  }
}
