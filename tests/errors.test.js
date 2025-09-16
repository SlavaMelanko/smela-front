import { expect, test } from '@playwright/test'
import fs from 'fs'

const t = JSON.parse(fs.readFileSync('./public/locales/en.json', 'utf-8'))

test.describe('Not Found Error', () => {
  test('should display 404 page for unknown routes', async ({ page }) => {
    // Navigate to a non-existent route.
    await page.goto('/unknown')

    // Check that the NotFound page is displayed.
    await expect(page.locator('.not-found-error-page')).toBeVisible()

    // Verify the icon is displayed and properly loaded.
    const notFoundIcon = page.locator('.not-found-error-page__icon')

    await expect(notFoundIcon).toBeVisible()
    await expect(notFoundIcon).toHaveAttribute('class', /search-x-icon/)

    // Verify the page title.
    await expect(page.locator('.not-found-error-page__title')).toHaveText(
      t.error.notFound.title
    )

    // Verify the error message.
    await expect(page.locator('.not-found-error-page__description')).toHaveText(
      t.error.notFound.message
    )

    // Verify the "Go home" button is present.
    const goHomeButton = page.getByRole('button', {
      name: t.error.notFound.cta
    })

    await expect(goHomeButton).toBeVisible()
  })

  test('should navigate away from 404 page when clicking "Go home" button', async ({
    page
  }) => {
    // Navigate to a non-existent route.
    await page.goto('/unknown')

    // Verify we're on the 404 page.
    await expect(page.locator('.not-found-error-page')).toBeVisible()

    // Click the "Go home" button.
    const goHomeButton = page.getByRole('button', {
      name: t.error.notFound.cta
    })

    await goHomeButton.click()

    // Verify we've navigated away from the 404 page (no longer visible).
    await expect(page.locator('.not-found-error-page')).not.toBeVisible()
  })
})

test.describe('Network Error', () => {
  test('should display network error page', async ({ page }) => {
    // Navigate to the network error page with a specific error type.
    await page.goto('/errors/network?errorType=connectionRefused')

    // Check that the Network error page is displayed.
    await expect(page.locator('.network-error-page')).toBeVisible()

    // Verify the icon is displayed and properly loaded.
    const networkIcon = page.locator('.network-error-page__icon')

    await expect(networkIcon).toBeVisible()
    await expect(networkIcon).toHaveAttribute('class', /cloud-alert-icon/)

    // Verify the page title.
    await expect(page.locator('.network-error-page__title')).toHaveText(
      t.error.network.title
    )

    // Verify the error message for connection refused.
    await expect(page.locator('.network-error-page__description')).toHaveText(
      t.error.network.message.connectionRefused
    )

    // Verify the "Try again" button is present.
    const tryAgainButton = page.getByRole('button', {
      name: t.error.network.cta
    })

    await expect(tryAgainButton).toBeVisible()
  })

  test('should display default network error message when no error type specified', async ({
    page
  }) => {
    // Navigate to the network error page without error type.
    await page.goto('/errors/network')

    // Check that the Network error page is displayed.
    await expect(page.locator('.network-error-page')).toBeVisible()

    // Verify the default error message is shown.
    await expect(page.locator('.network-error-page__description')).toHaveText(
      t.error.network.message.unknown
    )
  })

  test('should navigate back when clicking "Try again" button', async ({
    page
  }) => {
    // First navigate to a public page that doesn't require authentication.
    await page.goto('/pricing')

    // Then navigate to the network error page.
    await page.goto('/errors/network')

    // Click the "Try again" button.
    const tryAgainButton = page.getByRole('button', {
      name: t.error.network.cta
    })

    await tryAgainButton.click()

    // Verify we're navigated back to the previous page (pricing).
    await expect(page).toHaveURL('/pricing')
  })
})
