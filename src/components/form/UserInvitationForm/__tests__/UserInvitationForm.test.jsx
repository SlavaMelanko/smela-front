import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/tests'
import en from '$/locales/en.json'

import { UserInvitationForm } from '..'

const renderForm = ({ onSubmit = jest.fn(), customConfig } = {}) => {
  renderWithProviders(
    <UserInvitationForm
      isLoading={false}
      onSubmit={onSubmit}
      customConfig={customConfig}
    />
  )

  return {
    firstNameInput: screen.getByLabelText(en.firstName.label, { exact: false }),
    lastNameInput: screen.getByLabelText(en.lastName.label, { exact: false }),
    emailInput: screen.getByLabelText(en.email.label, { exact: false }),
    positionInput: screen.queryByLabelText(en.position.label, { exact: false }),
    submitButton: screen.getByRole('button', { name: en.invite.send.cta }),
    permissionsSection: screen.queryByText(en.permissions.name)
  }
}

describe('UserInvitationForm', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('field visibility', () => {
    it('shows position field by default', () => {
      const { positionInput } = renderForm()

      expect(positionInput).toBeInTheDocument()
    })

    it('hides position field when customConfig.position is false', () => {
      const { positionInput } = renderForm({
        customConfig: { position: false }
      })

      expect(positionInput).not.toBeInTheDocument()
    })

    it('shows permissions section by default', () => {
      const { permissionsSection } = renderForm()

      expect(permissionsSection).toBeInTheDocument()
    })

    it('hides permissions section when customConfig.permissions is false', () => {
      const { permissionsSection } = renderForm({
        customConfig: { permissions: false }
      })

      expect(permissionsSection).not.toBeInTheDocument()
    })
  })

  describe('form submission', () => {
    it('sends all fields by default', async () => {
      const onSubmit = jest.fn()
      const { firstNameInput, emailInput, positionInput, submitButton } =
        renderForm({ onSubmit })

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.type(positionInput, 'Developer')
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })

      const submittedData = onSubmit.mock.calls[0][0]

      expect(submittedData).toHaveProperty('firstName', 'John')
      expect(submittedData).toHaveProperty('email', 'john@example.com')
      expect(submittedData).toHaveProperty('position', 'Developer')
      expect(submittedData).toHaveProperty('permissions')
      expect(submittedData.permissions).toHaveProperty('users')
      expect(submittedData.permissions).toHaveProperty('teams')
      expect(submittedData.permissions.users).toHaveProperty('view')
      expect(submittedData.permissions.users).toHaveProperty('manage')
      expect(submittedData.permissions.teams).toHaveProperty('view')
      expect(submittedData.permissions.teams).toHaveProperty('manage')
    })

    it('excludes hidden fields from submission', async () => {
      const onSubmit = jest.fn()
      const { firstNameInput, emailInput, submitButton } = renderForm({
        onSubmit,
        customConfig: { position: false }
      })

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })

      const submittedData = onSubmit.mock.calls[0][0]

      expect(submittedData).not.toHaveProperty('position')
      expect(submittedData).toMatchObject({
        firstName: 'John',
        email: 'john@example.com'
      })
    })
  })

  describe('permissions matrix', () => {
    it('renders permissions matrix with resource labels and switches', () => {
      renderForm()

      expect(
        screen.getByText(en.permissions.resources.values.users)
      ).toBeInTheDocument()
      expect(
        screen.getByText(en.permissions.resources.values.teams)
      ).toBeInTheDocument()

      // Should have View and Manage labels for each resource (4 total)
      expect(
        screen.getAllByText(en.permissions.actions.values.view)
      ).toHaveLength(2)
      expect(
        screen.getAllByText(en.permissions.actions.values.manage)
      ).toHaveLength(2)
    })

    it('includes permissions data in form submission', async () => {
      const onSubmit = jest.fn()
      const { firstNameInput, emailInput, submitButton } = renderForm({
        onSubmit
      })

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
      })

      const submittedData = onSubmit.mock.calls[0][0]

      // Verify default permission values
      expect(submittedData.permissions).toEqual({
        users: { view: true, manage: true },
        teams: { view: true, manage: false }
      })
    })
  })
})
