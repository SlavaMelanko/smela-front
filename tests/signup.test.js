import { expect, test } from '@playwright/test'
import fs from 'fs'

import { createEmailProvider } from './email/provider'
import {
  extractResetPasswordLink,
  extractVerificationLink,
  fillForm,
  goTo,
  logout,
  passCaptcha,
  waitForVerificationEmail
} from './email/utils'

const en = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf-8'))

const namespace = process.env.VITE_APP_MAILISK_NAMESPACE
const apiKey = process.env.VITE_APP_MAILISK_API_KEY

const emailProvider = createEmailProvider({ apiKey })

test.describe('Signup', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, '/signup')
  })

  test('shows validation errors when form is submitted empty', async ({
    page
  }) => {
    await page.getByRole('button', { name: en.signUp }).click()

    await expect(page.getByText(en.firstName.error.required)).toBeVisible()
    await expect(page.getByLabel(en.firstName.label)).toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(en.lastName.error.required)).toHaveCount(0)
    await expect(page.getByLabel(en.lastName.label)).not.toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(en.email.error.required)).toBeVisible()
    await expect(page.getByLabel(en.email.label)).toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(en.password.error.required)).toBeVisible()
    await expect(
      page.getByLabel(en.password.label, { exact: true })
    ).toHaveClass(/input__field--error/)
  })

  test('successfully signs up and shows email confirmation screen', async ({
    page
  }) => {
    await fillForm(
      page,
      {
        firstName: 'John',
        lastName: 'Doe',
        email: `john${Date.now()}@example.com`,
        password: 'Password123!'
      },
      en
    )

    await page.getByRole('button', { name: en.signUp }).click()

    await page.waitForURL(/email-confirmation/)
    await expect(
      page.getByRole('heading', { name: en.email.confirmation.title })
    ).toBeVisible()

    // Even if we navigate to the root,
    await goTo(page, '/')
    // the email confirmation page should be shown again
    await expect(
      page.getByRole('heading', { name: en.email.confirmation.title })
    ).toBeVisible()
  })

  // This test assumes that `admin@example.com` is already registered.
  test('prevents signup if email is already registered', async ({ page }) => {
    await fillForm(
      page,
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@example.com',
        password: 'Password123!'
      },
      en
    )

    await page.getByRole('button', { name: en.signUp }).click()

    const errorMessage = page.getByText(en.backend['auth/email-already-in-use'])

    await expect(errorMessage).toBeVisible()
  })

  /**
   * Docs used:
   * - https://mailisk.com/blog/email-verification-playwright
   */
  test('completes signup and verifies email via Mailisk', async ({ page }) => {
    const testEmail = `test.${Date.now()}@${namespace}.mailisk.net`
    const newPassword = `Password123!`

    await fillForm(
      page,
      {
        firstName: 'Test',
        lastName: 'User',
        email: testEmail,
        password: newPassword
      },
      en
    )

    await page.getByRole('button', { name: en.signUp }).click()
    await page.waitForURL(/email-confirmation/)

    // TODO: subject to separate var
    const email = await waitForVerificationEmail(
      emailProvider,
      namespace,
      testEmail,
      'Verify your email'
    )

    const link = extractVerificationLink(email.text)

    expect(link).toBeTruthy()

    await page.goto(link)

    await expect(page.getByText(en.email.verification.success)).toBeVisible()

    await page.waitForURL('/home')

    await logout(page, en)

    await page.getByPlaceholder(en.email.placeholder).fill(testEmail)
    await page
      .getByPlaceholder(en.password.placeholder.default, { exact: true })
      .fill(newPassword)

    await page.getByRole('button', { name: en.login.verb }).click()
    await page.waitForURL('/home')
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()
  })
})

test.describe('Password Reset', () => {
  test('completes password reset via email and logs in with new password', async ({
    page
  }) => {
    const testEmail = `reset.${Date.now()}@${namespace}.mailisk.net`
    const newPassword = `NewPassword${Date.now()}`

    await goTo(page, '/signup')
    await fillForm(
      page,
      {
        firstName: 'Reset',
        lastName: 'User',
        email: testEmail,
        password: 'Password123!'
      },
      en
    )

    await page.getByRole('button', { name: en.signUp }).click()
    await page.waitForURL(/email-confirmation/)

    const verifyEmail = await waitForVerificationEmail(
      emailProvider,
      namespace,
      testEmail,
      'Verify your email'
    )

    const verifyLink = extractVerificationLink(verifyEmail.text)

    expect(verifyLink).toBeTruthy()

    await page.goto(verifyLink)

    await page.waitForURL('/home')
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()

    await logout(page, en)

    await goTo(page, '/reset-password')
    await expect(
      page.getByText(en.password.reset.request.description)
    ).toBeVisible()

    await expect(page.getByPlaceholder(en.email.example)).toBeVisible()
    await page.getByPlaceholder(en.email.example).fill(testEmail)

    await passCaptcha(page)

    const submitButton = page.getByRole('button', {
      name: en.password.reset.request.cta
    })

    await expect(submitButton).toBeEnabled()
    await submitButton.click()

    const resetEmail = await waitForVerificationEmail(
      emailProvider,
      namespace,
      testEmail,
      'Reset your password'
    )
    const resetLink = extractResetPasswordLink(resetEmail.text)

    expect(resetLink).toBeTruthy()

    await page.goto(resetLink)

    await expect(
      page.getByPlaceholder(en.password.placeholder.new, { exact: true })
    ).toBeVisible()

    await page
      .getByPlaceholder(en.password.placeholder.new, { exact: true })
      .fill(newPassword)

    await page.getByRole('button', { name: en.password.reset.set.cta }).click()

    await page.waitForURL('/login')

    await expect(page.getByText(en.password.reset.set.success)).toBeVisible()

    await page.getByPlaceholder(en.email.placeholder).fill(testEmail)
    await page
      .getByPlaceholder(en.password.placeholder.default, { exact: true })
      .fill(newPassword)

    await page.getByRole('button', { name: en.login.verb }).click()
    await page.waitForURL('/home')
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()
  })
})
