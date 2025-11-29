import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'
import en from '$/locales/en.json'

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

    global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
  })

  describe('Rendering', () => {
    it('renders all form fields', () => {
      const { emailInput, passwordInput, submitButton } = renderForm()

      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })

    it('renders required field indicators', () => {
      renderForm()

      // Login form doesn't have labels, check by placeholder
      const emailField = screen
        .getByPlaceholderText(en.email.placeholder)
        .closest('.form-field')
      const passwordField = screen
        .getByPlaceholderText(en.password.placeholder.default)
        .closest('.form-field')

      expect(emailField).toHaveClass('form-field--required')
      expect(passwordField).toHaveClass('form-field--required')
    })

    it('integrates with reCAPTCHA component', async () => {
      const onSubmitMock = jest.fn()
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      // Verify that the global reCAPTCHA mock was called during form submission
      await waitFor(() => {
        expect(global.mockExecuteReCaptcha).toHaveBeenCalled()
      })
    })
  })

  describe('Validation', () => {
    it('shows errors when both email and password are empty', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
        expect(screen.getByText(en.password.error.required)).toBeInTheDocument()
      })
    })

    it('validates email with multiple invalid scenarios', async () => {
      const testCases = [
        {
          email: auth.email.empty,
          expectedError: en.email.error.required
        },
        {
          email: auth.email.invalid,
          expectedError: en.email.error.format
        },
        {
          email: auth.email.noAt,
          expectedError: en.email.error.format
        },
        {
          email: auth.email.noTld,
          expectedError: en.email.error.format
        }
      ]

      for (const testCase of testCases) {
        cleanup()

        const { emailInput, submitButton } = renderForm()

        if (testCase.email) {
          await user.type(emailInput, testCase.email)
        }

        await user.click(submitButton)

        await waitFor(() => {
          expect(screen.getByText(testCase.expectedError)).toBeInTheDocument()
        })
      }
    })

    it('validates password with multiple invalid scenarios', async () => {
      const testCases = [
        {
          password: auth.password.empty,
          expectedError: en.password.error.required
        },
        {
          password: auth.password.short,
          expectedError: en.password.error.min
        },
        {
          password: auth.password.noLetter,
          expectedError: en.password.error.strong
        }
      ]

      for (const testCase of testCases) {
        cleanup()

        const { passwordInput, submitButton } = renderForm()

        if (testCase.password) {
          await user.type(passwordInput, testCase.password)
        }

        await user.click(submitButton)

        await waitFor(() => {
          expect(screen.getByText(testCase.expectedError)).toBeInTheDocument()
        })
      }
    })

    it('shows multiple validation errors simultaneously', async () => {
      const { emailInput, passwordInput, submitButton } = renderForm()

      // Enter invalid data for all fields
      await user.type(emailInput, auth.email.invalid)
      await user.type(passwordInput, auth.password.short)

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
        expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
      })
    })

    it('automatically trims whitespace from the email before submitting', async () => {
      const onSubmitMock = jest.fn()
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.withSpaces)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          data: { email: auth.email.ok, password: auth.password.strong },
          captcha: { token: auth.captcha.alternative }
        })
      })
    })
  })

  describe('Form Submission', () => {
    it('disables submit button and shows loading text during submission', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 222))
      )
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      user.click(submitButton)

      // Check that button is disabled and shows processing text immediately
      await waitFor(() => {
        expect(submitButton).toBeDisabled()
        expect(submitButton).toHaveTextContent(en.processing)
      })

      await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
    })

    it('submits form with valid email and password', async () => {
      const onSubmitMock = jest.fn()
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          data: { email: auth.email.ok, password: auth.password.strong },
          captcha: { token: auth.captcha.alternative }
        })
      })
    })

    it('prevents multiple submissions while form is processing', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      // Try to submit again quickly - React Hook Form should prevent this
      user.click(submitButton) // don't await - fire and forget
      user.click(submitButton) // don't await - fire and forget

      // Wait for the first submission to complete
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalled()
      })

      // Should only be called once due to React Hook Form's isSubmitting state
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
    })

    it('handles form submission state correctly', async () => {
      const onSubmitMock = jest.fn().mockResolvedValue()
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      // Wait for the async operation to complete.
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          data: { email: auth.email.ok, password: auth.password.strong },
          captcha: { token: auth.captcha.alternative }
        })
      })

      // Form should have been submitted successfully
      expect(onSubmitMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('User Interaction', () => {
    it('allows navigation between fields with Tab key', async () => {
      const { emailInput, passwordInput } = renderForm()

      // Start with email focused
      emailInput.focus()
      expect(document.activeElement).toBe(emailInput)

      // Tab to password
      await user.tab()
      expect(document.activeElement).toBe(passwordInput)
    })

    it('clears field error when user starts typing', async () => {
      const { emailInput, submitButton } = renderForm()

      // Submit to trigger validation errors
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
      })

      // Start typing in the field
      await user.type(emailInput, 'u')

      await waitFor(() => {
        expect(
          screen.queryByText(en.email.error.required)
        ).not.toBeInTheDocument()
      })
    })

    it('maintains form values after validation error', async () => {
      const { emailInput, passwordInput, submitButton } = renderForm()

      const testEmail = auth.email.ok
      const shortPassword = auth.password.short

      await user.type(emailInput, testEmail)
      await user.type(passwordInput, shortPassword)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
      })

      // Verify form values are preserved
      expect(emailInput).toHaveValue(testEmail)
      expect(passwordInput).toHaveValue(shortPassword)
    })
  })

  describe('Accessibility', () => {
    it('has accessible form fields with proper attributes', () => {
      renderForm()

      // Login form uses placeholders and ids for accessibility
      const emailInput = screen.getByPlaceholderText(en.email.placeholder)
      const passwordInput = screen.getByPlaceholderText(
        en.password.placeholder.default
      )

      expect(emailInput).toHaveAttribute('id', 'email')
      expect(emailInput).toHaveAttribute('name', 'email')
      expect(passwordInput).toHaveAttribute('id', 'password')
      expect(passwordInput).toHaveAttribute('name', 'password')
    })

    it('shows error messages with proper structure', async () => {
      const { emailInput, submitButton } = renderForm()

      await user.type(emailInput, auth.email.invalid)
      await user.click(submitButton)

      await waitFor(() => {
        const errorMessage = screen.getByText(en.email.error.format)

        expect(errorMessage).toBeInTheDocument()
        // Error message is inside a div with form-field__error class
        expect(errorMessage.closest('.form-field__error')).toBeInTheDocument()
      })
    })

    it('applies error styling to invalid fields', async () => {
      const { emailInput, submitButton } = renderForm()

      await user.type(emailInput, auth.email.invalid)
      await user.click(submitButton)

      await waitFor(() => {
        expect(emailInput).toHaveClass('input__field--error')
        expect(emailInput.closest('.form-field')).toHaveClass(
          'form-field--with-error'
        )
      })
    })

    it('makes submit button accessible with proper role and text', () => {
      renderForm()

      const submitButton = screen.getByRole('button', { name: en.login.verb })

      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(submitButton).toHaveTextContent(en.login.verb)
    })
  })
})
