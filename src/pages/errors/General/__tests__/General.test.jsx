import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import GeneralErrorPage from '../index'

describe('GeneralErrorPage', () => {
  beforeEach(() => {
    global.mockNavigate.mockClear()
  })

  it('renders with correct structure and classes', () => {
    const { container } = renderWithProviders(<GeneralErrorPage />)

    expect(container.querySelector('.general-error-page')).toBeInTheDocument()
    expect(
      container.querySelector('.general-error-page__icon')
    ).toBeInTheDocument()

    expect(
      container.querySelector('.general-error-page__title')
    ).toBeInTheDocument()

    expect(
      container.querySelector('.general-error-page__description')
    ).toBeInTheDocument()
  })

  it('displays all content correctly', () => {
    const { container } = renderWithProviders(<GeneralErrorPage />)

    // Icon
    const icon = container.querySelector('.general-error-page__icon')

    expect(icon).toBeVisible()
    expect(icon).toHaveClass('warning-icon')

    // Translations
    expect(screen.getByText(en.error.general.title)).toBeInTheDocument()
    expect(screen.getByText(en.error.general.message)).toBeInTheDocument()

    // Button
    expect(
      screen.getByRole('button', { name: en.error.general.cta })
    ).toBeVisible()
  })

  it('navigates to home when "Go home" button is clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(<GeneralErrorPage />)

    const button = screen.getByRole('button', { name: en.error.general.cta })

    await user.click(button)

    expect(global.mockNavigate).toHaveBeenCalledWith('/')
    expect(global.mockNavigate).toHaveBeenCalledTimes(1)
  })
})
