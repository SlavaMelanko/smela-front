import { expect, test } from '@playwright/test'
import fs from 'fs'
import { StatusCodes } from 'http-status-codes'

import { path } from '../src/services/backend/paths'
import { auth } from '../src/tests/data'
import { emailConfig, EmailService, passCaptcha } from './helpers'

const t = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf-8'))

const emailService = new EmailService()

const fillSignupFormAndSubmit = async (
  page,
  { firstName, lastName, email, password },
  t
) => {
  await page.getByLabel(t.firstName.label).fill(firstName)
  await page.getByLabel(t.lastName.label).fill(lastName)
  await page.getByLabel(t.email.label).fill(email)
  await page.getByLabel(t.password.label).fill(password)

  await page.getByRole('button', { name: t.signUp }).click()
}

const fillLoginFormAndSubmit = async (page, { email, password }, t) => {
  await page.getByPlaceholder(t.email.placeholder).fill(email)
  await page.getByPlaceholder(t.password.placeholder.default).fill(password)

  await page.getByRole('button', { name: t.login.verb }).click()
}

const fillRequestPasswordResetFormAndSubmit = async (page, email, t) => {
  await page.getByPlaceholder(t.email.example).fill(email)

  await passCaptcha(page)

  await page.getByRole('button', { name: t.password.reset.request.cta }).click()
}

const fillNewPasswordFormAndSubmit = async (page, newPassword, t) => {
  await page.getByPlaceholder(t.password.placeholder.new).fill(newPassword)
  await page.getByRole('button', { name: t.password.reset.set.cta }).click()
}

const logOut = async (page, t) => {
  const selector = 'Profile dropdown'

  await page.getByRole('button', { name: selector }).click()
  await page.getByRole('button', { name: t.logout.noun }).click()
  await page.waitForURL('/login')
}

