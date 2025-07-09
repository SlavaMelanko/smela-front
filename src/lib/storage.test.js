import storage from './storage'

// Mock localStorage
const mockLocalStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null
  },
  setItem(key, value) {
    this.data[key] = value
  },
  removeItem(key) {
    delete this.data[key]
  },
  clear() {
    this.data = {}
  }
}

// Setup mock
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('storage', () => {
  beforeEach(() => {
    mockLocalStorage.clear()
  })

  describe('get', () => {
    it('should return value from localStorage', () => {
      localStorage.setItem('test-key', 'test-value')

      expect(storage.get('test-key')).toBe('test-value')
    })

    it('should return null fallback for non-existent key', () => {
      expect(storage.get('non-existent-key')).toBe(null)
    })

    it('should return custom fallback for non-existent key', () => {
      expect(storage.get('non-existent-key', 'default')).toBe('default')
    })

    it('should return custom fallback when localStorage throws error', () => {
      const originalGetItem = localStorage.getItem

      localStorage.getItem = jest.fn(() => {
        throw new Error('localStorage error')
      })

      expect(storage.get('test-key', 'fallback')).toBe('fallback')

      localStorage.getItem = originalGetItem
    })
  })

  describe('set', () => {
    it('should store value in localStorage', () => {
      storage.set('test-key', 'test-value')

      expect(localStorage.getItem('test-key')).toBe('test-value')
    })

    it('should handle localStorage errors silently', () => {
      const originalSetItem = localStorage.setItem

      localStorage.setItem = jest.fn(() => {
        throw new Error('Quota exceeded')
      })

      expect(() => storage.set('test-key', 'test-value')).not.toThrow()

      localStorage.setItem = originalSetItem
    })
  })

  describe('remove', () => {
    it('should remove value from localStorage', () => {
      localStorage.setItem('test-key', 'test-value')

      storage.remove('test-key')

      expect(localStorage.getItem('test-key')).toBe(null)
    })

    it('should handle localStorage errors silently', () => {
      const originalRemoveItem = localStorage.removeItem

      localStorage.removeItem = jest.fn(() => {
        throw new Error('localStorage error')
      })

      expect(() => storage.remove('test-key')).not.toThrow()

      localStorage.removeItem = originalRemoveItem
    })
  })
})
