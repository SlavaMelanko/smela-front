import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import en from '@/locales/en.json'
import { renderWithProviders } from '@/tests'
import { auth } from '@/tests/data'

import EmailConfirmationForm from '.'

const renderForm = (onSubmit = jest.fn(), isLoading = false) => {
  renderWithProviders(
    <EmailConfirmationForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      userEmail={auth.email.ok}
    />
  )

  const submitButton = screen.getByRole('button', {
    name: isLoading ? en.processing : en.email.confirmation.cta
  })

  return {
    submitButton
  }
}

describe('EmailConfirmation Form', () => {
  let user = null

  beforeEach(() => {
    user = userEvent.setup()
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders form with proper structure', () => {
      renderForm()

      const form = document.querySelector('.email-confirmation-form')

      expect(form).toBeInTheDocument()
      expect(form.tagName.toLowerCase()).toBe('form')
    })

    it('renders submit button with correct text', () => {
      const { submitButton } = renderForm()

      expect(submitButton).toHaveTextContent(en.email.confirmation.cta)
      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(submitButton).toHaveClass('primary-button')
    })
  })

  describe('ReCaptcha Integration', () => {
    it('executes reCAPTCHA on form submission', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
      const onSubmitMock = jest.fn()
      const { submitButton } = renderForm(onSubmitMock)

      await user.click(submitButton)

      await waitFor(() => {
        expect(global.mockExecuteReCaptcha).toHaveBeenCalled()

        expect(onSubmitMock).toHaveBeenCalledWith({
          email: auth.email.ok,
          captchaToken: auth.captcha.alternative
        })
      })
    })

    it('handles reCAPTCHA failure gracefully', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(null)
      const onSubmitMock = jest.fn()
      const { submitButton } = renderForm(onSubmitMock)

      await user.click(submitButton)

      await waitFor(() => {
        expect(global.mockExecuteReCaptcha).toHaveBeenCalled()
        expect(onSubmitMock).toHaveBeenCalledWith({
          email: auth.email.ok,
          captchaToken: null
        })
      })
    })
  })

  describe('Form Submission', () => {
    it('disables submit button and shows loading text during submission', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )
      const { submitButton } = renderForm(onSubmitMock)

      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(submitButton).toHaveTextContent(en.processing)

      await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
    })

    it('submits form with captcha token', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.alternative)
      const onSubmitMock = jest.fn()
      const { submitButton } = renderForm(onSubmitMock)

      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          email: auth.email.ok,
          captchaToken: auth.captcha.alternative
        })
      })
    })

    it('prevents multiple submissions while form is processing', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 100))
      )
      const { submitButton } = renderForm(onSubmitMock)

      // Click multiple times quickly.
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1)
      })
    })

    it('generates fresh token on each submission', async () => {
      global.mockExecuteReCaptcha
        .mockResolvedValueOnce(auth.captcha.first)
        .mockResolvedValueOnce(auth.captcha.second)

      const onSubmitMock = jest.fn()
      const { submitButton } = renderForm(onSubmitMock)

      // First submission.
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          email: auth.email.ok,
          captchaToken: auth.captcha.first
        })
      })

      // Reset form state for second submission.
      onSubmitMock.mockClear()

      // Second submission.
      await user.click(submitButton)

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          email: auth.email.ok,
          captchaToken: auth.captcha.second
        })
      })

      // Verify reCAPTCHA was executed twice.
      expect(global.mockExecuteReCaptcha).toHaveBeenCalledTimes(2)
    })
  })

  describe('Loading States', () => {
    it('shows loading state when isLoading prop is true', () => {
      renderWithProviders(
        <EmailConfirmationForm
          onSubmit={jest.fn()}
          isLoading={true}
          userEmail={auth.email.ok}
        />
      )

      const submitButton = screen.getByRole('button', { name: en.processing })

      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveTextContent(en.processing)
    })

    it('shows normal state when isLoading prop is false', () => {
      const { submitButton } = renderForm(jest.fn(), false)

      expect(submitButton).toHaveTextContent(en.email.confirmation.cta)
      expect(submitButton).not.toBeDisabled()
    })

    it('prioritizes form submission state over isLoading prop', async () => {
      global.mockExecuteReCaptcha.mockResolvedValue(auth.captcha.valid)
      const onSubmitMock = jest.fn(
        () => new Promise(res => setTimeout(res, 1000))
      )
      const { submitButton } = renderForm(onSubmitMock, false)

      await user.click(submitButton)

      // Should show processing even if isLoading is false.
      expect(submitButton).toHaveTextContent(en.processing)
      expect(submitButton).toBeDisabled()

      await waitFor(() => expect(onSubmitMock).toHaveBeenCalled())
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
  })
})
