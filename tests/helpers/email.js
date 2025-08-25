import { MailiskClient } from 'mailisk'

const BASE_TIMEOUT = 50000
const POLL_INTERVAL = 2000

export const emailConfig = {
  apiKey: process.env.VITE_APP_MAILISK_API_KEY,
  namespace: process.env.VITE_APP_MAILISK_NAMESPACE,
  domain: `${process.env.VITE_APP_MAILISK_NAMESPACE}.mailisk.net`
}

export const extractVerificationLink = text => {
  // Match URLs like http://localhost:5173/verify-email?token=xxx
  const regex = /https?:\/\/[^ \n]+\/verify-email\?token=[^ \n]+/i
  const match = text.match(regex)

  return match ? match[0] : null
}

export const extractResetPasswordLink = text => {
  // Match URLs like http://localhost:5173/reset-password?token=xxx
  const regex = /https?:\/\/[^ \n]+\/reset-password\?token=[^ \n]+/i
  const match = text.match(regex)

  return match ? match[0] : null
}

export class EmailService {
  #client
  #namespace
  #timeout

  constructor({ apiKey, namespace, timeout = BASE_TIMEOUT } = {}) {
    this.#client = new MailiskClient({ apiKey: apiKey || emailConfig.apiKey })
    this.#namespace = namespace || emailConfig.namespace
    this.#timeout = timeout
  }

  async #waitForEmail(emailAddress, subject) {
    const start = Date.now()

    while (Date.now() - start < this.#timeout) {
      const { data: emails } = await this.#client.searchInbox(this.#namespace, {
        to_addr_prefix: emailAddress,
        subject_includes: subject
      })

      if (emails.length > 0) return emails[0]
      await new Promise(res => setTimeout(res, POLL_INTERVAL))
    }

    throw new Error(`The email "${subject}" hasn't been received.`)
  }

  async waitForVerificationEmail(
    emailAddress,
    subject = 'Welcome to The Company'
  ) {
    const email = await this.#waitForEmail(emailAddress, subject)
    const link = extractVerificationLink(email.text)

    if (!link) {
      throw new Error('Verification link not found in email')
    }

    return {
      link,
      text: email.text,
      html: email.html,
      subject: email.subject
    }
  }

  async waitForResetPasswordEmail(
    emailAddress,
    subject = 'Reset your password'
  ) {
    const email = await this.#waitForEmail(emailAddress, subject)
    const link = extractResetPasswordLink(email.text)

    if (!link) {
      throw new Error('Reset password link not found in email.')
    }

    return {
      link,
      text: email.text,
      html: email.html,
      subject: email.subject
    }
  }
}
