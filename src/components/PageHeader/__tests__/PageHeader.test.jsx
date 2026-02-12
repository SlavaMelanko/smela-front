import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/tests'

import { SettingsPageHeader } from '../SettingsPageHeader'
import { TeamPageHeader } from '../TeamPageHeader'

describe('PageHeader', () => {
  it('TeamPageHeader renders name and website link', () => {
    renderWithProviders(
      <TeamPageHeader name='Acme Corp' website='https://acme.com' />
    )

    expect(screen.getByText('Acme Corp')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: /https:\/\/acme\.com/ })

    expect(link).toHaveAttribute('href', 'https://acme.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('SettingsPageHeader renders title and description', () => {
    renderWithProviders(
      <SettingsPageHeader title='Settings' description='Your preferences' />
    )

    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Your preferences')).toBeInTheDocument()
  })
})
