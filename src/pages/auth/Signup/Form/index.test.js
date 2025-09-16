import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'
import en from '$/locales/en.json'

import SignupForm from '.'

const renderForm = (onSubmit = jest.fn()) => {
  renderWithProviders(<SignupForm onSubmit={onSubmit} />)

  const firstNameInput = screen.getByPlaceholderText(en.firstName.example)
  const lastNameInput = screen.getByPlaceholderText(en.lastName.example)
  const emailInput = screen.getByPlaceholderText(en.email.example)
  const passwordInput = screen.getByLabelText(en.password.label)
  const submitButton = screen.getByRole('button', { name: en.signUp })

  return {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    submitButton
  }
}

describe('Signup Form', () => {
  let user = null

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders all fields', () => {
      const {
        firstNameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        submitButton
      } = renderForm()

      expect(firstNameInput).toBeInTheDocument()
      expect(lastNameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })

    it('renders required field indicators', () => {
      renderForm()

      // First name, email, and password are required.
      const firstNameField = screen
        .getByText(en.firstName.label)
        .closest('.form-field')
      const emailField = screen.getByText(en.email.label).closest('.form-field')
      const passwordField = screen
        .getByText(en.password.label)
        .closest('.form-field')
      const lastNameField = screen
        .getByText(en.lastName.label)
        .closest('.form-field')

      expect(firstNameField).toHaveClass('form-field--required')
      expect(emailField).toHaveClass('form-field--required')
      expect(passwordField).toHaveClass('form-field--required')
      expect(lastNameField).not.toHaveClass('form-field--required')
    })
  })

  describe('Validation', () => {
    it('shows errors when required fields are empty', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(en.firstName.error.required)
        ).toBeInTheDocument()

        expect(screen.getByText(en.email.error.required)).toBeInTheDocument()
        expect(screen.getByText(en.password.error.required)).toBeInTheDocument()
      })
    })

    it('shows error for short first name', async () => {
      const { firstNameInput, submitButton } = renderForm()

      await user.type(firstNameInput, auth.firstName.short)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.firstName.error.min)).toBeInTheDocument()
      })
    })

    it('shows error for first name exceeding max length', async () => {
      const { firstNameInput, submitButton } = renderForm()

      await user.type(firstNameInput, auth.firstName.long)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.firstName.error.max)).toBeInTheDocument()
      })
    })

    it('shows error for invalid email format', async () => {
      const { emailInput, submitButton } = renderForm()

      await user.type(emailInput, auth.email.invalid)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
      })
    })

    it('shows error for short password', async () => {
      const { passwordInput, submitButton } = renderForm()

      await user.type(passwordInput, auth.password.short)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
      })
    })

    it('shows error for password without letters', async () => {
      const { passwordInput, submitButton } = renderForm()

      await user.type(passwordInput, auth.password.noLetter)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.password.error.strong)).toBeInTheDocument()
      })
    })

    it('shows error for short last name when provided', async () => {
      const {
        firstNameInput,
        emailInput,
        passwordInput,
        lastNameInput,
        submitButton
      } = renderForm()

      // Fill required fields first.
      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      // Add invalid last name.
      await user.type(lastNameInput, auth.lastName.short)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.lastName.error.min)).toBeInTheDocument()
      })
    })

    it('shows error for long last name when provided', async () => {
      const {
        firstNameInput,
        emailInput,
        passwordInput,
        lastNameInput,
        submitButton
      } = renderForm()

      // Fill required fields first.
      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      // Add invalid last name.
      await user.type(lastNameInput, auth.lastName.long)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.lastName.error.max)).toBeInTheDocument()
      })
    })

    it('automatically trims whitespace from the email before submitting', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
      const onSubmitMock = jest.fn()
      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.withSpaces)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            email: auth.email.ok,
            captchaToken: auth.captcha.valid
          })
        )
      })
    })
  })

  describe('ReCaptcha Integration', () => {
    const validFormData = async (user, inputs) => {
      await user.type(inputs.firstNameInput, auth.firstName.ok)
      await user.type(inputs.emailInput, auth.email.ok)
      await user.type(inputs.passwordInput, auth.password.strong)
    }

    it('executes reCAPTCHA on form submission', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
      const onSubmitMock = jest.fn()
      const formInputs = renderForm(onSubmitMock)

      await validFormData(user, formInputs)
      await user.click(formInputs.submitButton)

      await waitFor(() => {
        expect(global.mockExecuteReCaptcha).toHaveBeenCalled()
      })
    })

    it('handles reCAPTCHA failure gracefully', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(null)
      const onSubmitMock = jest.fn()
      const formInputs = renderForm(onSubmitMock)

      await validFormData(user, formInputs)
      await user.click(formInputs.submitButton)

      await waitFor(() => {
        expect(global.mockExecuteReCaptcha).toHaveBeenCalled()
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            captchaToken: null
          })
        )
      })
    })

    it('includes captcha token in form submission', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
      const onSubmitMock = jest.fn()
      const formInputs = renderForm(onSubmitMock)

      await validFormData(user, formInputs)
      await user.click(formInputs.submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: auth.firstName.ok,
            email: auth.email.ok,
            password: auth.password.strong,
            captchaToken: auth.captcha.alternative
          })
        )
      })
    })
  })

  describe('Form Submission', () => {
    it('handles form submission correctly', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )

      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      // Verify that the form submission happens.
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: auth.firstName.ok,
            email: auth.email.ok,
            password: auth.password.strong,
            captchaToken: auth.captcha.valid
          })
        )
      })
    })

    it('submits form with valid data', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
      const onSubmitMock = jest.fn()
      const {
        firstNameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        submitButton
      } = renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(lastNameInput, auth.lastName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: auth.firstName.ok,
            lastName: auth.lastName.ok,
            email: auth.email.ok,
            password: auth.password.strong,
            captchaToken: auth.captcha.alternative
          })
        )
      })
    })

    it('submits form without optional last name', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
      const onSubmitMock = jest.fn()
      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: auth.firstName.ok,
            email: auth.email.ok,
            password: auth.password.strong,
            captchaToken: auth.captcha.alternative
          })
        )

        // Verify lastName is not included when empty.
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.not.objectContaining({
            lastName: expect.anything()
          })
        )
      })
    })
  })

  describe('User Interaction', () => {
    it('allows navigation between fields with Tab key', async () => {
      const { firstNameInput, lastNameInput, emailInput, passwordInput } =
        renderForm()

      // Start with first name focused.
      firstNameInput.focus()
      expect(document.activeElement).toBe(firstNameInput)

      // Tab to last name.
      await user.tab()
      expect(document.activeElement).toBe(lastNameInput)

      // Tab to email.
      await user.tab()
      expect(document.activeElement).toBe(emailInput)

      // Tab to password.
      await user.tab()
      expect(document.activeElement).toBe(passwordInput)
    })

    it('clears field error when user starts typing', async () => {
      const { firstNameInput, submitButton } = renderForm()

      // Submit to trigger validation errors.
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(en.firstName.error.required)
        ).toBeInTheDocument()
      })

      // Start typing in the field.
      await user.type(firstNameInput, 'J')

      await waitFor(() => {
        expect(
          screen.queryByText(en.firstName.error.required)
        ).not.toBeInTheDocument()
      })
    })

    it('shows multiple validation errors simultaneously', async () => {
      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm()

      // Enter invalid data for all fields.
      await user.type(firstNameInput, auth.firstName.short)
      await user.type(emailInput, auth.email.invalid)
      await user.type(passwordInput, auth.password.short)

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.firstName.error.min)).toBeInTheDocument()
        expect(screen.getByText(en.email.error.format)).toBeInTheDocument()
        expect(screen.getByText(en.password.error.min)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for all inputs', () => {
      renderForm()

      expect(screen.getByLabelText(en.firstName.label)).toBeInTheDocument()
      expect(screen.getByLabelText(en.lastName.label)).toBeInTheDocument()
      expect(screen.getByLabelText(en.email.label)).toBeInTheDocument()
      expect(screen.getByLabelText(en.password.label)).toBeInTheDocument()
    })

    it('shows error messages for invalid fields', async () => {
      const { firstNameInput, submitButton } = renderForm()

      await user.type(firstNameInput, auth.firstName.short)
      await user.click(submitButton)

      await waitFor(() => {
        const errorMessage = screen.getByText(en.firstName.error.min)

        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage).toHaveClass('form-field__error')
      })
    })
  })
})
