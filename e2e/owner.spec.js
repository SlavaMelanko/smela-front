import { faker } from '@faker-js/faker'

import { HttpStatus } from '../src/lib/net'
import {
  ACCEPT_INVITE_PATH,
  OWNER_ADMINS_INVITE_PATH,
  OWNER_ADMINS_PATH
} from '../src/services/backend/paths'
import { auth } from '../src/tests/data'
import { expect, test } from './config/fixtures'
import {
  fillAcceptInviteFormAndSubmit,
  fillInvitationFormAndSubmit,
  logOut
} from './scenarios'
import { generateEmail, waitForApiCall, waitForApiCalls } from './utils'

const ownerCredentials = {
  email: process.env.VITE_E2E_OWNER_EMAIL,
  password: process.env.VITE_E2E_OWNER_PASSWORD
}

test.describe.serial('Owner: Admin Invitation', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  const newAdmin = {
    firstName,
    lastName,
    email: generateEmail({ prefix: firstName }),
    password: auth.password.strong
  }

  test('owner invites admin via modal form', async ({ page, t, login }) => {
    await login(ownerCredentials)

    const apiPromise = waitForApiCall(page, {
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

  test('invited admin accepts invitation via email link', async ({
    page,
    t,
    emailService
  }) => {
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

  test('owner verifies admin status changed to active', async ({
    page,
    t,
    login
  }) => {
    await login(ownerCredentials)

    const apiPromise = waitForApiCall(page, {
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

test.describe('Owner: Admins Page Error Handling', () => {
  test('displays error alert when admins API fails', async ({
    page,
    t,
    login
  }) => {
    await login(ownerCredentials)

    await page.route(`**${OWNER_ADMINS_PATH}*`, route =>
      route.fulfill({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        contentType: 'application/json',
        body: JSON.stringify({
          name: 'AppError',
          code: 'system/internal-error'
        })
      })
    )

    await page.goto('/owner/admins')

    await expect(
      page.getByText(t.backend['system/internal-error'])
    ).toBeVisible()

    await expect(page.getByRole('button', { name: t.back })).toBeVisible()
  })

  test('displays empty table when no admins exist', async ({
    page,
    t,
    login
  }) => {
    await login(ownerCredentials)

    await page.route(`**${OWNER_ADMINS_PATH}*`, route =>
      route.fulfill({
        status: HttpStatus.OK,
        contentType: 'application/json',
        body: JSON.stringify({ data: [], total: 0 })
      })
    )

    await page.goto('/owner/admins')

    // Verify table header is visible but no data rows exist
    await expect(
      page.getByRole('columnheader', { name: t.table.users.name })
    ).toBeVisible()

    await expect(page.getByRole('cell')).toHaveCount(0)
  })
})
