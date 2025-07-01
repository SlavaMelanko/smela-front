import { MailiskClient } from 'mailisk'

export const createEmailProvider = ({ apiKey }) => {
  const client = new MailiskClient({ apiKey })

  return {
    searchInbox: (namespace, options) => client.searchInbox(namespace, options)
  }
}
