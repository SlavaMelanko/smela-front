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
  fillAcceptInviteFormAndSubmit,
  fillInvitationFormAndSubmit,
  fillLoginFormAndSubmit,
  loadTranslations,
  logOut,
  waitForApiCall,
  waitForApiCalls
} from './utils'

const t = loadTranslations()

const emailService = new EmailService()

const ownerCredentials = {
  email: process.env.VITE_E2E_OWNER_EMAIL,
  password: process.env.VITE_E2E_OWNER_PASSWORD
}

test.describe.serial('Owner Admin Invitation', () => {
  const newAdmin = {
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

    await fillLoginFormAndSubmit(page, ownerCredentials, t)
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

    const apiPromises = waitForApiCalls(page, [
      { path: OWNER_ADMINS_INVITE_PATH, status: HttpStatus.CREATED },
      { path: OWNER_ADMINS_PATH, status: HttpStatus.OK }
    ])

    await fillInvitationFormAndSubmit(page, newAdmin, t)
    await apiPromises

    // Verify success toast
    await expect(page.getByText(t.invitation.send.success)).toBeVisible()

    // Verify admin appears in table with Pending status
    const adminRow = page.getByRole('row', {
      name: new RegExp(newAdmin.email)
    })

    await expect(adminRow).toBeVisible()
    await expect(adminRow.getByText(t.status.values.pending)).toBeVisible()

    await logOut(page, t)
  })

  test('invited admin accepts invitation via email link', async ({ page }) => {
    const { link } = await emailService.waitForInvitationEmail(newAdmin.email)

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

    await fillAcceptInviteFormAndSubmit(page, newAdmin.password, t)
    await apiPromise

    // Verify success toast
    await expect(page.getByText(t.invitation.accept.success)).toBeVisible()

    await page.waitForURL('/admin/dashboard')

    await logOut(page, t)
  })

  test('owner verifies admin status changed to active', async ({ page }) => {
    await page.goto('/login')

    let apiPromise = waitForApiCall(page, {
      path: LOGIN_PATH,
      status: HttpStatus.OK
    })

    await fillLoginFormAndSubmit(page, ownerCredentials, t)
    await apiPromise

    apiPromise = waitForApiCall(page, {
      path: OWNER_ADMINS_PATH,
      status: HttpStatus.OK
    })

    await page.goto('/owner/admins')
    await apiPromise

    // Find the invited admin row and verify status is Active
    const adminRow = page.getByRole('row', {
      name: new RegExp(newAdmin.email)
    })

    await expect(adminRow).toBeVisible()
    await expect(adminRow.getByText(t.status.values.active)).toBeVisible()

    await logOut(page, t)
  })
})
