import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UserStatus } from '@/lib/types'
import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import { UserInfoForm } from '..'

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  status: UserStatus.ACTIVE,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-06-01T00:00:00Z'
}

const renderForm = ({
  user,
  isSubmitting = false,
  onSubmit = jest.fn()
} = {}) => {
  renderWithProviders(
    <UserInfoForm user={user} isSubmitting={isSubmitting} onSubmit={onSubmit} />
  )

  return {
    firstNameInput: screen.getByLabelText(en.firstName.label, { exact: false }),
    lastNameInput: screen.getByLabelText(en.lastName.label, { exact: false }),
    saveButton: screen.getByRole('button', { name: en.save })
  }
}

describe('UserInfoForm', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('renders firstName, lastName inputs and save button', () => {
    const { firstNameInput, lastNameInput, saveButton } = renderForm()

    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })

  it('save button is disabled when form is not dirty', () => {
    const { saveButton } = renderForm()

    expect(saveButton).toBeDisabled()
  })

  it('populates fields when user prop is provided', () => {
    const { firstNameInput, lastNameInput } = renderForm({ user: mockUser })

    expect(firstNameInput).toHaveValue(mockUser.firstName)
    expect(lastNameInput).toHaveValue(mockUser.lastName)
  })

  it('shows required error when firstName is cleared on submit', async () => {
    const { saveButton } = renderForm({ user: mockUser })

    const firstNameInput = screen.getByLabelText(en.firstName.label, {
      exact: false
    })

    // Clear makes form dirty so save becomes enabled
    await user.clear(firstNameInput)
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(en.firstName.error.required)).toBeInTheDocument()
    })
  })

  it('shows min length error when firstName is too short', async () => {
    const { firstNameInput, saveButton } = renderForm()

    await user.type(firstNameInput, 'A')
    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(en.firstName.error.min)).toBeInTheDocument()
    })
  })

  it('blocks submission without selecting status', async () => {
    const onSubmit = jest.fn()
    const { firstNameInput, saveButton } = renderForm({ onSubmit })

    await user.type(firstNameInput, 'John')
    await user.click(saveButton)

    // RHF blocks submission when status fails validation
    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  it('calls onSubmit with correct data after filling fields and selecting status', async () => {
    const onSubmit = jest.fn()
    const { firstNameInput, saveButton } = renderForm({ onSubmit })

    await user.type(firstNameInput, 'Jane')

    // The StatusDropdown trigger is the first button (before the save button)
    const [statusTrigger] = screen.getAllByRole('button')

    await user.click(statusTrigger)

    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('menuitemradio', {
        name: new RegExp(en.status.values.active, 'i')
      })
    )

    await user.click(saveButton)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Jane',
          status: UserStatus.ACTIVE
        }),
        expect.anything()
      )
    })
  })

  it('disables save button when isSubmitting is true', () => {
    // With isSubmitting=true the button renders as "Processing..." and is disabled
    renderWithProviders(
      <UserInfoForm user={mockUser} isSubmitting={true} onSubmit={jest.fn()} />
    )

    const submitButton = screen.getByRole('button', { name: en.processing })

    expect(submitButton).toBeDisabled()
  })
})
