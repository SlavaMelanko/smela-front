export const fillInvitationFormAndSubmit = async (
  page,
  { firstName, lastName, email },
  t
) => {
  await page.getByLabel(t.firstName.label).fill(firstName)
  await page.getByLabel(t.lastName.label).fill(lastName)
  await page.getByLabel(t.email.label).fill(email)
  await page.getByRole('button', { name: t.invitation.send.cta }).click()
}

export const fillAcceptInviteFormAndSubmit = async (page, password, t) => {
  const passwordInput = page.getByRole('textbox', {
    name: t.password.label.default
  })

  await passwordInput.fill(password)
  await page.getByRole('button', { name: t.invitation.accept.cta }).click()
}
