import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import { SignupPrompt } from '..'

describe('SignupPrompt', () => {
  it('renders signup link', () => {
    renderWithProviders(<SignupPrompt />)

    expect(screen.getByText(en.doNotHaveAccount)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: en.signUp })).toHaveAttribute(
      'href',
      '/pricing'
    )
  })
})
