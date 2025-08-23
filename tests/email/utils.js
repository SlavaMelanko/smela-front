import { expect } from '@playwright/test'

import {
  SELECTOR_HCAPTCHA_CHECKBOX,
  SELECTOR_HCAPTCHA_IFRAME,
  SELECTOR_HCAPTCHA_RESPONSE,
  SELECTOR_PROFILE_DROPDOWN
} from '../constants'

const BASE_TIMEOUT = 50000

export const waitForVerificationEmail = async (
  emailProvider,
  namespace,
  email,
  subject
) => {
  const start = Date.now()

  while (Date.now() - start < BASE_TIMEOUT) {
    const { data: emails } = await emailProvider.searchInbox(namespace, {
      to_addr_prefix: email,
      subject_includes: subject
    })

    if (emails.length > 0) return emails[0]
    await new Promise(res => setTimeout(res, 2000))
  }

  throw new Error('Verification email not received')
}

/**
 * Extracts a verification link from email text
 * @param {string} text - The email text content to search in
 * @returns {string|null} The matched URL or null if no match found
 */
export const extractVerificationLink = text => {
  // Match URLs like http://localhost:5173/verify-email?token=xxx
  const regex = /https?:\/\/[^ \n]+\/verify-email\?token=[^ \n]+/i
  const match = text.match(regex)

  return match ? match[0] : null
}

/**
 * Extracts a password reset link from email text
 * @param {string} text - The email text content to search in
 * @returns {string|null} The matched URL or null if no match found
 */
export const extractResetPasswordLink = text => {
  // Match URLs like http://localhost:5173/reset-password?token=xxx
  const regex = /https?:\/\/[^ \n]+\/reset-password\?token=[^ \n]+/i
  const match = text.match(regex)

  return match ? match[0] : null
}

export const goTo = async (page, path) => {
  await page.goto(path)
}

export const fillForm = async (
  page,
  { firstName, lastName, email, password },
  en
) => {
  await page.getByLabel(en.firstName.label).fill(firstName)
  await page.getByLabel(en.lastName.label).fill(lastName)
  await page.getByLabel(en.email.label).fill(email)
  await page.getByLabel(en.password.label, { exact: true }).fill(password)
}

export const passCaptcha = async page => {
  const frame = page.frameLocator(SELECTOR_HCAPTCHA_IFRAME)
  const checkbox = frame.locator(SELECTOR_HCAPTCHA_CHECKBOX)

  await checkbox.click()
  await expect(checkbox).toHaveAttribute('aria-checked', 'true')
  await expect(page.locator(SELECTOR_HCAPTCHA_RESPONSE)).not.toBeEmpty()
}

export const logout = async (page, en) => {
  await page.getByRole('button', { name: SELECTOR_PROFILE_DROPDOWN }).click()
  await page.getByRole('button', { name: en.logout.noun }).click()
  await page.waitForURL('/login')
}
