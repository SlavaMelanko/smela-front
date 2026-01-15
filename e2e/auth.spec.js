import { expect, test } from '@playwright/test'

import { HttpStatus } from '../src/lib/net'
import { Role, UserStatus } from '../src/lib/types'
import {
  LOGIN_PATH,
  ME_PATH,
  REQUEST_PASSWORD_RESET_PATH,
  RESEND_VERIFICATION_EMAIL_PATH,
  RESET_PASSWORD_PATH,
  SIGNUP_PATH,
  VERIFY_EMAIL_PATH
} from '../src/services/backend/paths'
import { auth } from '../src/tests/data'
import {
  emailConfig,
  EmailService,
  loadTranslations,
  waitForApiCall,
  waitForApiCalls
} from './helpers'

const t = loadTranslations()

const emailService = new EmailService()

const fillSignupFormAndSubmit = async (
  page,
  { firstName, lastName, email, password },
  t
) => {
  const firstNameInput = page.getByLabel(t.firstName.label)
  const lastNameInput = page.getByLabel(t.lastName.label)
  const emailInput = page.getByLabel(t.email.label)
  const passwordInput = page
    .getByLabel(t.password.label.default)
    .locator('input')
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
  const emailInput = page.getByLabel(t.email.label)
  const passwordInput = page
    .getByLabel(t.password.label.default)
    .locator('input')
  const loginButton = page.getByRole('button', { name: t.login.verb })

  await emailInput.fill(email)
  await passwordInput.fill(password)
  await loginButton.click()

  return { emailInput, passwordInput, submitButton: loginButton }
}

const fillRequestPasswordResetFormAndSubmit = async (page, email, t) => {
  await page.getByLabel(t.email.label).fill(email)

  await page.getByRole('button', { name: t.password.reset.request.cta }).click()
}

const fillNewPasswordFormAndSubmit = async (page, newPassword, t) => {
  await page.getByLabel(t.password.label.new).locator('input').fill(newPassword)
  await page.getByRole('button', { name: t.password.reset.set.cta }).click()
}

const logOut = async (page, t) => {
  await page.getByRole('button', { name: 'Profile menu' }).click()
  await page.getByRole('menuitem', { name: t.logout.noun }).click()
  await page.waitForURL('/login')
}

