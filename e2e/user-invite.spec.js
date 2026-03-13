import { HttpStatus } from '../src/lib/net'
import { TEAM_MEMBERS_PATH, TEAMS_PATH } from '../src/services/backend/paths'
import { expect, test } from './config/fixtures'
import { waitForApiCall } from './utils'

test.describe('User: Team Members', () => {
  const userCredentials = {
    email: process.env.VITE_E2E_USER_EMAIL,
    password: process.env.VITE_E2E_USER_PASSWORD
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

    const teamId = teamDetailBody?.team?.id

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
    await expect(userRow.getByText(t.status.active)).toBeVisible()
    await expect(userRow.getByText(t.you)).toBeVisible()
  })
})
