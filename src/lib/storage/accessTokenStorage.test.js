import storage from './accessTokenStorage'
import inMemoryStorage from './inMemoryStorage'

describe('accessTokenStorage', () => {
  beforeEach(() => {
    inMemoryStorage.clearAll()
  })

  describe('get', () => {
    it('should return null when no token is set', () => {
      expect(storage.get()).toBe(null)
    })

    it('should return the stored token', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

      storage.set(token)

      expect(storage.get()).toBe(token)
    })
  })

  describe('set', () => {
    it('should store the access token', () => {
      const token = 'test-access-token'

      storage.set(token)

      expect(storage.get()).toBe(token)
    })

    it('should overwrite existing token', () => {
      storage.set('old-token')
      storage.set('new-token')

      expect(storage.get()).toBe('new-token')
    })
  })

  describe('clear', () => {
    it('should clear the stored token', () => {
      storage.set('test-token')
      storage.clear()

      expect(storage.get()).toBe(null)
    })

    it('should work when no token is set', () => {
      storage.clear()

      expect(storage.get()).toBe(null)
    })
  })

  describe('isolation', () => {
    it('should not affect other keys in inMemoryStorage', () => {
      inMemoryStorage.set('other-key', 'other-value')
      storage.set('token-value')

      expect(storage.get()).toBe('token-value')
      expect(inMemoryStorage.get('other-key')).toBe('other-value')
    })

    it('should only clear access token, not other keys', () => {
      inMemoryStorage.set('other-key', 'other-value')
      storage.set('token-value')

      storage.clear()

      expect(storage.get()).toBe(null)
      expect(inMemoryStorage.get('other-key')).toBe('other-value')
    })
  })
})
