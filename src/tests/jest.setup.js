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

// Mock InvisibleReCaptcha2 component for all tests.
const mockExecuteReCaptcha = jest.fn()
const mockResetReCaptcha = jest.fn()

jest.mock('@/components/InvisibleReCaptcha2', () => {
  const { forwardRef, useImperativeHandle } = jest.requireActual('react')

  return {
    __esModule: true,
    default: forwardRef((_, ref) => {
      useImperativeHandle(ref, () => ({
        executeAsync: mockExecuteReCaptcha,
        reset: mockResetReCaptcha
      }))

      return null // invisible component for tests.
    })
  }
})

// Export mock functions for use in tests.
global.mockExecuteReCaptcha = mockExecuteReCaptcha
global.mockResetReCaptcha = mockResetReCaptcha

// Helper to simulate reCAPTCHA timeout in tests
global.simulateReCaptchaTimeout = () => {
  mockExecuteReCaptcha.mockImplementation(
    () =>
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('reCAPTCHA timeout')), 100)
      })
  )
}

// Helper to simulate successful reCAPTCHA execution
global.simulateReCaptchaSuccess = (token = 'mock-captcha-token') => {
  mockExecuteReCaptcha.mockResolvedValue(token)
}

// Helper to simulate reCAPTCHA failure
global.simulateReCaptchaFailure = (error = new Error('reCAPTCHA failed')) => {
  mockExecuteReCaptcha.mockRejectedValue(error)
}
