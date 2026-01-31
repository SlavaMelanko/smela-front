export const fillRequestPasswordResetFormAndSubmit = async (page, email, t) => {
  await page.getByLabel(t.email.label).fill(email)

  await page.getByRole('button', { name: t.password.reset.request.cta }).click()
}

export const fillNewPasswordFormAndSubmit = async (page, newPassword, t) => {
  await page
    .getByRole('textbox', { name: t.password.label.new })
    .fill(newPassword)

  await page.getByRole('button', { name: t.password.reset.set.cta }).click()
}
