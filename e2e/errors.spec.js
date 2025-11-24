import { expect, test } from '@playwright/test'
import fs from 'fs'

const t = JSON.parse(fs.readFileSync('./public/locales/en.json', 'utf-8'))

test.describe('Not Found Error', () => {
  test('should navigate away from 404 page when clicking "Go home" button', async ({
    page
  }) => {
    // Navigate to a non-existent route
    await page.goto('/unknown')

    // Verify we're on the 404 page
    await expect(page.locator('.not-found-error-page')).toBeVisible()

    // Click the "Go home" button
    const goHomeButton = page.getByRole('button', {
      name: t.error.notFound.cta
    })

    await goHomeButton.click()

    // Verify we've navigated away from the 404 page (no longer visible)
    await expect(page.locator('.not-found-error-page')).not.toBeVisible()
  })
})

test.describe('Network Error', () => {
  test('should navigate back when clicking "Try again" button', async ({
    page
  }) => {
    // First navigate to a public page that doesn't require authentication
    await page.goto('/pricing')

    // Then navigate to the network error page
    await page.goto('/errors/network')

    // Click the "Try again" button
    const tryAgainButton = page.getByRole('button', {
      name: t.error.network.cta
    })

    await tryAgainButton.click()

    // Verify we're navigated back to the previous page (pricing)
    await expect(page).toHaveURL('/pricing')
  })
})

test.describe('General Error', () => {
  test('should navigate to home page when clicking "Go home" button', async ({
    page
  }) => {
    // Navigate to the general error page
    await page.goto('/errors/general')

    // Verify we're on the general error page
    await expect(page.locator('.general-error-page')).toBeVisible()

    // Click the "Go home" button
    const goHomeButton = page.getByRole('button', {
      name: t.error.general.cta
    })

    await goHomeButton.click()

    // For unauthenticated users, home redirects to login
    await expect(page).toHaveURL('/login')
  })
})
