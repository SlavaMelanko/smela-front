import storage from './localStorage'

describe('storage', () => {
  let mockLocalStorage

  beforeEach(() => {
    mockLocalStorage = {
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

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage
    })

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

  describe('clear', () => {
    it('should remove value from localStorage', () => {
      localStorage.setItem('test-key', 'test-value')

      storage.clear('test-key')

      expect(localStorage.getItem('test-key')).toBe(null)
    })

    it('should handle localStorage errors silently', () => {
      const originalRemoveItem = localStorage.removeItem

      localStorage.removeItem = jest.fn(() => {
        throw new Error('localStorage error')
      })

      expect(() => storage.clear('test-key')).not.toThrow()

      localStorage.removeItem = originalRemoveItem
    })
  })

  describe('clear', () => {
    it('should clear all values from localStorage', () => {
      localStorage.setItem('key1', 'value1')
      localStorage.setItem('key2', 'value2')
      localStorage.setItem('key3', 'value3')

      storage.clear()

      expect(localStorage.getItem('key1')).toBe(null)
      expect(localStorage.getItem('key2')).toBe(null)
      expect(localStorage.getItem('key3')).toBe(null)
    })

    it('should handle localStorage errors silently', () => {
      const originalClear = localStorage.clear

      localStorage.clear = jest.fn(() => {
        throw new Error('localStorage error')
      })

      expect(() => storage.clear()).not.toThrow()

      localStorage.clear = originalClear
    })
  })
})
