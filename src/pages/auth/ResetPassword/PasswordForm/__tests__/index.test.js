import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'
import en from '$/locales/en.json'

import SetNewPasswordForm from '..'

const renderForm = (onSubmit = jest.fn(), isLoading = false) => {
  renderWithProviders(
    <SetNewPasswordForm onSubmit={onSubmit} isLoading={isLoading} />
  )

  return {
    passwordInput: screen.getByPlaceholderText(en.password.placeholder.new),
    submitButton: screen.getByRole('button', {
      name: isLoading ? en.processing : en.password.reset.set.cta
    })
  }
}

describe('Set New Password Form', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('renders form fields', () => {
    const { passwordInput, submitButton } = renderForm()

    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('shows validation error for short password', async () => {
    const { passwordInput, submitButton } = renderForm()

    await user.type(passwordInput, auth.password.short)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
    })
  })

  it('shows validation error for weak password', async () => {
    const { passwordInput, submitButton } = renderForm()

    await user.type(passwordInput, auth.password.onlyLowercase)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(en.password.error.strong)).toBeInTheDocument()
    })
  })

  it('submits with valid password', async () => {
    const onSubmitMock = jest.fn()
    const { passwordInput, submitButton } = renderForm(onSubmitMock)

    await user.type(passwordInput, auth.password.strong)
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        newPassword: auth.password.strong
      })
    })
  })

  it('shows loading state', () => {
    renderWithProviders(
      <SetNewPasswordForm onSubmit={jest.fn()} isLoading={true} />
    )

    const submitButton = screen.getByRole('button', { name: en.processing })

    expect(submitButton).toHaveTextContent(en.processing)
    expect(submitButton).toBeDisabled()
  })
})
