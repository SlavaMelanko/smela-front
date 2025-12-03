/* eslint-env jest, node */

import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { TextDecoder, TextEncoder } from 'util'

// Ensure text encoding/decoding works in JSDOM
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock fetch globally for all tests
global.fetch = jest.fn()

// Mock env for all tests (individual tests can override with jest.doMock)
jest.mock('@/lib/env', () => ({
  default: {
    MODE: 'test',
    CAPTCHA_SITE_KEY: 'test-captcha-key',
    BE_BASE_URL: 'https://api.test.com',
    SENTRY_DSN: undefined
  }
}))

// Mock InvisibleReCaptcha2 component for all tests
const mockExecuteReCaptcha = jest.fn()
const mockResetReCaptcha = jest.fn()

global.mockExecuteReCaptcha = mockExecuteReCaptcha
global.mockResetReCaptcha = mockResetReCaptcha

jest.mock('@/components/InvisibleReCaptcha2', () => {
  const { forwardRef, useImperativeHandle } = jest.requireActual('react')

  return {
    __esModule: true,
    default: forwardRef((_, ref) => {
      useImperativeHandle(ref, () => ({
        executeAsync: mockExecuteReCaptcha,
        reset: mockResetReCaptcha
      }))

      return null // invisible component for tests
    })
  }
})

// Mock react-router-dom navigation for all tests
const mockNavigate = jest.fn()

global.mockNavigate = mockNavigate

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

// Mock Sentry for all tests
jest.mock('@/services/errorTracker', () => ({
  clearUser: jest.fn(),
  setUser: jest.fn(),
  initErrorTracker: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn()
}))

// Clean up DOM and mocks after all tests
afterAll(() => {
  cleanup()
  jest.restoreAllMocks()
})
