/* eslint-env jest, node */

import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { TextDecoder, TextEncoder } from 'util'

// Ensure text encoding/decoding works in JSDOM
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Clean up DOM and mocks after each test
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

jest.mock('@/components/Captcha', () => ({
  __esModule: true,
  default: ({ setToken }) => {
    const {
      auth: { captcha }
    } = jest.requireActual('@/tests/data')

    return (
      <button data-testid={captcha.id} onClick={() => setToken(captcha.value)}>
        {captcha.label}
      </button>
    )
  }
}))
