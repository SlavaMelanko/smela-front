import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'

import en from '@/locales/en.json'
import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'

import EmailConfirmationForm from '.'

const renderForm = (onSubmit = jest.fn(), isLoading = false) => {
  renderWithProviders(
    <EmailConfirmationForm onSubmit={onSubmit} isLoading={isLoading} />
  )

  const captchaButton = screen.getByTestId(auth.captcha.id)
  const submitButton = screen.getByRole('button', {
    name: en.email.confirmation.cta
  })

  return {
    captchaButton,
    submitButton
  }
}

describe('EmailConfirmation Form', () => {
  let user = null

  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('Rendering', () => {
    it('renders all form elements', () => {
      const { captchaButton, submitButton } = renderForm()

      expect(captchaButton).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })

    it('renders captcha button with correct text', () => {
      const { captchaButton } = renderForm()

      expect(captchaButton).toHaveTextContent(auth.captcha.label)
      expect(captchaButton).toHaveAttribute('data-testid', auth.captcha.id)
    })

    it('renders submit button with correct text', () => {
      const { submitButton } = renderForm()

      expect(submitButton).toHaveTextContent(en.email.confirmation.cta)
      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(submitButton).toHaveClass('primary-button')
    })

    it('renders required field indicator for captcha', () => {
      renderForm()

      const captchaField = screen
        .getByTestId(auth.captcha.id)
        .closest('.form-field')

      expect(captchaField).toHaveClass('form-field--required')
    })

    it('renders form with proper structure', () => {
      renderForm()

      // Forms don't have an explicit role, check by element
      const form = document.querySelector('.email-confirmation-form')

      expect(form).toBeInTheDocument()
      expect(form.tagName.toLowerCase()).toBe('form')

      const fieldsContainer = form.querySelector(
        '.email-confirmation-form__fields'
      )

      expect(fieldsContainer).toBeInTheDocument()
    })
  })

  describe('Validation', () => {
    it('shows error when captcha is not completed', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })
    })

    it('clears error when captcha is completed', async () => {
      const { captchaButton, submitButton } = renderForm()

      // First trigger error
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })

      // Complete captcha
      await user.click(captchaButton)

      await waitFor(() => {
        expect(screen.queryByText(en.captcha.error)).not.toBeInTheDocument()
      })
    })

    it('shows error styling when captcha validation fails', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        const captchaField = screen
          .getByTestId(auth.captcha.id)
          .closest('.form-field')

        expect(captchaField).toHaveClass('form-field--with-error')
      })
    })

    it('removes error styling when captcha is completed', async () => {
      const { captchaButton, submitButton } = renderForm()

      // Trigger error first
      await user.click(submitButton)

      await waitFor(() => {
        const captchaField = screen
          .getByTestId(auth.captcha.id)
          .closest('.form-field')

        expect(captchaField).toHaveClass('form-field--with-error')
      })

      // Complete captcha
      await user.click(captchaButton)

      await waitFor(() => {
        const captchaField = screen
          .getByTestId(auth.captcha.id)
          .closest('.form-field')

        expect(captchaField).not.toHaveClass('form-field--with-error')
      })
    })
  })

  describe('Form Submission', () => {
    it('disables submit button and shows loading text during submission', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 222))
      )
      const { captchaButton, submitButton } = renderForm(onSubmitMock)

      // Complete captcha first
      await user.click(captchaButton)
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent(en.processing)

      await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
    })

    it('submits form with captcha token and reset function', async () => {
      const onSubmitMock = jest.fn()
      const { captchaButton, submitButton } = renderForm(onSubmitMock)

      await user.click(captchaButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            captcha: auth.captcha.value,
            reset: expect.any(Function)
          })
        )
      })
    })

    it('prevents submission without captcha completion', async () => {
      const onSubmitMock = jest.fn()
      const { submitButton } = renderForm(onSubmitMock)

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })

      expect(onSubmitMock).not.toHaveBeenCalled()
    })

    it('prevents multiple submissions while form is processing', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )
      const { captchaButton, submitButton } = renderForm(onSubmitMock)

      await user.click(captchaButton)

      // Click multiple times
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1)
      })
    })

    it('resets form and increments captcha key when reset is called', async () => {
      const onSubmitMock = jest.fn()
      const { captchaButton, submitButton } = renderForm(onSubmitMock)

      // Complete and submit form
      await user.click(captchaButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalled()
      })

      // Get the reset function that was passed to onSubmit
      const resetFunction = onSubmitMock.mock.calls[0][0].reset

      // Call the reset function
      act(() => {
        resetFunction()
      })

      // Form should be reset - would need to click captcha again to submit
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })
    })
  })

  describe('User Interaction', () => {
    it('allows captcha completion by clicking the button', async () => {
      const { captchaButton } = renderForm()

      await user.click(captchaButton)

      // Captcha should now be completed (no error on submit)
      const submitButton = screen.getByRole('button', {
        name: en.email.confirmation.cta
      })

      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.queryByText(en.captcha.error)).not.toBeInTheDocument()
      })
    })

    it('maintains form state after validation error', async () => {
      const { submitButton } = renderForm()

      // Submit without captcha
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })

      // Form elements should still be interactive
      expect(submitButton).not.toBeDisabled()
      expect(screen.getByTestId(auth.captcha.id)).toBeEnabled()
    })

    it('clears captcha error immediately when captcha is completed', async () => {
      const { captchaButton, submitButton } = renderForm()

      // Trigger validation error
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })

      // Complete captcha
      await user.click(captchaButton)

      // Error should clear immediately
      expect(screen.queryByText(en.captcha.error)).not.toBeInTheDocument()
    })

    it('maintains focus flow between elements', async () => {
      const { captchaButton } = renderForm()

      // Focus on captcha
      captchaButton.focus()
      expect(document.activeElement).toBe(captchaButton)

      // Tab to submit button
      await user.tab()

      const submitButton = screen.getByRole('button', {
        name: en.email.confirmation.cta
      })

      expect(document.activeElement).toBe(submitButton)
    })
  })

  describe('Accessibility', () => {
    it('has accessible form structure', () => {
      renderForm()

      const form = document.querySelector('.email-confirmation-form')

      expect(form).toBeInTheDocument()
      expect(form.tagName.toLowerCase()).toBe('form')
    })

    it('makes submit button accessible with proper role and text', () => {
      renderForm()

      const submitButton = screen.getByRole('button', {
        name: en.email.confirmation.cta
      })

      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(submitButton).toBeInTheDocument()
    })

    it('shows error messages with proper structure', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        const errorMessage = screen.getByText(en.captcha.error)

        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage.closest('.form-field__error')).toBeInTheDocument()
      })
    })

    it('applies error styling to invalid fields', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        const captchaField = screen
          .getByTestId(auth.captcha.id)
          .closest('.form-field')

        expect(captchaField).toHaveClass('form-field--with-error')
      })
    })

    it('maintains focus on submit button after form submission attempt', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        expect(document.activeElement).toBe(submitButton)
      })
    })

    it('provides clear error feedback for screen readers', async () => {
      const { submitButton } = renderForm()

      await user.click(submitButton)

      await waitFor(() => {
        const errorMessage = screen.getByText(en.captcha.error)

        // Error message is in a div with form-field__error class
        expect(errorMessage.closest('.form-field__error')).toBeInTheDocument()
      })
    })
  })

  describe('Loading States', () => {
    it('shows loading state when isLoading prop is true', () => {
      renderWithProviders(
        <EmailConfirmationForm onSubmit={jest.fn()} isLoading={true} />
      )

      const submitButton = screen.getByRole('button', { name: en.processing })

      expect(submitButton).toBeInTheDocument()
      // Note: Button is not actually disabled when just isLoading is true, only the text changes
      expect(submitButton).toHaveTextContent(en.processing)
    })

    it('shows normal state when isLoading prop is false', () => {
      const { submitButton } = renderForm(jest.fn(), false)

      expect(submitButton).toHaveTextContent(en.email.confirmation.cta)
      expect(submitButton).not.toBeDisabled()
    })

    it('prioritizes form submission state over isLoading prop', async () => {
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )
      const { captchaButton, submitButton } = renderForm(onSubmitMock, false)

      await user.click(captchaButton)
      await user.click(submitButton)

      // Should show processing even if isLoading is false
      expect(submitButton).toHaveTextContent(en.processing)
      expect(submitButton).toBeDisabled()

      await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
    })

    it('combines isLoading and isSubmitting states correctly', async () => {
      const onSubmitMock = jest.fn()

      renderWithProviders(
        <EmailConfirmationForm onSubmit={onSubmitMock} isLoading={true} />
      )

      const submitButton = screen.getByRole('button', { name: en.processing })

      // Button shows loading text when isLoading is true
      expect(submitButton).toHaveTextContent(en.processing)

      // Can still click button even when isLoading is true
      // Validation will prevent submission if captcha not complete
      const captchaButton = screen.getByTestId(auth.captcha.id)

      await user.click(captchaButton)
      await user.click(submitButton)

      // Form can still be submitted when isLoading is true
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalled()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid form resets gracefully', async () => {
      const onSubmitMock = jest.fn()
      const { captchaButton, submitButton } = renderForm(onSubmitMock)

      // Complete captcha and submit
      await user.click(captchaButton)
      await user.click(submitButton)

      // Wait for submission
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            captcha: auth.captcha.value,
            reset: expect.any(Function)
          })
        )
      })

      // Get the reset function and call it
      const resetFunction = onSubmitMock.mock.calls[0][0].reset

      act(() => {
        resetFunction()
      })

      // After reset, the form should be cleared
      // We can verify this by checking that submitting again requires captcha
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(en.captcha.error)).toBeInTheDocument()
      })
    })

    it('verifies form remains functional after submission', async () => {
      // This test verifies the form can be submitted multiple times
      // which is important for error recovery scenarios
      const onSubmitMock = jest.fn()
      const { captchaButton, submitButton } = renderForm(onSubmitMock)

      // First submission
      await user.click(captchaButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalled()
      })

      // Get the reset function and reset the form
      const resetFunction = onSubmitMock.mock.calls[0][0].reset

      act(() => {
        resetFunction()
      })

      // Second submission after reset - need to wait for form to be ready
      await waitFor(() => {
        // Ensure form is reset before continuing
        expect(screen.queryByText(en.captcha.error)).not.toBeInTheDocument()
      })

      await user.click(captchaButton)
      await user.click(submitButton)

      await waitFor(() => {
        // Both submissions should have been recorded
        expect(onSubmitMock.mock.calls.length).toBeGreaterThanOrEqual(2)
      })

      // Form should still be functional
      expect(submitButton).toHaveTextContent(en.email.confirmation.cta)
    })
  })
})
