import {
  createNetworkMonitor,
  getNetworkErrorType,
  isNetworkError,
  isOnline,
  NetworkErrorType
} from './network-monitor.js'

describe('network-monitor', () => {
  beforeEach(() => {
    // Reset navigator.onLine before each test
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true
    })
  })

  describe('isNetworkError', () => {
    it('should return false for null or undefined error', () => {
      expect(isNetworkError(null)).toBe(false)
      expect(isNetworkError(undefined)).toBe(false)
    })

    it('should return true when browser is offline', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      })

      expect(isNetworkError({})).toBe(true)
    })

    it('should detect Chrome network errors in message', () => {
      const error = { message: 'ERR_CONNECTION_REFUSED' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect Firefox network errors in message', () => {
      const error = { message: 'NS_ERROR_CONNECTION_REFUSED' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect Safari network errors in message', () => {
      const error = { message: 'NSURLErrorDomain' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect generic network errors in message', () => {
      const error = { message: 'Failed to fetch' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should be case insensitive for message detection', () => {
      const error = { message: 'network request failed' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect network errors in error code', () => {
      const error = { code: 'ERR_CONNECTION_REFUSED' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should handle lowercase error codes', () => {
      const error = { code: 'econnrefused' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect NetworkError by name', () => {
      const error = { name: 'NetworkError' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect TypeError by name', () => {
      const error = { name: 'TypeError' }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect network error status codes', () => {
      expect(isNetworkError({ status: 0 })).toBe(true)
      expect(isNetworkError({ status: 502 })).toBe(true)
      expect(isNetworkError({ status: 503 })).toBe(true)
      expect(isNetworkError({ status: 504 })).toBe(true)
    })

    it('should detect network errors in response status', () => {
      const error = { response: { status: 502 } }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect axios network errors', () => {
      const error = {
        isAxiosError: true,
        code: 'ECONNABORTED'
      }

      expect(isNetworkError(error)).toBe(true)
    })

    it('should detect fetch TypeError', () => {
      const error = new TypeError('Failed to fetch')

      expect(isNetworkError(error)).toBe(true)
    })

    it('should return false for non-network errors', () => {
      const error = { message: 'Validation error', status: 400 }

      expect(isNetworkError(error)).toBe(false)
    })

    it('should return false for server errors that are not network related', () => {
      const error = { status: 500 }

      expect(isNetworkError(error)).toBe(false)
    })
  })

  describe('getNetworkErrorType', () => {
    it('should return OFFLINE when navigator is offline', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      })

      expect(getNetworkErrorType({})).toBe(NetworkErrorType.OFFLINE)
    })

    it('should return UNKNOWN for null error', () => {
      expect(getNetworkErrorType(null)).toBe(NetworkErrorType.UNKNOWN)
    })

    it('should detect CONNECTION_REFUSED errors', () => {
      expect(getNetworkErrorType({ message: 'ERR_CONNECTION_REFUSED' })).toBe(
        NetworkErrorType.CONNECTION_REFUSED
      )

      expect(getNetworkErrorType({ code: 'ECONNREFUSED' })).toBe(
        NetworkErrorType.CONNECTION_REFUSED
      )
    })

    it('should detect TIMEOUT errors', () => {
      expect(getNetworkErrorType({ message: 'ERR_CONNECTION_TIMED_OUT' })).toBe(
        NetworkErrorType.TIMEOUT
      )

      expect(getNetworkErrorType({ code: 'ETIMEDOUT' })).toBe(
        NetworkErrorType.TIMEOUT
      )

      expect(getNetworkErrorType({ message: 'Request timeout' })).toBe(
        NetworkErrorType.TIMEOUT
      )
    })

    it('should detect CONNECTION_INTERRUPTED errors', () => {
      expect(
        getNetworkErrorType({ message: 'ERR_INTERNET_DISCONNECTED' })
      ).toBe(NetworkErrorType.CONNECTION_INTERRUPTED)

      expect(getNetworkErrorType({ message: 'ERR_NETWORK_CHANGED' })).toBe(
        NetworkErrorType.CONNECTION_INTERRUPTED
      )
    })

    it('should detect NAME_NOT_RESOLVED errors', () => {
      expect(getNetworkErrorType({ message: 'ERR_NAME_NOT_RESOLVED' })).toBe(
        NetworkErrorType.NAME_NOT_RESOLVED
      )

      expect(getNetworkErrorType({ code: 'ENOTFOUND' })).toBe(
        NetworkErrorType.NAME_NOT_RESOLVED
      )
    })

    it('should detect SSL_ERROR', () => {
      expect(getNetworkErrorType({ message: 'ERR_SSL_PROTOCOL_ERROR' })).toBe(
        NetworkErrorType.SSL_ERROR
      )

      expect(getNetworkErrorType({ message: 'ERR_CERT_DATE_INVALID' })).toBe(
        NetworkErrorType.SSL_ERROR
      )
    })

    it('should detect SERVER_UNAVAILABLE by status code', () => {
      expect(getNetworkErrorType({ status: 502 })).toBe(
        NetworkErrorType.SERVER_UNAVAILABLE
      )

      expect(getNetworkErrorType({ status: 503 })).toBe(
        NetworkErrorType.SERVER_UNAVAILABLE
      )

      expect(getNetworkErrorType({ status: 504 })).toBe(
        NetworkErrorType.SERVER_UNAVAILABLE
      )
    })

    it('should detect SERVER_UNAVAILABLE by message', () => {
      expect(getNetworkErrorType({ message: 'Failed to fetch' })).toBe(
        NetworkErrorType.SERVER_UNAVAILABLE
      )

      expect(getNetworkErrorType({ message: 'NetworkError' })).toBe(
        NetworkErrorType.SERVER_UNAVAILABLE
      )

      expect(getNetworkErrorType({ message: 'Network request failed' })).toBe(
        NetworkErrorType.SERVER_UNAVAILABLE
      )
    })

    it('should return UNKNOWN for unrecognized errors', () => {
      expect(getNetworkErrorType({ message: 'Some other error' })).toBe(
        NetworkErrorType.UNKNOWN
      )
    })
  })

  describe('createNetworkMonitor', () => {
    let mockCallback

    beforeEach(() => {
      mockCallback = jest.fn()
    })

    afterEach(() => {
      // Clean up any event listeners
      window.removeEventListener('online', mockCallback)
      window.removeEventListener('offline', mockCallback)
    })

    it('should add event listeners for online/offline events', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener')

      createNetworkMonitor(mockCallback)

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'online',
        expect.any(Function)
      )

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'offline',
        expect.any(Function)
      )

      addEventListenerSpy.mockRestore()
    })

    it('should call callback with true on online event', () => {
      createNetworkMonitor(mockCallback)

      window.dispatchEvent(new Event('online'))

      expect(mockCallback).toHaveBeenCalledWith(true)
    })

    it('should call callback with false on offline event', () => {
      createNetworkMonitor(mockCallback)

      window.dispatchEvent(new Event('offline'))

      expect(mockCallback).toHaveBeenCalledWith(false)
    })

    it('should return cleanup function that removes event listeners', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

      const cleanup = createNetworkMonitor(mockCallback)

      cleanup()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'online',
        expect.any(Function)
      )

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'offline',
        expect.any(Function)
      )

      removeEventListenerSpy.mockRestore()
    })
  })

  describe('isOnline', () => {
    it('should return navigator.onLine value when available', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true
      })

      expect(isOnline()).toBe(true)

      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      })

      expect(isOnline()).toBe(false)
    })

    it('should return true when navigator is not available', () => {
      const originalNavigator = global.navigator

      delete global.navigator

      expect(isOnline()).toBe(true)

      global.navigator = originalNavigator
    })
  })
})
