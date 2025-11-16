import storage from './inMemoryStorage'

describe('inMemoryStorage', () => {
  beforeEach(() => {
    storage.clearAll()
  })

  describe('get', () => {
    it('should return null when key does not exist', () => {
      expect(storage.get('nonexistent')).toBe(null)
    })

    it('should return custom fallback when key does not exist', () => {
      expect(storage.get('nonexistent', 'default')).toBe('default')
    })

    it('should return stored value for existing key', () => {
      const value = 'test-value'

      storage.set('test-key', value)

      expect(storage.get('test-key')).toBe(value)
    })

    it('should handle multiple keys independently', () => {
      storage.set('key1', 'value1')
      storage.set('key2', 'value2')

      expect(storage.get('key1')).toBe('value1')
      expect(storage.get('key2')).toBe('value2')
    })
  })

  describe('set', () => {
    it('should store value for a key', () => {
      storage.set('test-key', 'test-value')

      expect(storage.get('test-key')).toBe('test-value')
    })

    it('should overwrite existing value', () => {
      storage.set('key', 'old-value')
      storage.set('key', 'new-value')

      expect(storage.get('key')).toBe('new-value')
    })

    it('should handle multiple keys', () => {
      storage.set('key1', 'value1')
      storage.set('key2', 'value2')
      storage.set('key3', 'value3')

      expect(storage.get('key1')).toBe('value1')
      expect(storage.get('key2')).toBe('value2')
      expect(storage.get('key3')).toBe('value3')
    })
  })

  describe('clear', () => {
    it('should remove specific key', () => {
      storage.set('key1', 'value1')
      storage.set('key2', 'value2')

      storage.clear('key1')

      expect(storage.get('key1')).toBe(null)
      expect(storage.get('key2')).toBe('value2')
    })

    it('should work when key does not exist', () => {
      storage.clear('nonexistent')

      expect(storage.get('nonexistent')).toBe(null)
    })
  })

  describe('clearAll', () => {
    it('should remove all keys', () => {
      storage.set('key1', 'value1')
      storage.set('key2', 'value2')
      storage.set('key3', 'value3')

      storage.clearAll()

      expect(storage.get('key1')).toBe(null)
      expect(storage.get('key2')).toBe(null)
      expect(storage.get('key3')).toBe(null)
    })

    it('should work when storage is empty', () => {
      storage.clearAll()

      expect(storage.get('any-key')).toBe(null)
    })
  })
})
