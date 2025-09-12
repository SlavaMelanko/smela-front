import { expect, test } from '@playwright/test'
import fs from 'fs'
import { StatusCodes } from 'http-status-codes'

import { Role, UserStatus } from '../src/lib/types'
import { path } from '../src/services/backend/paths'
import { auth } from '../src/tests/data'
import {
  emailConfig,
  EmailService,
  waitForApiCall,
  waitForApiCalls
} from './helpers'

const t = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf-8'))

const emailService = new EmailService()

const fillSignupFormAndSubmit = async (
  page,
  { firstName, lastName, email, password },
  t
) => {
  const firstNameInput = page.getByLabel(t.firstName.label)
  const lastNameInput = page.getByLabel(t.lastName.label)
  const emailInput = page.getByLabel(t.email.label)
  // Use specific locator to avoid matching the toggle visibility button.
  const passwordInput = page.locator('input[type="password"]')
  const signupButton = page.getByRole('button', { name: t.signUp })

  await firstNameInput.fill(firstName)
  await lastNameInput.fill(lastName)
  await emailInput.fill(email)
  await passwordInput.fill(password)
  await signupButton.click()

  return {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    signupButton
  }
}

const fillLoginFormAndSubmit = async (page, { email, password }, t) => {
  const emailInput = page.getByPlaceholder(t.email.placeholder)
  const passwordInput = page.getByPlaceholder(t.password.placeholder.default)
  const loginButton = page.getByRole('button', { name: t.login.verb })

  await emailInput.fill(email)
  await passwordInput.fill(password)
  await loginButton.click()

  return { emailInput, passwordInput, submitButton: loginButton }
}