test.describe.serial('Authentication', () => {
  const userCredentials = {
    email: auth.email.generate({
      prefix: 'test',
      domain: emailConfig.domain
    }),
    initialPassword: auth.password.strong,
    newPassword: auth.password.withSpecialChars
  }

  test('signup: validates required fields', async ({ page }) => {
    await page.goto('/signup')

    await page.getByRole('button', { name: t.signUp }).click()

    await expect(page.getByText(t.firstName.error.required)).toBeVisible()
    await expect(page.getByLabel(t.firstName.label)).toHaveClass(
      /input__field--error/
    )

    // Last name is optional.
    await expect(page.getByText(t.lastName.error.required)).toHaveCount(0)
    await expect(page.getByLabel(t.lastName.label)).not.toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(t.email.error.required)).toBeVisible()
    await expect(page.getByLabel(t.email.label)).toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(t.password.error.required)).toBeVisible()
    await expect(page.getByLabel(t.password.label)).toHaveClass(
      /input__field--error/
    )
  })

  // This test requires seed data with admin@example.com.
  test('signup: prevents duplicate email registration', async ({ page }) => {
    await page.goto('/signup')

    await fillSignupFormAndSubmit(
      page,
      {
        firstName: auth.firstName.ok,
        lastName: auth.lastName.ok,
        email: auth.email.admin,
        password: auth.password.strong
      },
      t
    )

    await page.waitForResponse(
      response =>
        response.url().includes(path.SIGNUP) &&
        response.status() === StatusCodes.CONFLICT
    )

    const errorMessage = page.getByText(t.backend['auth/email-already-in-use'])

    await expect(errorMessage).toBeVisible()
  })

  test('signup: resend verification email', async ({ page }) => {
    await page.goto('/signup')

    const testEmail = auth.email.generate({
      prefix: 'resend-test',
      domain: emailConfig.domain
    })

    await fillSignupFormAndSubmit(
      page,
      {
        firstName: auth.firstName.ok,
        lastName: auth.lastName.ok,
        email: testEmail,
        password: auth.password.strong
      },
      t
    )

    await page.waitForResponse(
      response =>
        response.url().includes(path.SIGNUP) &&
        response.status() === StatusCodes.CREATED
    )

    await page.waitForURL(/email-confirmation/)

    await expect(
      page.getByRole('heading', { name: t.email.confirmation.title })
    ).toBeVisible()

    await expect(
      page.getByText(
        t.email.confirmation.description.replace('{{email}}', testEmail)
      )
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: t.email.confirmation.cta })
    ).toBeVisible()

    const { link: firstLink } =
      await emailService.waitForVerificationEmail(testEmail)

    expect(firstLink).toBeTruthy()

    const firstToken = new URL(firstLink).searchParams.get('token')

    await passCaptcha(page)

    await page.getByRole('button', { name: t.email.confirmation.cta }).click()

    await page.waitForResponse(
      response =>
        response.url().includes(path.RESEND_VERIFICATION_EMAIL) &&
        response.status() === StatusCodes.ACCEPTED
    )

    await expect(page.getByText(t.email.confirmation.success)).toBeVisible()

    // Wait for the second verification email.
    // Add a small delay to ensure new email arrives.
    await page.waitForTimeout(5000)
    const { link: secondLink } =
      await emailService.waitForVerificationEmail(testEmail)

    expect(secondLink).toBeTruthy()

    const secondToken = new URL(secondLink).searchParams.get('token')

    expect(firstToken).not.toBe(secondToken)

    // Even if we navigate to the root.
    await page.goto('/')
    // The email confirmation page should be shown again.
    await expect(page).toHaveURL(/email-confirmation/)
    await expect(
      page.getByRole('heading', { name: t.email.confirmation.title })
    ).toBeVisible()
  })

  /**
   * Docs used:
   * - https://mailisk.com/blog/email-verification-playwright
   */
  test('signup: creates account and verifies email', async ({ page }) => {
    await page.goto('/signup')

    await fillSignupFormAndSubmit(
      page,
      {
        firstName: auth.firstName.ok,
        lastName: auth.lastName.ok,
        email: userCredentials.email,
        password: userCredentials.initialPassword
      },
      t
    )

    await page.waitForResponse(
      response =>
        response.url().includes(path.SIGNUP) &&
        response.status() === StatusCodes.CREATED
    )

    await page.waitForURL(/email-confirmation/)

    const { link } = await emailService.waitForVerificationEmail(
      userCredentials.email
    )

    expect(link).toBeTruthy()

    await page.goto(link)

    await page.waitForResponse(
      response =>
        response.url().includes(path.ME) && response.status() === StatusCodes.OK
    )

    // After verification, user is redirected to home.
    await page.waitForURL('/home')

    // TODO: Check toast.

    await expect(page.getByText(auth.firstName.ok)).toBeVisible()

    // Logout to ensure clean state for next test.
    await logOut(page, t)
  })

  test('login: validates email format', async ({ page }) => {
    await page.goto('/login')

    const testCases = [
      {
        email: auth.email.empty,
        expectedError: t.email.error.required
      },
      {
        email: auth.email.invalid,
        expectedError: t.email.error.format
      },
      {
        email: auth.email.noAt,
        expectedError: t.email.error.format
      },
      {
        email: auth.email.noTld,
        expectedError: t.email.error.format
      }
    ]

    for (const testCase of testCases) {
      await page.reload()

      await fillLoginFormAndSubmit(
        page,
        {
          email: testCase.email,
          password: auth.password.strong
        },
        t
      )

      await expect(page.getByText(testCase.expectedError)).toBeVisible()
      await expect(page.getByPlaceholder(t.email.placeholder)).toHaveClass(
        /input__field--error/
      )
    }
  })

  test('login: validates password requirements', async ({ page }) => {
    await page.goto('/login')

    const testCases = [
      {
        password: auth.password.empty,
        expectedError: t.password.error.required
      },
      {
        password: auth.password.short,
        expectedError: t.password.error.min
      },
      {
        password: auth.password.noLetter,
        expectedError: t.password.error.strong
      }
    ]

    for (const testCase of testCases) {
      await page.reload()

      await fillLoginFormAndSubmit(
        page,
        {
          email: auth.email.ok,
          password: testCase.password
        },
        t
      )

      await expect(page.getByText(testCase.expectedError)).toBeVisible()
      await expect(
        page.getByPlaceholder(t.password.placeholder.default)
      ).toHaveClass(/input__field--error/)
    }
  })

  test('login: shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login')

    const testCases = [
      {
        email: userCredentials.email,
        password: auth.password.mismatch
      },
      {
        email: 'nonexistent@example.com',
        password: auth.password.strong
      }
    ]

    for (const testCase of testCases) {
      await page.reload()

      await fillLoginFormAndSubmit(
        page,
        {
          email: testCase.email,
          password: testCase.password
        },
        t
      )

      await page.waitForResponse(
        response =>
          response.url().includes(path.LOGIN) &&
          response.status() === StatusCodes.UNAUTHORIZED
      )

      const errorMessage = page.getByText(t.backend['auth/invalid-credentials'])

      await expect(errorMessage).toBeVisible()
    }
  })

  test('login: authenticates with valid credentials', async ({ page }) => {
    await page.goto('/login')

    await fillLoginFormAndSubmit(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.initialPassword
      },
      t
    )

    await page.waitForResponse(
      response =>
        response.url().includes(path.LOGIN) &&
        response.status() === StatusCodes.OK
    )

    await page.waitForURL('/home')

    await expect(page.getByText(auth.firstName.ok)).toBeVisible()

    // Check that authenticated users are redirected from /login.
    await page.goto('/login')
    await page.waitForURL('/home')
    await expect(page).toHaveURL(/\/home/)

    // Check that authenticated users are redirected from /signup.
    await page.goto('/signup')
    await page.waitForURL('/home')
    await expect(page).toHaveURL(/\/home/)

    // Logout to ensure clean state for next test.
    await logOut(page, t)
  })

  test('password reset: resets password and allows login', async ({ page }) => {
    await page.goto('/reset-password')

    await expect(
      page.getByText(t.password.reset.request.description)
    ).toBeVisible()

    await fillRequestPasswordResetFormAndSubmit(page, userCredentials.email, t)

    await page.waitForResponse(
      response =>
        response.url().includes(path.REQUEST_PASSWORD_RESET) &&
        response.status() === StatusCodes.ACCEPTED
    )

    await expect(page.getByText(t.password.reset.request.success)).toBeVisible()

    const { link } = await emailService.waitForResetPasswordEmail(
      userCredentials.email
    )

    expect(link).toBeTruthy()

    await page.goto(link)

    await expect(page.getByText(t.password.reset.set.description)).toBeVisible()

    await fillNewPasswordFormAndSubmit(page, userCredentials.newPassword, t)

    await page.waitForResponse(
      response =>
        response.url().includes(path.RESET_PASSWORD) &&
        response.status() === StatusCodes.OK
    )

    await expect(page.getByText(t.password.reset.set.success)).toBeVisible()

    await page.waitForURL('/login')

    await fillLoginFormAndSubmit(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.newPassword
      },
      t
    )

    await page.waitForResponse(
      response =>
        response.url().includes(path.LOGIN) &&
        response.status() === StatusCodes.OK
    )

    await page.waitForURL('/home')

    await expect(page.getByText(auth.firstName.ok)).toBeVisible()

    // Logout to ensure clean state.
    await logOut(page, t)
  })
})
