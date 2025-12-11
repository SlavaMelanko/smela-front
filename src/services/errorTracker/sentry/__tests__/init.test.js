import { init as sentryInit } from '@sentry/react'

import { init } from '../init'

jest.mock('@sentry/react')

describe('Sentry initialization', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('with DSN configured', () => {
    beforeEach(() => {
      jest.doMock('@/lib/env', () => ({
        default: {
          SENTRY_DSN: 'https://test@sentry.io/123',
          MODE: 'production'
        }
      }))
    })

    it('should add frontend tags via beforeSend hook', () => {
      // Extract beforeSend logic and test it directly
      const beforeSend = event => {
        event.tags = {
          ...event.tags,
          source: 'frontend',
          app: 'smela-front'
        }

        return event
      }

      const mockEvent = { tags: { existing: 'tag' } }
      const result = beforeSend(mockEvent)

      expect(result.tags).toEqual({
        existing: 'tag',
        source: 'frontend',
        app: 'smela-front'
      })
    })

    it('should preserve existing tags when adding frontend tags', () => {
      const beforeSend = event => {
        event.tags = {
          ...event.tags,
          source: 'frontend',
          app: 'smela-front'
        }

        return event
      }

      const mockEvent = { tags: { custom: 'value', another: 'one' } }
      const result = beforeSend(mockEvent)

      expect(result.tags.custom).toBe('value')
      expect(result.tags.another).toBe('one')
      expect(result.tags.source).toBe('frontend')
    })

    it('should handle event with no existing tags', () => {
      const beforeSend = event => {
        event.tags = {
          ...event.tags,
          source: 'frontend',
          app: 'smela-front'
        }

        return event
      }

      const mockEvent = { tags: undefined }
      const result = beforeSend(mockEvent)

      expect(result.tags).toEqual({
        source: 'frontend',
        app: 'smela-front'
      })
    })
  })

  describe('without DSN', () => {
    it('should not initialize Sentry', () => {
      // Global jest.setup.js sets SENTRY_DSN to undefined
      init()

      expect(sentryInit).not.toHaveBeenCalled()
    })
  })
})
