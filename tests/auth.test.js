import { expect, test } from '@playwright/test'
import fs from 'fs'
import { StatusCodes } from 'http-status-codes'

import { auth } from '../src/tests/data'
import { SELECTOR_PROFILE_DROPDOWN } from './constants'
import { createEmailProvider } from './email/provider'
import { extractVerificationLink, waitForEmail } from './email/utils'

const en = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf-8'))

const emailConfig = {
  apiKey: process.env.VITE_APP_MAILISK_API_KEY,
  namespace: process.env.VITE_APP_MAILISK_NAMESPACE,
  domain: `${process.env.VITE_APP_MAILISK_NAMESPACE}.mailisk.net`
}

const emailProvider = createEmailProvider({ apiKey: emailConfig.apiKey })

const fillSignupForm = async (
  page,
  { firstName, lastName, email, password },
  en
) => {
  await page.getByLabel(en.firstName.label).fill(firstName)
  await page.getByLabel(en.lastName.label).fill(lastName)
  await page.getByLabel(en.email.label).fill(email)
  await page.getByLabel(en.password.label).fill(password)
}

const fillLoginForm = async (page, { email, password }, en) => {
  await page.getByPlaceholder(en.email.placeholder).fill(email)
  await page
    .getByPlaceholder(en.password.placeholder.default, { exact: true })
    .fill(password)
}

const logOut = async (page, en) => {
  await page.getByRole('button', { name: SELECTOR_PROFILE_DROPDOWN }).click()
  await page.getByRole('button', { name: en.logout.noun }).click()
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

    await page.getByRole('button', { name: en.signUp }).click()

    await expect(page.getByText(en.firstName.error.required)).toBeVisible()
    await expect(page.getByLabel(en.firstName.label)).toHaveClass(
      /input__field--error/
    )

    // Last name is optional.
    await expect(page.getByText(en.lastName.error.required)).toHaveCount(0)
    await expect(page.getByLabel(en.lastName.label)).not.toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(en.email.error.required)).toBeVisible()
    await expect(page.getByLabel(en.email.label)).toHaveClass(
      /input__field--error/
    )

    await expect(page.getByText(en.password.error.required)).toBeVisible()
    await expect(page.getByLabel(en.password.label)).toHaveClass(
      /input__field--error/
    )
  })

  // This test requires seed data with admin@example.com.
  test('signup: prevents duplicate email registration', async ({ page }) => {
    await page.goto('/signup')

    await fillSignupForm(
      page,
      {
        firstName: auth.firstName.ok,
        lastName: auth.lastName.ok,
        email: auth.email.admin,
        password: auth.password.strong
      },
      en
    )

    await page.getByRole('button', { name: en.signUp }).click()

    await page.waitForResponse(
      response =>
        response.url().includes('/api/v1/auth/signup') &&
        response.status() === StatusCodes.CONFLICT
    )

    const errorMessage = page.getByText(en.backend['auth/email-already-in-use'])

    await expect(errorMessage).toBeVisible()
  })

  /**
   * Docs used:
   * - https://mailisk.com/blog/email-verification-playwright
   */
  test('signup: creates account and verifies email', async ({ page }) => {
    await page.goto('/signup')

    await fillSignupForm(
      page,
      {
        firstName: auth.firstName.ok,
        lastName: auth.lastName.ok,
        email: userCredentials.email,
        password: userCredentials.initialPassword
      },
      en
    )

    await page.getByRole('button', { name: en.signUp }).click()

    await page.waitForResponse(
      response =>
        response.url().includes('/api/v1/auth/signup') &&
        response.status() === StatusCodes.CREATED
    )

    await page.waitForURL(/email-confirmation/)

    await expect(
      page.getByRole('heading', { name: en.email.confirmation.title })
    ).toBeVisible()

    await expect(
      page.getByText(
        en.email.confirmation.description.replace(
          '{{email}}',
          userCredentials.email
        )
      )
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: en.email.confirmation.cta })
    ).toBeVisible()

    // Even if we navigate to the root.
    await page.goto('/')
    // The email confirmation page should be shown again.
    await expect(page).toHaveURL(/email-confirmation/)
    await expect(
      page.getByRole('heading', { name: en.email.confirmation.title })
    ).toBeVisible()

    const subject = 'Welcome to The Company'
    const email = await waitForEmail(
      emailProvider,
      emailConfig.namespace,
      userCredentials.email,
      subject
    )

    const link = extractVerificationLink(email.text)

    expect(link).toBeTruthy()

    await page.goto(link)

    await page.waitForResponse(
      response =>
        response.url().includes('/api/v1/protected/me') &&
        response.status() === StatusCodes.OK
    )

    // After verification, user is redirected to home.
    await page.waitForURL('/home')

    // TODO: Check toast.

    await expect(page.getByText(auth.firstName.ok)).toBeVisible()

    // Logout to ensure clean state for next test.
    await logOut(page, en)
  })

  test('login: validates email format', async ({ page }) => {
    await page.goto('/login')

    const testCases = [
      {
        email: auth.email.empty,
        expectedError: en.email.error.required
      },
      {
        email: auth.email.invalid,
        expectedError: en.email.error.format
      },
      {
        email: auth.email.noAt,
        expectedError: en.email.error.format
      },
      {
        email: auth.email.noTld,
        expectedError: en.email.error.format
      }
    ]

    for (const testCase of testCases) {
      await page.reload()

      await fillLoginForm(
        page,
        {
          email: testCase.email,
          password: auth.password.strong
        },
        en
      )

      await page.getByRole('button', { name: en.login.verb }).click()

      await expect(page.getByText(testCase.expectedError)).toBeVisible()
      await expect(page.getByPlaceholder(en.email.placeholder)).toHaveClass(
        /input__field--error/
      )
    }
  })

  test('login: validates password requirements', async ({ page }) => {
    await page.goto('/login')

    const testCases = [
      {
        password: auth.password.empty,
        expectedError: en.password.error.required
      },
      {
        password: auth.password.short,
        expectedError: en.password.error.min
      },
      {
        password: auth.password.noLetter,
        expectedError: en.password.error.strong
      }
    ]

    for (const testCase of testCases) {
      await page.reload()

      await fillLoginForm(
        page,
        {
          email: auth.email.ok,
          password: testCase.password
        },
        en
      )

      await page.getByRole('button', { name: en.login.verb }).click()

      await expect(page.getByText(testCase.expectedError)).toBeVisible()
      await expect(
        page.getByPlaceholder(en.password.placeholder.default)
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

      await fillLoginForm(
        page,
        {
          email: testCase.email,
          password: testCase.password
        },
        en
      )

      await page.getByRole('button', { name: en.login.verb }).click()

      await page.waitForResponse(
        response =>
          response.url().includes('/api/v1/auth/login') &&
          response.status() === StatusCodes.UNAUTHORIZED
      )

      const errorMessage = page.getByText(
        en.backend['auth/invalid-credentials']
      )

      await expect(errorMessage).toBeVisible()
    }
  })

  test('login: authenticates with valid credentials', async ({ page }) => {
    await page.goto('/login')

    await fillLoginForm(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.initialPassword
      },
      en
    )

    await page.getByRole('button', { name: en.login.verb }).click()

    await page.waitForResponse(
      response =>
        response.url().includes('/api/v1/auth/login') &&
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
    await logOut(page, en)
  })
})
