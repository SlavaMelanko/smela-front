import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import en from '@/locales/en.json'
import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'

import ResetPasswordForm from '.'

const renderForm = (onSubmit = jest.fn()) => {
  renderWithProviders(<ResetPasswordForm onSubmit={onSubmit} />)

  const emailInput = screen.getByPlaceholderText(en.email.example)
  const captchaButton = screen.getByTestId(auth.captcha.id)
  const submitButton = screen.getByRole('button', {
    name: en.password.reset.request.cta
  })

  return {
    emailInput,
    captchaButton,
    submitButton
  }
}

describe('Reset password form', () => {
  let user = null

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('displays the reset form fields', () => {
    const { emailInput, captchaButton, submitButton } = renderForm()

    expect(emailInput).toBeInTheDocument()
    expect(captchaButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('shows validation errors for missing email and captcha', async () => {
    const { submitButton } = renderForm()

    await user.click(submitButton)

    expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
    expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
  })

  it('shows an error when email format is invalid', async () => {
    const { emailInput, submitButton } = renderForm()

    await user.type(emailInput, auth.email.invalid)
    await user.click(submitButton)

    expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
  })

  it('shows loading state during form submission', async () => {
    const onSubmitMock = jest.fn(() => new Promise(res => setTimeout(res, 500)))
    const { emailInput, captchaButton, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.click(captchaButton)
    await user.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toHaveTextContent(en.processing)
      expect(submitButton).toBeDisabled()
      expect(onSubmitMock).toHaveBeenCalled()
    })
  })

  it('submits the form successfully with valid email and captcha', async () => {
    const onSubmitMock = jest.fn()
    const { emailInput, captchaButton, submitButton } = renderForm(onSubmitMock)

    await user.type(emailInput, auth.email.ok)
    await user.click(captchaButton)
    await user.click(submitButton)

    expect(onSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: auth.email.ok,
        captcha: auth.captcha.value
      })
    )
  })
})
