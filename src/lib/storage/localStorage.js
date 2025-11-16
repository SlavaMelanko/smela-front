const storage = {
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

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch {
      // Fail silently (e.g., quota exceeded, private mode)
    }
  }
}

export default storage
