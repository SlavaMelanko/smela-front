const storage = {}

export default {
  get(key, fallback = null) {
    return storage[key] !== undefined ? storage[key] : fallback
  },

  set(key, value) {
    storage[key] = value
  },

  clear(key) {
    delete storage[key]
  },

  clearAll() {
    Object.keys(storage).forEach(key => delete storage[key])
  }
}
