import { expect } from '@playwright/test'

export const SELECTOR_HCAPTCHA_IFRAME =
  'iframe[title="Widget containing checkbox for hCaptcha security challenge"]'
export const SELECTOR_HCAPTCHA_CHECKBOX = '#checkbox'
export const SELECTOR_HCAPTCHA_RESPONSE = 'textarea[name="h-captcha-response"]'

export const passCaptcha = async page => {
  const frame = page.frameLocator(SELECTOR_HCAPTCHA_IFRAME)
  const checkbox = frame.locator(SELECTOR_HCAPTCHA_CHECKBOX)

  await checkbox.click()
  await expect(checkbox).toHaveAttribute('aria-checked', 'true')
  await expect(page.locator(SELECTOR_HCAPTCHA_RESPONSE)).not.toBeEmpty()
}
