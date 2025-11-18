const storage = {}

export default {
  get(key, fallback = null) {
    return storage[key] !== undefined ? storage[key] : fallback
  },

  set(key, value) {
    storage[key] = value
  },

  remove(key) {
    delete storage[key]
  },

  clear() {
    Object.keys(storage).forEach(key => delete storage[key])
  }
}
