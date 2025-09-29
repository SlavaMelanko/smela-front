/* eslint-env jest, node */

import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { TextDecoder, TextEncoder } from 'util'

// Ensure text encoding/decoding works in JSDOM
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock fetch globally for all tests
global.fetch = jest.fn()

// Clean up DOM and mocks after each test
afterEach(() => {
  cleanup()
  jest.restoreAllMocks() // calls clearAllMocks() internally
})

// Mock InvisibleReCaptcha2 component for all tests
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

      return null // invisible component for tests
    })
  }
})

// Export mock functions for use in tests
global.mockExecuteReCaptcha = mockExecuteReCaptcha
global.mockResetReCaptcha = mockResetReCaptcha
