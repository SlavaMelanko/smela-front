import { faker } from '@faker-js/faker'

import { HttpStatus } from '../src/lib/net'
import {
  TEAM_MEMBERS_DEFAULT_PERMISSIONS_PATH,
  TEAM_MEMBERS_PATH,
  TEAMS_PATH
} from '../src/services/backend/paths'
import { auth } from '../src/tests/data'
import { expect, test } from './config/fixtures'
import { fillMemberInviteFormAndSubmit, logOut } from './scenarios'
import { generateEmail, waitForApiCall, waitForApiCalls } from './utils'

const userCredentials = {
  email: process.env.VITE_E2E_USER_EMAIL,
  password: process.env.VITE_E2E_USER_PASSWORD
}

test.describe.serial('User: Team Members', () => {
  // Shared state across serial tests
  let teamId

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  const newMember = {
    firstName,
    lastName,
    email: generateEmail({ prefix: firstName }),
    password: auth.password.strong,
    position: faker.person.jobTitle()
  }

  test('loads team page and navigates to Members tab', async ({
    page,
    t,
    login
  }) => {
    await login(userCredentials)

    // Capture the team detail API call to extract teamId dynamically
    const teamDetailPromise = waitForApiCall(page, {
      path: TEAMS_PATH.replace(':teamId', ''),
      method: 'GET',
      status: HttpStatus.OK,
      validateResponse: body => !!body?.team?.id
    })

    await page.goto('/team')
    const { body: teamDetailBody } = await teamDetailPromise

    teamId = teamDetailBody?.team?.id

    expect(teamId).toBeTruthy()

    // Navigate to Members tab
    const membersPromise = waitForApiCall(page, {
      path: TEAM_MEMBERS_PATH.replace(':teamId', teamId),
      method: 'GET',
      status: HttpStatus.OK
    })

    await page.getByRole('tab', { name: t.team.tabs.members.label }).click()
    await membersPromise

    // Invite button is available
    await expect(page.getByRole('button', { name: t.invite.cta })).toBeVisible()

    // The logged-in user's row shows their email, Active status, and "You" badge
    const userRow = page.getByRole('row', {
      name: new RegExp(userCredentials.email)
    })

    await expect(userRow).toBeVisible()
    await expect(userRow.getByText(t.status.values.active)).toBeVisible()
    await expect(userRow.getByText(t.you)).toBeVisible()

    await logOut(page, t)
  })

  test('invites a new member via modal form', async ({ page, t, login }) => {
    await login(userCredentials)

    const teamDetailPromise = waitForApiCall(page, {
      path: TEAMS_PATH.replace(':teamId', ''),
      method: 'GET',
      status: HttpStatus.OK,
      validateResponse: body => !!body?.team?.id
    })

    await page.goto('/team')
    const { body: teamDetailBody } = await teamDetailPromise

    teamId = teamDetailBody?.team?.id

    // Navigate to Members tab
    const membersPromise = waitForApiCall(page, {
      path: TEAM_MEMBERS_PATH.replace(':teamId', teamId),
      method: 'GET',
      status: HttpStatus.OK
    })

    await page.getByRole('tab', { name: t.team.tabs.members.label }).click()
    await membersPromise

    // Open Invite modal and wait for default permissions to load
    const defaultPermissionsPromise = waitForApiCall(page, {
      path: TEAM_MEMBERS_DEFAULT_PERMISSIONS_PATH.replace(':teamId', teamId),
      method: 'GET',
      status: HttpStatus.OK
    })

    await page.getByRole('button', { name: t.invite.cta }).click()
    await defaultPermissionsPromise

    // Verify modal is visible
    await expect(
      page.getByRole('heading', { name: t.invite.send.title.member })
    ).toBeVisible()

    // Wait for POST (invite) and GET (refetch members list)
    const apiPromises = waitForApiCalls(page, [
      {
        path: TEAM_MEMBERS_PATH.replace(':teamId', teamId),
        status: HttpStatus.CREATED
      },
      {
        path: TEAM_MEMBERS_PATH.replace(':teamId', teamId),
        method: 'GET',
        status: HttpStatus.OK
      }
    ])

    await fillMemberInviteFormAndSubmit(page, newMember, t)
    await apiPromises

    // Verify success toast
    await expect(page.getByText(t.invite.send.success)).toBeVisible()

    // Verify new member appears in table with Pending status
    const memberRow = page.getByRole('row', {
      name: new RegExp(newMember.email)
    })

    await expect(memberRow).toBeVisible()
    await expect(memberRow.getByText(t.status.values.pending)).toBeVisible()

    await logOut(page, t)
  })
})
