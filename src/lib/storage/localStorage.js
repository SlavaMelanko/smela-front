export default {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key)

      return value !== null ? value : fallback
    } catch {
      return fallback
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Fail silently (e.g., quota exceeded, private mode)
    }
  },

  clear(key) {
    try {
      localStorage.removeItem(key)
    } catch {
      // Fail silently (e.g., quota exceeded, private mode)
    }
  },

  clearAll() {
    try {
      localStorage.clear()
    } catch {
      // Fail silently (e.g., quota exceeded, private mode)
    }
  }
}
