/* eslint-env jest, node */

import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { TextDecoder, TextEncoder } from 'util'

// Ensure text encoding/decoding works in JSDOM.
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Clean up DOM and mocks after each test.
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

// Mock reCAPTCHA hook for all tests.
const mockExecuteReCaptcha = jest.fn()

jest.mock('@/hooks/useReCaptcha', () => ({
  __esModule: true,
  default: () => ({
    executeReCaptcha: mockExecuteReCaptcha,
    isReady: true
  })
}))

// Export mockExecuteReCaptcha for use in tests.
global.mockExecuteReCaptcha = mockExecuteReCaptcha
