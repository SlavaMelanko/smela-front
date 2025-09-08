import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import en from '@/locales/en.json'
import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'

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

      // first name, email, and password are required
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

      // fill required fields first
      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      // add invalid last name
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

      // fill required fields first
      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)

      // add invalid last name
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
          expect.objectContaining({
            email: auth.email.ok
          }),
          expect.anything()
        )
      })
    })
  })

  describe('Form Submission', () => {
    it('displays a loading state while the form is submitting', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 222))
      )

      const { firstNameInput, emailInput, passwordInput, submitButton } =
        renderForm(onSubmitMock)

      await user.type(firstNameInput, auth.firstName.ok)
      await user.type(emailInput, auth.email.ok)
      await user.type(passwordInput, auth.password.strong)
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent(en.processing)

      await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
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
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: auth.firstName.ok,
            lastName: auth.lastName.ok,
            email: auth.email.ok,
            password: auth.password.strong
          }),
          expect.anything()
        )
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
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            firstName: auth.firstName.ok,
            email: auth.email.ok,
            password: auth.password.strong
          }),
          expect.anything()
        )

        // verify lastName is not included when empty
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.not.objectContaining({
            lastName: expect.anything()
          }),
          expect.anything()
        )
      })
    })
  })

  describe('User Interaction', () => {
    it('allows navigation between fields with Tab key', async () => {
      const { firstNameInput, lastNameInput, emailInput, passwordInput } =
        renderForm()

      // start with first name focused
      firstNameInput.focus()
      expect(document.activeElement).toBe(firstNameInput)

      // tab to last name
      await user.tab()
      expect(document.activeElement).toBe(lastNameInput)

      // tab to email
      await user.tab()
      expect(document.activeElement).toBe(emailInput)

      // tab to password
      await user.tab()
      expect(document.activeElement).toBe(passwordInput)
    })

    it('clears field error when user starts typing', async () => {
      const { firstNameInput, submitButton } = renderForm()

      // submit to trigger validation errors
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(en.firstName.error.required)
        ).toBeInTheDocument()
      })

      // start typing in the field
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

      // enter invalid data for all fields
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
