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

  it('shows errors when required fields are empty', async () => {
    const { submitButton } = renderForm()

    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(en.firstName.error.required)).toBeInTheDocument()
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

  it('shows error for short password', async () => {
    const { passwordInput, submitButton } = renderForm()

    await user.type(passwordInput, auth.password.onlyNumbers)

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
      expect(screen.getByText(en.password.error.latin)).toBeInTheDocument()
    })
  })

  it('displays a loading state while the form is submitting', async () => {
    const onSubmitMock = jest.fn(() => new Promise(res => setTimeout(res, 222)))

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      termsCheckbox,
      submitButton
    } = renderForm(onSubmitMock)

    await user.type(firstNameInput, auth.firstName.ok)
    await user.type(lastNameInput, auth.lastName.ok)
    await user.type(emailInput, auth.email.ok)
    await user.type(passwordInput, auth.password.strong)

    await user.click(termsCheckbox)
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(en.processing)

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
  })

  it('automatically trims whitespace from the email before submitting', async () => {
    const onSubmitMock = jest.fn()

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      termsCheckbox,
      submitButton
    } = renderForm(onSubmitMock)

    await user.type(firstNameInput, auth.firstName.ok)
    await user.type(lastNameInput, auth.lastName.ok)
    await user.type(emailInput, `   ${auth.email.ok}   `)
    await user.type(passwordInput, auth.password.strong)

    await user.click(termsCheckbox)
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
})
