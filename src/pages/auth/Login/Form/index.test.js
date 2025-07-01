import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import en from '@/locales/en.json'
import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'

import LoginForm from '.'

const renderForm = (onSubmit = jest.fn()) => {
  renderWithProviders(<LoginForm onSubmit={onSubmit} />)

  const emailInput = screen.getByPlaceholderText(en.email.placeholder)
  const passwordInput = screen.getByPlaceholderText(
    en.password.placeholder.default
  )
  const submitButton = screen.getByRole('button', { name: en.login.verb })

  return {
    emailInput,
    passwordInput,
    submitButton
  }
}

describe('Login Form', () => {
  let user = null

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('displays the login form fields', () => {
    const { emailInput, passwordInput, submitButton } = renderForm()

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('shows errors when both email and password are empty', async () => {
    const { submitButton } = renderForm()

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
      expect(screen.getByText(en.password.error.required)).toBeInTheDocument()
    })
  })

  it('shows an error when email format is invalid', async () => {
    const { emailInput, submitButton } = renderForm()

    await user.type(emailInput, auth.email.invalid)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
      expect(screen.getByText(en.password.error.required)).toBeInTheDocument()
    })
  })

  it('shows an error when password is too short', async () => {
    const { passwordInput, submitButton } = renderForm()

    await user.type(passwordInput, auth.password.onlyNumbers)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
      expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
    })
  })

  it('displays a loading state while the form is submitting', async () => {
    const onSubmitMock = jest.fn(() => new Promise(res => setTimeout(res, 222)))
    const { emailInput, passwordInput, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.type(passwordInput, auth.password.strong)
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(en.processing)
  })

  it('automatically trims whitespace from the email before submitting', async () => {
    const onSubmitMock = jest.fn()
    const { emailInput, passwordInput, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, `   ${auth.email.ok}   `)
    await user.type(passwordInput, auth.password.strong)
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: auth.email.ok,
          password: auth.password.strong
        }),
        expect.anything()
      )
    })
  })

  it('submits the form successfully with valid email and password', async () => {
    const onSubmitMock = jest.fn()
    const { emailInput, passwordInput, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.type(passwordInput, auth.password.strong)
    await user.click(submitButton)

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: auth.email.ok,
          password: auth.password.strong
        }),
        expect.anything()
      )
    })
  })
})
