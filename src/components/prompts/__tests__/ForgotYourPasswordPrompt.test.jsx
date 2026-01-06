import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import { ForgotYourPasswordPrompt } from '..'

describe('ForgotYourPasswordPrompt', () => {
  it('renders forgot password link', () => {
    renderWithProviders(<ForgotYourPasswordPrompt />)

    expect(
      screen.getByRole('link', { name: en.forgotYourPassword })
    ).toHaveAttribute('href', '/reset-password')
  })
})
