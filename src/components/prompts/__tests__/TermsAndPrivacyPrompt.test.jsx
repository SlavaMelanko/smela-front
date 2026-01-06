import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import { TermsAndPrivacyPrompt } from '..'

describe('TermsAndPrivacyPrompt', () => {
  it('renders terms and privacy links', () => {
    renderWithProviders(<TermsAndPrivacyPrompt />)

    expect(
      screen.getByRole('link', { name: en.termsAndPrivacy.terms })
    ).toHaveAttribute('href', '/terms')

    expect(
      screen.getByRole('link', { name: en.termsAndPrivacy.privacy })
    ).toHaveAttribute('href', '/privacy')
  })
})
