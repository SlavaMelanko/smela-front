import { StatusCodes } from 'http-status-codes'

describe('ApiClient', () => {
  let apiClient

  beforeAll(async () => {
    jest.doMock('@/lib/env', () => ({
      default: {
        BE_BASE_URL: 'https://api.test.com'
      }
    }))

    // Import apiClient after mocking env
    apiClient = (await import('./api')).default
  })

  afterAll(() => {
    jest.unmock('@/lib/env')
  })

  beforeEach(() => {
    fetch.mockClear()
  })

  describe('GET requests', () => {
    it('should make a successful GET request', async () => {
      const mockData = { id: 1, name: 'Test' }

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockData)
      })

      const result = await apiClient.get('/test')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )

      expect(result).toEqual(mockData)
    })

    it('should handle 204 No Content response', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        status: StatusCodes.NO_CONTENT
      })

      const result = await apiClient.get('/test')

      expect(result).toBeNull()
    })
  })

  describe('POST requests', () => {
    it('should make a successful POST request with data', async () => {
      const mockData = { id: 1, name: 'Created' }
      const requestData = { name: 'Test' }

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: jest.fn().mockResolvedValueOnce(mockData)
      })

      const result = await apiClient.post('/test', requestData)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestData),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )

      expect(result).toEqual(mockData)
    })
  })

  describe('PUT requests', () => {
    it('should make a successful PUT request', async () => {
      const mockData = { id: 1, name: 'Updated' }
      const requestData = { name: 'Updated Test' }

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockData)
      })

      const result = await apiClient.put('/test/1', requestData)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestData)
        })
      )

      expect(result).toEqual(mockData)
    })
  })

  describe('DELETE requests', () => {
    it('should make a successful DELETE request', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        status: StatusCodes.NO_CONTENT
      })

      const result = await apiClient.delete('/test/1')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'DELETE'
        })
      )

      expect(result).toBeNull()
    })
  })

  describe('Error handling', () => {
    it('should throw error for failed requests', async () => {
      const errorResponse = {
        error: 'Not found',
        name: 'NotFoundError',
        code: 'resource:not-found'
      }

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValueOnce(errorResponse)
      })

      await expect(apiClient.get('/test')).rejects.toThrow('Not found')
    })

    it('should handle error response without JSON body', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
      })

      await expect(apiClient.get('/test')).rejects.toThrow(
        'HTTP error! status: 500'
      )
    })

    it('should create proper error object with all properties', async () => {
      const errorResponse = {
        error: 'Validation failed',
        name: 'ValidationError',
        code: 'validation:invalid-input'
      }

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValueOnce(errorResponse)
      })

      try {
        await apiClient.get('/test')
      } catch (error) {
        expect(error.message).toBe('Validation failed')
        expect(error.name).toBe('ValidationError')
        expect(error.code).toBe('validation:invalid-input')
        expect(error.status).toBe(400)
      }
    })
  })

  describe('Headers and configuration', () => {
    it('should include custom headers', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({})
      })

      await apiClient.get('/test', {
        headers: {
          Authorization: 'Bearer token123'
        }
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token123'
          }
        })
      )
    })

    it('should always include credentials', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({})
      })

      await apiClient.get('/test')

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include'
        })
      )
    })
  })
})
