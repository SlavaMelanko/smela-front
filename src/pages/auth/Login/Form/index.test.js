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

  describe('Rendering', () => {
    it('renders all form fields', () => {
      const { emailInput, passwordInput, submitButton } = renderForm()

      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })

    it('renders required field indicators', () => {
      renderForm()

      // login form doesn't have labels, check by placeholder
      const emailField = screen
        .getByPlaceholderText(en.email.placeholder)
        .closest('.form-field')
      const passwordField = screen
        .getByPlaceholderText(en.password.placeholder.default)
        .closest('.form-field')

      expect(emailField).toHaveClass('form-field--required')
      expect(passwordField).toHaveClass('form-field--required')
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

    it('shows error for invalid email format', async () => {
      const { emailInput, submitButton } = renderForm()

      await user.type(emailInput, auth.email.invalid)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
        expect(screen.getByText(en.password.error.required)).toBeInTheDocument()
      })
    })

    it('shows error for password shorter than minimum length', async () => {
      const { passwordInput, submitButton } = renderForm()

      await user.type(passwordInput, auth.password.short)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
        expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
      })
    })

    it('shows multiple validation errors simultaneously', async () => {
      const { emailInput, passwordInput, submitButton } = renderForm()

      // enter invalid data for all fields
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

  describe('Form Submission', () => {
    it('disables submit button and shows loading text during submission', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 222))
      )
      const { emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent(en.processing)

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
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            email: auth.email.ok,
            password: auth.password.strong
          }),
          expect.anything()
        )
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

      // click multiple times
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('User Interaction', () => {
    it('allows navigation between fields with Tab key', async () => {
      const { emailInput, passwordInput } = renderForm()

      // start with email focused
      emailInput.focus()
      expect(document.activeElement).toBe(emailInput)

      // tab to password
      await user.tab()
      expect(document.activeElement).toBe(passwordInput)
    })

    it('clears field error when user starts typing', async () => {
      const { emailInput, submitButton } = renderForm()

      // submit to trigger validation errors
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
      })

      // start typing in the field
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

      // verify form values are preserved
      expect(emailInput).toHaveValue(testEmail)
      expect(passwordInput).toHaveValue(shortPassword)
    })
  })

  describe('Accessibility', () => {
    it('has accessible form fields with proper attributes', () => {
      renderForm()

      // login form uses placeholders and ids for accessibility
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
        // error message is inside a div with form-field__error class
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
