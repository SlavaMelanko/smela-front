import { MailiskClient } from 'mailisk'

const BASE_TIMEOUT = 50000

export const emailConfig = {
  apiKey: process.env.VITE_APP_MAILISK_API_KEY,
  namespace: process.env.VITE_APP_MAILISK_NAMESPACE,
  domain: `${process.env.VITE_APP_MAILISK_NAMESPACE}.mailisk.net`
}

export const createEmailProvider = ({ apiKey }) => {
  const client = new MailiskClient({ apiKey })

  return {
    searchInbox: (namespace, options) => client.searchInbox(namespace, options)
  }
}

export const waitForEmail = async (
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

  throw new Error(`The email "${subject}" hasn't been received.`)
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
