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

  it('renders title, default message, and button', () => {
    renderWithProviders(<NetworkErrorPage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      en.error.network.title
    )

    expect(screen.getByText(en.error.network.message.unknown)).toBeVisible()
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
    ).toBeVisible()
  })

  it('displays timeout message when errorType=timeout', () => {
    useUrlParams.mockReturnValue({
      errorType: NetworkErrorType.TIMEOUT
    })

    renderWithProviders(<NetworkErrorPage />)

    expect(screen.getByText(en.error.network.message.timeout)).toBeVisible()
  })

  it('navigates back when button is clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(<NetworkErrorPage />)

    await user.click(screen.getByRole('button', { name: en.error.network.cta }))

    expect(global.mockNavigate).toHaveBeenCalledWith(-1)
    expect(global.mockNavigate).toHaveBeenCalledTimes(1)
  })
})
