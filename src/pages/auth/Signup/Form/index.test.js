import { screen, waitFor, within } from '@testing-library/react'
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
  const passwordInput = screen.getByPlaceholderText(
    en.password.placeholder.masked
  )
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

      const firstNameLabel = screen.getByText(en.firstName.label)
      const emailLabel = screen.getByText(en.email.label)
      const passwordLabel = screen.getByText(en.password.label)
      const lastNameLabel = screen.getByText(en.lastName.label)

      // First name, email, and password are required (have asterisk)
      expect(within(firstNameLabel).getByText('*')).toBeInTheDocument()
      expect(within(emailLabel).getByText('*')).toBeInTheDocument()
      expect(within(passwordLabel).getByText('*')).toBeInTheDocument()

      // Last name is optional (no asterisk)
      expect(within(lastNameLabel).queryByText('*')).not.toBeInTheDocument()
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

      // Fill required fields first
      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      // Add invalid last name
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

      // Fill required fields first
      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      // Add invalid last name
      await user.type(lastNameInput, auth.lastName.long)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.lastName.error.max)).toBeInTheDocument()
      })
    })

    it('automatically trims whitespace from the email before submitting', async () => {
      const onSubmitMock = jest.fn()
      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.withSpaces)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({ email: auth.email.ok })
        )
      })
    })
  })

  describe('Form Submission', () => {
    it('does not include role field in submission', async () => {
      const onSubmitMock = jest.fn()
      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.not.objectContaining({ role: expect.anything() })
        )
      })
    })

    it('handles form submission correctly', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )

      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          firstName: auth.firstName.ok,
          email: auth.email.ok,
          password: auth.password.strong
        })
      })
    })

    it('submits form with valid data', async () => {
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
        expect(onSubmitMock).toHaveBeenCalledWith({
          firstName: auth.firstName.ok,
          lastName: auth.lastName.ok,
          email: auth.email.ok,
          password: auth.password.strong
        })
      })
    })

    it('submits form without optional last name', async () => {
      const onSubmitMock = jest.fn()
      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          firstName: auth.firstName.ok,
          email: auth.email.ok,
          password: auth.password.strong
        })
      })
    })
  })

  describe('User Interaction', () => {
    it('allows navigation between fields with Tab key', async () => {
      const { firstNameInput, lastNameInput, emailInput, passwordInput } =
        renderForm()

      // Start with first name focused
      firstNameInput.focus()
      expect(document.activeElement).toBe(firstNameInput)

      // Tab to last name
      await user.tab()
      expect(document.activeElement).toBe(lastNameInput)

      // Tab to email
      await user.tab()
      expect(document.activeElement).toBe(emailInput)

      // Tab to password
      await user.tab()
      expect(document.activeElement).toBe(passwordInput)
    })

    it('clears field error when user starts typing', async () => {
      const { firstNameInput, submitButton } = renderForm()

      // Submit to trigger validation errors
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(en.firstName.error.required)
        ).toBeInTheDocument()
      })

      // Start typing in the field
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

      // Enter invalid data for all fields
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

      // Labels with required asterisks use regex to match partial text
      expect(
        screen.getByLabelText(new RegExp(en.firstName.label))
      ).toBeInTheDocument()

      expect(screen.getByLabelText(en.lastName.label)).toBeInTheDocument()
      expect(
        screen.getByLabelText(new RegExp(en.email.label))
      ).toBeInTheDocument()

      expect(
        screen.getByLabelText(new RegExp(en.password.label))
      ).toBeInTheDocument()
    })

    it('shows error messages for invalid fields', async () => {
      const { firstNameInput, submitButton } = renderForm()

      await user.type(firstNameInput, auth.firstName.short)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.firstName.error.min)).toBeInTheDocument()
      })
    })
  })
})
