import { expect, test } from '@playwright/test'

import { HttpStatus } from '../src/lib/net'
import {
  ACCEPT_INVITE_PATH,
  LOGIN_PATH,
  OWNER_ADMINS_INVITE_PATH,
  OWNER_ADMINS_PATH
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

const ownerCredentials = {
  email: 'slava.owner@smela.com',
  password: 'Passw0rd!'
}

const fillLoginFormAndSubmit = async (page, { email, password }) => {
  const emailInput = page.getByLabel(t.email.label)
  const passwordInput = page.getByRole('textbox', {
    name: t.password.label.default
  })
  const loginButton = page.getByRole('button', { name: t.login.verb })

  await emailInput.fill(email)
  await passwordInput.fill(password)
  await loginButton.click()
}

const logOut = async page => {
  await page.getByRole('button', { name: 'Profile menu' }).click()
  await page.getByRole('menuitem', { name: t.logout.noun }).click()
  await page.waitForURL('/login')
}

const fillAcceptInviteFormAndSubmit = async (page, password) => {
  const passwordInput = page.getByRole('textbox', {
    name: t.password.label.default
  })

  await passwordInput.fill(password)
  await page.getByRole('button', { name: t.invitation.accept.cta }).click()
}

test.describe.serial('Owner Admin Invitation', () => {
  const invitedAdmin = {
    firstName: 'InvitedAdmin',
    lastName: 'Test',
    email: auth.email.generate({
      prefix: 'invited-admin',
      domain: emailConfig.domain
    }),
    password: auth.password.strong
  }

  test('owner invites admin via modal form', async ({ page }) => {
    await page.goto('/login')

    let apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(page, ownerCredentials)
    await apiPromise

    apiPromise = waitForApiCall(page, {
      path: OWNER_ADMINS_PATH,
      status: HttpStatus.OK
    })

    await page.goto('/owner/admins')
    await apiPromise

    // Click Invite button to open modal
    await page.getByRole('button', { name: t.invite }).click()

    // Verify modal is visible
    await expect(
      page.getByRole('heading', { name: t.invitation.send.title.admin })
    ).toBeVisible()

    // Fill invitation form
    await page.getByLabel(t.firstName.label).fill(invitedAdmin.firstName)
    await page.getByLabel(t.lastName.label).fill(invitedAdmin.lastName)
    await page.getByLabel(t.email.label).fill(invitedAdmin.email)

    // Submit invitation
    const apiPromises = waitForApiCalls(page, [
      { path: OWNER_ADMINS_INVITE_PATH, status: HttpStatus.CREATED },
      { path: OWNER_ADMINS_PATH, status: HttpStatus.OK }
    ])

    await page.getByRole('button', { name: t.invitation.send.cta }).click()
    await apiPromises

    // Verify success toast
    await expect(page.getByText(t.invitation.send.success)).toBeVisible()

    // Verify admin appears in table with Pending status
    const adminRow = page.getByRole('row', {
      name: new RegExp(invitedAdmin.email)
    })

    await expect(adminRow).toBeVisible()
    await expect(adminRow.getByText(t.status.values.pending)).toBeVisible()

    await logOut(page)
  })

  test('invited admin accepts invitation via email link', async ({ page }) => {
    const { link } = await emailService.waitForInvitationEmail(
      invitedAdmin.email
    )

    expect(link).toContain('/accept-invite?token=')

    await page.goto(link)

    // Verify page title
    await expect(
      page.getByText(
        t.invitation.accept.title.replace('{{companyName}}', t.companyName)
      )
    ).toBeVisible()

    const apiPromise = waitForApiCall(page, {
      path: ACCEPT_INVITE_PATH,
      status: HttpStatus.OK
    })

    await fillAcceptInviteFormAndSubmit(page, invitedAdmin.password)
    await apiPromise

    // Verify success toast
    await expect(page.getByText(t.invitation.accept.success)).toBeVisible()

    // After accepting, user is redirected to home/dashboard
    await page.waitForURL(/\/(home|admin)/)

    await logOut(page)
  })

  test('owner verifies admin status changed to active', async ({ page }) => {
    await page.goto('/login')

    let apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(page, ownerCredentials)
    await apiPromise

    apiPromise = waitForApiCall(page, {
      path: OWNER_ADMINS_PATH,
      status: HttpStatus.OK
    })

    await page.goto('/owner/admins')
    await apiPromise

    // Find the invited admin row and verify status is Active
    const adminRow = page.getByRole('row', {
      name: new RegExp(invitedAdmin.email)
    })

    await expect(adminRow).toBeVisible()
    await expect(adminRow.getByText(t.status.values.active)).toBeVisible()

    await logOut(page)
  })
})