test.describe.serial('Authentication', () => {
  // Credentials for a user created during the signup test.
  // Subsequent tests (login, password reset, logout) depend on this user.
  // Running individual tests that use these credentials will fail.
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
        { firstName: '', lastName: '', email: '', password: '' },
        t
      )

    await expect(page.getByText(t.firstName.error.required)).toBeVisible()
    await expect(firstNameInput).toHaveClass(/border-destructive/)

    // Last name is optional
    await expect(page.getByText(t.lastName.error.required)).toHaveCount(0)
    await expect(lastNameInput).not.toHaveClass(/border-destructive/)

    await expect(page.getByText(t.email.error.required)).toBeVisible()
    await expect(emailInput).toHaveClass(/border-destructive/)

    await expect(page.getByText(t.password.error.required)).toBeVisible()
    await expect(passwordInput).toHaveClass(/border-destructive/)
  })

  // This test requires a pre-registered admin account
  test('signup: prevents duplicate email registration', async ({ page }) => {
    await page.goto('/signup')

    const apiPromise = waitForApiCall(page, {
      path: SIGNUP_PATH,
      status: HttpStatus.CONFLICT
    })

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

    await apiPromise

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

    let apiPromise = waitForApiCall(page, {
      path: SIGNUP_PATH,
      status: HttpStatus.CREATED,
      validateRequest: body => {
        try {
          signupCaptchaToken = body.captcha?.token

          return !!signupCaptchaToken
        } catch {
          return false
        }
      },
      validateResponse: body => {
        if (!body.user || !body.accessToken) {
          return false
        }

        const { id, firstName, lastName, email, status, role } = body.user

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

    await apiPromise

    await page.waitForURL(/email-confirmation/)

    await expect(
      page.getByRole('heading', { name: t.email.confirmation.title })
    ).toBeVisible()

    await expect(
      page.getByText(t.email.confirmation.description.start)
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: t.email.confirmation.cta })
    ).toBeVisible()

    const { link: firstLink } =
      await emailService.waitForVerificationEmail(testEmail)

    expect(firstLink).toBeTruthy()

    const firstToken = new URL(firstLink).searchParams.get('token')

    let resendCaptchaToken = null

    apiPromise = waitForApiCall(page, {
      path: RESEND_VERIFICATION_EMAIL_PATH,
      status: HttpStatus.ACCEPTED,
      validateRequest: b => {
        try {
          resendCaptchaToken = b.captcha?.token

          return !!resendCaptchaToken
        } catch {
          return false
        }
      },
      validateResponse: b => b?.success === true
    })

    await page.getByRole('button', { name: t.email.confirmation.cta }).click()
    await apiPromise

    await expect(page.getByText(t.email.confirmation.success)).toBeVisible()

    const { link: secondLink } =
      await emailService.waitForVerificationEmail(testEmail)

    expect(secondLink).toBeTruthy()

    const secondToken = new URL(secondLink).searchParams.get('token')

    // Verify secure tokens differ between responses
    expect(firstToken).not.toBe(secondToken)

    // Verify reCAPTCHA tokens are different between requests
    expect(signupCaptchaToken).not.toBe(resendCaptchaToken)

    // Even if we navigate to the root
    await page.goto('/')
    // The email confirmation page should be shown again
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

    const apiPromise = waitForApiCall(page, {
      path: SIGNUP_PATH,
      status: HttpStatus.CREATED
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

    await apiPromise

    await page.waitForURL(/email-confirmation/)

    const { link } = await emailService.waitForVerificationEmail(testEmail)

    expect(link).toBeTruthy()

    const url = new URL(link)
    const originalToken = url.searchParams.get('token')

    // 1: Empty token
    await page.goto(`${url.origin}${url.pathname}?token=`)
    // No API call is made for empty token - frontend handles it

    await expect(page.getByText(t.backend['validation/error'])).toBeVisible()

    // 2: Malformed token (replace last char with underscore)
    const malformedToken = originalToken.slice(0, -1) + '_'

    // Start listening BEFORE navigation to catch fast responses
    let apiPromises = waitForApiCalls(page, [
      { path: ME_PATH, method: 'GET', status: HttpStatus.OK },
      {
        path: VERIFY_EMAIL_PATH,
        method: 'POST',
        status: HttpStatus.BAD_REQUEST
      }
    ])

    await page.goto(`${url.origin}${url.pathname}?token=${malformedToken}`)
    await apiPromises

    await expect(page.getByText(t.backend['token/not-found'])).toBeVisible()

    // 3: Invalid token (completely wrong token)
    apiPromises = waitForApiCalls(page, [
      { path: ME_PATH, status: HttpStatus.OK },
      { path: VERIFY_EMAIL_PATH, status: HttpStatus.BAD_REQUEST }
    ])

    await page.goto(`${url.origin}${url.pathname}?token=invalid_token_12345`)
    await apiPromises

    await expect(page.getByText(t.backend['validation/error'])).toBeVisible()

    // User should remain on email confirmation page after invalid attempts
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

    const apiPromise = waitForApiCall(page, {
      path: SIGNUP_PATH,
      status: HttpStatus.CREATED,
      validateRequest: b => !!b.captcha?.token
    })

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

    await apiPromise

    await page.waitForURL(/email-confirmation/)

    const { link } = await emailService.waitForVerificationEmail(
      userCredentials.email
    )

    expect(link).toBeTruthy()

    // Start listening BEFORE navigation to catch fast responses
    const apiPromises = waitForApiCalls(page, [
      {
        path: ME_PATH,
        status: HttpStatus.OK,
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
        path: VERIFY_EMAIL_PATH,
        status: HttpStatus.OK,
        validateResponse: b => {
          if (!b.user || !b.accessToken) {
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

    await page.goto(link)
    await apiPromises

    // After verification, user is redirected to home
    await page.waitForURL('/home')

    await expect(page.getByText(t.email.verification.success)).toBeVisible()

    // Logout to ensure clean state for next test
    await logOut(page, t)
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

      const apiPromise = waitForApiCall(page, {
        path: LOGIN_PATH,
        status: HttpStatus.UNAUTHORIZED
      })

      const { emailInput, passwordInput } = await fillLoginFormAndSubmit(
        page,
        { email: testCase.email, password: testCase.password },
        t
      )

      await apiPromise

      const errorMessage = page.getByText(t.backend['auth/invalid-credentials'])

      await expect(errorMessage).toBeVisible()

      // Verify that form fields retain their values after error
      await expect(emailInput).toHaveValue(testCase.email)
      await expect(passwordInput).toHaveValue(testCase.password)
    }
  })

  test('login: authenticates with valid credentials and redirects to home', async ({
    page
  }) => {
    await page.goto('/login')

    const apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.initialPassword
      },
      t
    )

    await apiPromise

    await page.waitForURL('/home')

    // Logout to ensure clean state for next test
    await logOut(page, t)
  })

  test('login: redirects authenticated users from auth pages', async ({
    page
  }) => {
    // First, authenticate the user
    await page.goto('/login')

    const apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.initialPassword
      },
      t
    )

    await apiPromise

    await page.waitForURL('/home')

    // Verify authenticated users cannot access /login
    await page.goto('/login')
    await page.waitForURL('/home')
    await expect(page).toHaveURL(/\/home/)

    // Verify authenticated users cannot access /signup
    await page.goto('/signup')
    await page.waitForURL('/home')
    await expect(page).toHaveURL(/\/home/)

    // Verify authenticated users cannot access /verify-email
    await page.goto('/verify-email?token=sample_token_12345')
    await page.waitForURL('/home')
    await expect(page).toHaveURL(/\/home/)

    // Logout to ensure clean state for next test
    await logOut(page, t)
  })

  test('password reset: resets password and auto-login', async ({ page }) => {
    await page.goto('/reset-password')

    await expect(
      page.getByText(t.password.reset.request.description)
    ).toBeVisible()

    let apiPromise = waitForApiCall(page, {
      path: REQUEST_PASSWORD_RESET_PATH,
      status: HttpStatus.ACCEPTED,
      validateRequest: b => !!b.captcha?.token
    })

    await fillRequestPasswordResetFormAndSubmit(page, userCredentials.email, t)
    await apiPromise

    await expect(page.getByText(t.password.reset.request.success)).toBeVisible()

    const { link } = await emailService.waitForResetPasswordEmail(
      userCredentials.email
    )

    expect(link).toBeTruthy()

    await page.goto(link)

    await expect(page.getByText(t.password.reset.set.description)).toBeVisible()

    apiPromise = waitForApiCall(page, {
      path: RESET_PASSWORD_PATH,
      status: HttpStatus.OK
    })

    await fillNewPasswordFormAndSubmit(page, userCredentials.newPassword, t)
    await apiPromise

    await expect(page.getByText(t.password.reset.set.success)).toBeVisible()

    // Auto-login redirects to home
    await page.waitForURL('/home')

    // Logout to ensure clean state
    await logOut(page, t)
  })

  test('authorization: shows 404 for unauthorized and unknown routes', async ({
    page
  }) => {
    await page.goto('/login')

    const apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.newPassword
      },
      t
    )

    await apiPromise

    await page.waitForURL('/home')

    const unauthorizedPaths = ['/unknown', '/admin/users', '/owner/admins']

    for (const path of unauthorizedPaths) {
      await page.goto(path)

      await expect(page).toHaveURL(path)
      await expect(page.getByTestId('not-found-error-page')).toBeVisible()

      await page.getByRole('button', { name: t.error.notFound.cta }).click()
      await page.waitForURL('/home')
    }

    await logOut(page, t)
  })

  test('logout: syncs authentication state across tabs', async ({
    page,
    context
  }) => {
    // Step 1: Login in first tab and verify home page
    await page.goto('/login')

    const apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(
      page,
      {
        email: userCredentials.email,
        password: userCredentials.newPassword // password reset test changes the password
      },
      t
    )

    await apiPromise

    await page.waitForURL('/home')

    // Step 2: Open second tab and navigate to home - should see same page
    const secondTab = await context.newPage()

    await secondTab.goto('/home')

    // Step 3: Logout in first tab - should see login page
    await logOut(page, t)

    await expect(page).toHaveURL(/\/login/)

    // Step 4: Refresh second tab - should redirect to login
    await secondTab.reload()

    await secondTab.waitForURL('/login')

    await expect(secondTab).toHaveURL(/\/login/)

    await secondTab.close()
  })
})
