export const waitForApiResponse = async (page, options, timeout = 30000) => {
  const { path, status, method, validateBody } = options

  const response = await page.waitForResponse(
    async response => {
      let matches = response.url().includes(path)

      if (status !== undefined) {
        matches = matches && response.status() === status
      }

      if (method !== undefined) {
        matches = matches && response.request().method() === method
      }

      if (matches && validateBody) {
        try {
          const body = await response.json()

          matches = matches && (await validateBody(body))
        } catch (error) {
          console.error('Body validation failed:', error)
          matches = false
        }
      }

      return matches
    },
    { timeout }
  )

  // Return both response and parsed body for further use.
  try {
    const body = await response.json()

    return { response, body }
  } catch {
    return { response, body: null }
  }
}
