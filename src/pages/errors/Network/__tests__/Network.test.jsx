import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import useUrlParams from '@/hooks/useUrlParams'
import { NetworkErrorType } from '@/lib/networkMonitor'
import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import NetworkErrorPage from '../index'

jest.mock('@/hooks/useUrlParams')

describe('NetworkErrorPage', () => {
  beforeEach(() => {
    global.mockNavigate.mockClear()
    useUrlParams.mockClear()
    useUrlParams.mockReturnValue({ errorType: null })
  })

  it('renders with correct structure and classes', () => {
    const { container } = renderWithProviders(<NetworkErrorPage />)

    expect(container.querySelector('.network-error-page')).toBeInTheDocument()

    expect(
      container.querySelector('.network-error-page__icon')
    ).toBeInTheDocument()

    expect(
      container.querySelector('.network-error-page__title')
    ).toBeInTheDocument()

    expect(
      container.querySelector('.network-error-page__description')
    ).toBeInTheDocument()
  })

  it('displays all content correctly with default error', () => {
    useUrlParams.mockReturnValue({ errorType: null })

    const { container } = renderWithProviders(<NetworkErrorPage />)

    // Icon
    const icon = container.querySelector('.network-error-page__icon')

    expect(icon).toBeVisible()
    expect(icon).toHaveClass('cloud-alert-icon')

    // Title
    expect(screen.getByText(en.error.network.title)).toBeInTheDocument()

    // Default error message
    expect(
      screen.getByText(en.error.network.message.unknown)
    ).toBeInTheDocument()

    // Button
    expect(
      screen.getByRole('button', { name: en.error.network.cta })
    ).toBeVisible()
  })

  it('displays connectionRefused message when errorType=connectionRefused', () => {
    useUrlParams.mockReturnValue({
      errorType: NetworkErrorType.CONNECTION_REFUSED
    })

    renderWithProviders(<NetworkErrorPage />)

    expect(
      screen.getByText(en.error.network.message.connectionRefused)
    ).toBeInTheDocument()
  })

  it('displays timeout message when errorType=timeout', () => {
    useUrlParams.mockReturnValue({
      errorType: NetworkErrorType.TIMEOUT
    })

    renderWithProviders(<NetworkErrorPage />)

    expect(
      screen.getByText(en.error.network.message.timeout)
    ).toBeInTheDocument()
  })

  it('navigates back when "Try again" button is clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(<NetworkErrorPage />)

    const button = screen.getByRole('button', { name: en.error.network.cta })

    await user.click(button)

    expect(global.mockNavigate).toHaveBeenCalledWith(-1)
    expect(global.mockNavigate).toHaveBeenCalledTimes(1)
  })
})
