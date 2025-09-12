import { withTimeout } from './async'

describe('withTimeout', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('successful execution', () => {
    it('should return result when async function completes within timeout', async () => {
      const mockResult = 'success'
      const mockAsyncFn = jest.fn().mockResolvedValue(mockResult)

      const resultPromise = withTimeout(mockAsyncFn, 5000)

      // Fast-forward a small amount of time
      jest.advanceTimersByTime(100)

      const result = await resultPromise

      expect(result).toBe(mockResult)
      expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    })

    it('should use default timeout of 10 seconds when not specified', async () => {
      const mockResult = 'success'
      const mockAsyncFn = jest.fn().mockResolvedValue(mockResult)

      const resultPromise = withTimeout(mockAsyncFn)

      // Fast-forward 9 seconds (should still work)
      jest.advanceTimersByTime(9000)

      const result = await resultPromise

      expect(result).toBe(mockResult)
    })

    it('should handle functions that return promises', async () => {
      const mockResult = { data: 'test' }
      const mockAsyncFn = jest.fn(() => Promise.resolve(mockResult))

      const result = await withTimeout(mockAsyncFn, 1000)

      expect(result).toEqual(mockResult)
      expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('timeout behavior', () => {
    it('should timeout and reject with timeout error after specified time', async () => {
      // Create a function that never resolves
      const mockAsyncFn = jest.fn(() => new Promise(() => {}))

      const resultPromise = withTimeout(mockAsyncFn, 1000)

      // Fast-forward past the timeout
      jest.advanceTimersByTime(1000)

      await expect(resultPromise).rejects.toThrow('Timeout.')
      expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    })

    it('should timeout with default 10 seconds', async () => {
      const mockAsyncFn = jest.fn(() => new Promise(() => {}))

      const resultPromise = withTimeout(mockAsyncFn)

      // Fast-forward to the full timeout
      jest.advanceTimersByTime(10000)

      await expect(resultPromise).rejects.toThrow('Timeout.')
      expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    })

    it('should clean up timeout when operation completes successfully', async () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
      const mockAsyncFn = jest.fn().mockResolvedValue('success')

      await withTimeout(mockAsyncFn, 1000)

      expect(clearTimeoutSpy).toHaveBeenCalled()
      clearTimeoutSpy.mockRestore()
    })

    it('should clean up timeout when operation times out', async () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
      const mockAsyncFn = jest.fn(() => new Promise(() => {}))

      const resultPromise = withTimeout(mockAsyncFn, 100)

      jest.advanceTimersByTime(100)

      await expect(resultPromise).rejects.toThrow('Timeout.')
      expect(clearTimeoutSpy).toHaveBeenCalled()
      clearTimeoutSpy.mockRestore()
    })
  })

  describe('error handling', () => {
    it('should propagate errors from the async function', async () => {
      const mockError = new Error('Function failed')
      const mockAsyncFn = jest.fn().mockRejectedValue(mockError)

      await expect(withTimeout(mockAsyncFn, 1000)).rejects.toThrow(
        'Function failed'
      )
      expect(mockAsyncFn).toHaveBeenCalledTimes(1)
    })

    it('should clean up timeout when async function throws error', async () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
      const mockError = new Error('Function failed')
      const mockAsyncFn = jest.fn().mockRejectedValue(mockError)

      await expect(withTimeout(mockAsyncFn, 1000)).rejects.toThrow(
        'Function failed'
      )
      expect(clearTimeoutSpy).toHaveBeenCalled()
      clearTimeoutSpy.mockRestore()
    })

    it('should distinguish between timeout errors and function errors', async () => {
      // Test timeout error
      const hangingFn = jest.fn(() => new Promise(() => {}))
      const timeoutPromise = withTimeout(hangingFn, 100)

      jest.advanceTimersByTime(100)

      await expect(timeoutPromise).rejects.toThrow('Timeout.')

      // Test function error
      const failingFn = jest.fn().mockRejectedValue(new Error('Custom error'))

      await expect(withTimeout(failingFn, 1000)).rejects.toThrow('Custom error')
    })
  })

  describe('edge cases', () => {
    it('should handle zero timeout', async () => {
      const mockAsyncFn = jest.fn(() => new Promise(() => {}))

      const resultPromise = withTimeout(mockAsyncFn, 0)

      jest.advanceTimersByTime(0)

      await expect(resultPromise).rejects.toThrow('Timeout.')
    })

    it('should handle very large timeout values', async () => {
      const mockResult = 'success'
      const mockAsyncFn = jest.fn().mockResolvedValue(mockResult)

      const result = await withTimeout(mockAsyncFn, 999999999)

      expect(result).toBe(mockResult)
    })

    it('should handle functions that return non-promise values', async () => {
      // This tests that the function properly handles sync functions
      const mockResult = 'immediate result'
      const mockSyncFn = jest.fn(() => mockResult)

      const result = await withTimeout(mockSyncFn, 1000)

      expect(result).toBe(mockResult)
    })

    it('should handle functions that throw synchronously', async () => {
      const mockError = new Error('Sync error')
      const mockSyncFn = jest.fn(() => {
        throw mockError
      })

      await expect(withTimeout(mockSyncFn, 1000)).rejects.toThrow('Sync error')
    })
  })

  describe('real-world scenarios', () => {
    it('should work with fetch-like operations', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: 'test' })
      }
      const mockFetch = jest.fn().mockResolvedValue(mockResponse)

      const result = await withTimeout(() => mockFetch('/api/test'), 5000)

      expect(result).toBe(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith('/api/test')
    })

    it('should work with file upload scenarios', async () => {
      const mockUploadResult = { uploaded: true, id: '123' }
      const mockUpload = jest.fn().mockResolvedValue(mockUploadResult)
      const mockFile = { name: 'test.jpg' }

      const result = await withTimeout(() => mockUpload(mockFile), 30000)

      expect(result).toBe(mockUploadResult)
      expect(mockUpload).toHaveBeenCalledWith(mockFile)
    })

    it('should handle multiple concurrent withTimeout calls', async () => {
      const mockFn1 = jest.fn().mockResolvedValue('result1')
      const mockFn2 = jest.fn().mockResolvedValue('result2')
      const mockFn3 = jest.fn(() => new Promise(() => {})) // hangs

      const promises = [
        withTimeout(mockFn1, 1000),
        withTimeout(mockFn2, 2000),
        withTimeout(mockFn3, 500)
      ]

      // Fast-forward to trigger timeout for fn3
      jest.advanceTimersByTime(500)

      const results = await Promise.allSettled(promises)

      expect(results[0].status).toBe('fulfilled')
      expect(results[0].value).toBe('result1')
      expect(results[1].status).toBe('fulfilled')
      expect(results[1].value).toBe('result2')
      expect(results[2].status).toBe('rejected')
      expect(results[2].reason.message).toBe('Timeout.')
    })
  })
})