const fillRequestPasswordResetFormAndSubmit = async (page, email, t) => {
  await page.getByPlaceholder(t.email.example).fill(email)

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

    const { firstNameInput, lastNameInput, emailInput, passwordInput } =
      await fillSignupFormAndSubmit(
        page,
        {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        t
      )

    await expect(page.getByText(t.firstName.error.required)).toBeVisible()
    await expect(firstNameInput).toHaveClass(/input__field--error/)

    // Last name is optional.
    await expect(page.getByText(t.lastName.error.required)).toHaveCount(0)
    await expect(lastNameInput).not.toHaveClass(/input__field--error/)

    await expect(page.getByText(t.email.error.required)).toBeVisible()
    await expect(emailInput).toHaveClass(/input__field--error/)

    await expect(page.getByText(t.password.error.required)).toBeVisible()
    await expect(passwordInput).toHaveClass(/input__field--error/)
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

    await waitForApiCall(page, {
      path: path.SIGNUP,
      status: StatusCodes.CONFLICT
    })

    const errorMessage = page.getByText(t.backend['auth/email-already-in-use'])

    await expect(errorMessage).toBeVisible()
  })

  test('signup: resend verification email', async ({ page }) => {
    await page.goto('/signup')

    const testEmail = auth.email.generate({
      prefix: 'resend-test',
      domain: emailConfig.domain
    })

    let signupCaptchaToken = null

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

    await waitForApiCall(page, {
      path: path.SIGNUP,
      status: StatusCodes.CREATED,
      validateRequest: b => {
        try {
          signupCaptchaToken = b.captchaToken

          return !!signupCaptchaToken
        } catch {
          return false
        }
      },
      validateResponse: b => {
        if (!b.user || !b.token) {
          return false
        }

        const { id, firstName, lastName, email, status, role } = b.user

        return (
          id > 0 &&
          firstName === auth.firstName.ok &&
          lastName === auth.lastName.ok &&
          email === testEmail &&
          status === UserStatus.NEW &&
          role === Role.USER
        )
      }
    })

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

    let resendCaptchaToken = null

    await page.getByRole('button', { name: t.email.confirmation.cta }).click()

    await waitForApiCall(page, {
      path: path.RESEND_VERIFICATION_EMAIL,
      status: StatusCodes.ACCEPTED,
      validateRequest: b => {
        try {
          resendCaptchaToken = b.captchaToken

          return !!resendCaptchaToken
        } catch {
          return false
        }
      },
      validateResponse: b => b?.success === true
    })

    await expect(page.getByText(t.email.confirmation.success)).toBeVisible()

    const { link: secondLink } =
      await emailService.waitForVerificationEmail(testEmail)

    expect(secondLink).toBeTruthy()

    const secondToken = new URL(secondLink).searchParams.get('token')

    // Verify secure tokens differ between responses.
    expect(firstToken).not.toBe(secondToken)

    // Verify reCAPTCHA tokens are different between requests.
    expect(signupCaptchaToken).not.toBe(resendCaptchaToken)

    // Even if we navigate to the root.
    await page.goto('/')
    // The email confirmation page should be shown again.
    await expect(page).toHaveURL(/email-confirmation/)
    await expect(
      page.getByRole('heading', { name: t.email.confirmation.title })
    ).toBeVisible()
  })

  test('signup: handles invalid verification link', async ({ page }) => {
    await page.goto('/signup')

    const testEmail = auth.email.generate({
      prefix: 'invalid-link-test',
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

    await waitForApiCall(page, {
      path: path.SIGNUP,
      status: StatusCodes.CREATED
    })

    await page.waitForURL(/email-confirmation/)

    const { link } = await emailService.waitForVerificationEmail(testEmail)

    expect(link).toBeTruthy()

    const url = new URL(link)
    const originalToken = url.searchParams.get('token')

    // 1: Empty token.
    await page.goto(`${url.origin}${url.pathname}?token=`)
    // No API call is made for empty token - frontend handles it.

    await expect(
      page.getByText(t.email.verification.error.invalidToken)
    ).toBeVisible()

    // 2: Malformed token (replace last char with underscore).
    const malformedToken = originalToken.slice(0, -1) + '_'

    await page.goto(`${url.origin}${url.pathname}?token=${malformedToken}`)

    await waitForApiCalls(page, [
      {
        path: path.ME,
        method: 'GET',
        status: StatusCodes.OK
      },
      {
        path: path.VERIFY_EMAIL,
        status: StatusCodes.BAD_REQUEST
      }
    ])

    await expect(page.getByText(t.backend['token/not-found'])).toBeVisible()

    // 3: Invalid token (completely wrong token).
    await page.goto(`${url.origin}${url.pathname}?token=invalid_token_12345`)

    await waitForApiCalls(page, [
      {
        path: path.ME,
        status: StatusCodes.OK
      },
      {
        path: path.VERIFY_EMAIL,
        status: StatusCodes.BAD_REQUEST
      }
    ])

    await expect(page.getByText(t.backend['validation/error'])).toBeVisible()

    // User should remain on email confirmation page after invalid attempts.
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

    await waitForApiCall(page, {
      path: path.SIGNUP,
      status: StatusCodes.CREATED,
      validateRequest: b => !!b.captchaToken
    })

    await page.waitForURL(/email-confirmation/)

    const { link } = await emailService.waitForVerificationEmail(
      userCredentials.email
    )

    expect(link).toBeTruthy()

    await page.goto(link)

    await waitForApiCalls(page, [
      {
        path: path.ME,
        status: StatusCodes.OK,
        validateResponse: b => {
          if (!b.user) {
            return false
          }

          const { id, firstName, lastName, email, status, role } = b.user

          return (
            id > 0 &&
            firstName === auth.firstName.ok &&
            lastName === auth.lastName.ok &&
            email === userCredentials.email &&
            status === UserStatus.NEW &&
            role === Role.USER
          )
        }
      },
      {
        path: path.VERIFY_EMAIL,
        status: StatusCodes.OK,
        validateResponse: b => {
          if (!b.user || !b.token) {
            return false
          }

          const { id, firstName, lastName, email, status, role } = b.user

          return (
            id > 0 &&
            firstName === auth.firstName.ok &&
            lastName === auth.lastName.ok &&
            email === userCredentials.email &&
            status === UserStatus.VERIFIED &&
            role === Role.USER
          )
        }
      },
      {
        path: path.ME,
        status: StatusCodes.OK,
        validateResponse: b => {
          if (!b.user) {
            return false
          }

          const { id, firstName, lastName, email, status, role } = b.user

          return (
            id > 0 &&
            firstName === auth.firstName.ok &&
            lastName === auth.lastName.ok &&
            email === userCredentials.email &&
            status === UserStatus.VERIFIED &&
            role === Role.USER
          )
        }
      }
    ])

    // After verification, user is redirected to home.
    await page.waitForURL('/home')

    await expect(page.getByText(t.email.verification.success)).toBeVisible()

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

      const { emailInput } = await fillLoginFormAndSubmit(
        page,
        {
          email: testCase.email,
          password: auth.password.strong
        },
        t
      )

      await expect(page.getByText(testCase.expectedError)).toBeVisible()
      await expect(emailInput).toHaveClass(/input__field--error/)
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

      const { passwordInput } = await fillLoginFormAndSubmit(
        page,
        {
          email: auth.email.ok,
          password: testCase.password
        },
        t
      )

      await expect(page.getByText(testCase.expectedError)).toBeVisible()
      await expect(passwordInput).toHaveClass(/input__field--error/)
    }
  })

  test('login: shows error with invalid credentials and preserves form data', async ({
    page
  }) => {
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

      const { emailInput, passwordInput } = await fillLoginFormAndSubmit(
        page,
        {
          email: testCase.email,
          password: testCase.password
        },
        t
      )

      await waitForApiCall(page, {
        path: path.LOGIN,
        status: StatusCodes.UNAUTHORIZED
      })

      const errorMessage = page.getByText(t.backend['auth/invalid-credentials'])

      await expect(errorMessage).toBeVisible()

      // Verify that form fields retain their values after error.
      await expect(emailInput).toHaveValue(testCase.email)
      await expect(passwordInput).toHaveValue(testCase.password)
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

    await waitForApiCall(page, {
      path: path.LOGIN,
      status: StatusCodes.OK
    })

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

    await waitForApiCall(page, {
      path: path.REQUEST_PASSWORD_RESET,
      status: StatusCodes.ACCEPTED,
      validateRequest: b => !!b.captchaToken
    })

    await expect(page.getByText(t.password.reset.request.success)).toBeVisible()

    const { link } = await emailService.waitForResetPasswordEmail(
      userCredentials.email
    )

    expect(link).toBeTruthy()

    await page.goto(link)

    await expect(page.getByText(t.password.reset.set.description)).toBeVisible()

    await fillNewPasswordFormAndSubmit(page, userCredentials.newPassword, t)

    await waitForApiCall(page, {
      path: path.RESET_PASSWORD,
      status: StatusCodes.OK
    })

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

    await waitForApiCall(page, {
      path: path.LOGIN,
      status: StatusCodes.OK
    })

    await page.waitForURL('/home')

    await expect(page.getByText(auth.firstName.ok)).toBeVisible()

    // Logout to ensure clean state.
    await logOut(page, t)
  })
})
