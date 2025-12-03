import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { captureMessage } from '@/services/errorTracker'
import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import NotFoundErrorPage from '../index'

jest.mock('@/services/errorTracker', () => ({
  captureMessage: jest.fn()
}))

describe('NotFoundErrorPage', () => {
  beforeEach(() => {
    global.mockNavigate.mockClear()
    captureMessage.mockClear()
  })

  it('renders with correct structure and classes', () => {
    const { container } = renderWithProviders(<NotFoundErrorPage />)

    expect(container.querySelector('.not-found-error-page')).toBeInTheDocument()

    expect(
      container.querySelector('.not-found-error-page__icon')
    ).toBeInTheDocument()

    expect(
      container.querySelector('.not-found-error-page__title')
    ).toBeInTheDocument()

    expect(
      container.querySelector('.not-found-error-page__description')
    ).toBeInTheDocument()
  })

  it('displays all content correctly', () => {
    const { container } = renderWithProviders(<NotFoundErrorPage />)

    // Icon
    const icon = container.querySelector('.not-found-error-page__icon')

    expect(icon).toBeVisible()
    expect(icon).toHaveClass('search-x-icon')

    // Translations
    expect(screen.getByText(en.error.notFound.title)).toBeInTheDocument()
    expect(screen.getByText(en.error.notFound.message)).toBeInTheDocument()

    // Button
    expect(
      screen.getByRole('button', { name: en.error.notFound.cta })
    ).toBeVisible()
  })

  it('navigates to home when "Go home" button is clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(<NotFoundErrorPage />)

    const button = screen.getByRole('button', { name: en.error.notFound.cta })

    await user.click(button)

    expect(global.mockNavigate).toHaveBeenCalledWith('/')
    expect(global.mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('reports 404 to error tracker on mount', () => {
    renderWithProviders(<NotFoundErrorPage />)

    expect(captureMessage).toHaveBeenCalledWith('404 Not Found: /', 'warning')
    expect(captureMessage).toHaveBeenCalledTimes(1)
  })
})
