export const fillSignupFormAndSubmit = async (
  page,
  { firstName, lastName, email, password },
  t
) => {
  const firstNameInput = page.getByLabel(t.firstName.label)
  const lastNameInput = page.getByLabel(t.lastName.label)
  const emailInput = page.getByLabel(t.email.label)
  const passwordInput = page.getByRole('textbox', {
    name: t.password.label.default
  })
  const signupButton = page.getByRole('button', { name: t.signUp })

  await firstNameInput.fill(firstName)
  await lastNameInput.fill(lastName)
  await emailInput.fill(email)
  await passwordInput.fill(password)
  await signupButton.click()

  return {
    firstNameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    signupButton
  }
}

export const fillLoginFormAndSubmit = async (page, { email, password }, t) => {
  const emailInput = page.getByLabel(t.email.label)
  const passwordInput = page.getByRole('textbox', {
    name: t.password.label.default
  })
  const loginButton = page.getByRole('button', { name: t.login.verb })

  await emailInput.fill(email)
  await passwordInput.fill(password)
  await loginButton.click()

  return { emailInput, passwordInput, submitButton: loginButton }
}

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

export const logOut = async (page, t) => {
  await page.getByRole('button', { name: 'Profile menu' }).click()
  await page.getByRole('menuitem', { name: t.logout.noun }).click()
  await page.waitForURL('/login')
}
