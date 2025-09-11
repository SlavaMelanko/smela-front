import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import en from '@/locales/en.json'
import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'

import ResetPasswordForm from '.'

const renderForm = (onSubmit = jest.fn()) => {
  renderWithProviders(<ResetPasswordForm onSubmit={onSubmit} />)

  const emailInput = screen.getByPlaceholderText(en.email.example)
  const submitButton = screen.getByRole('button', {
    name: en.password.reset.request.cta
  })

  return {
    emailInput,
    submitButton
  }
}

describe('Reset password form', () => {
  let user = null

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
  })

  it('displays the reset form fields', () => {
    const { emailInput, submitButton } = renderForm()

    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('shows validation error for missing email', async () => {
    const { submitButton } = renderForm()

    await user.click(submitButton)

    expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
  })

  it('shows an error when email format is invalid', async () => {
    const { emailInput, submitButton } = renderForm()

    await user.type(emailInput, auth.email.invalid)
    await user.click(submitButton)

    expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
  })

  it('shows loading state during form submission', async () => {
    global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
    const onSubmitMock = jest.fn(() => new Promise(res => setTimeout(res, 500)))
    const { emailInput, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toHaveTextContent(en.processing)
      expect(submitButton).toBeDisabled()
      expect(onSubmitMock).toHaveBeenCalled()
    })
  })

  it('submits the form successfully with valid email and captcha', async () => {
    global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
    const onSubmitMock = jest.fn()
    const { emailInput, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.mockExecuteReCaptcha).toHaveBeenCalledWith('reset_password')
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: auth.email.ok,
          captchaToken: auth.captcha.valid
        })
      )
    })
  })

  it('handles reCAPTCHA failure gracefully', async () => {
    global.mockExecuteReCaptcha.mockResolvedValue(null)
    const onSubmitMock = jest.fn()
    const { emailInput, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.mockExecuteReCaptcha).toHaveBeenCalledWith('reset_password')
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: auth.email.ok,
          captchaToken: null
        })
      )
    })
  })
})
