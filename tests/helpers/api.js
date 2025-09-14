export const waitForApiCall = async (page, options, timeout = 30000) => {
  const { path, status, method, validateResponse, validateRequest } = options

  const response = await page.waitForResponse(
    async response => {
      let matches = response.url().includes(path)

      if (status !== undefined) {
        matches = matches && response.status() === status
      }

      if (method !== undefined) {
        matches = matches && response.request().method() === method
      }

      if (matches && validateRequest) {
        try {
          const request = response.request()
          const body = JSON.parse(request.postData())

          matches = matches && (await validateRequest(body))
        } catch (error) {
          console.error('Request validation failed:', error)
          matches = false
        }
      }

      if (matches && validateResponse) {
        try {
          const body = await response.json()

          matches = matches && (await validateResponse(body))
        } catch (error) {
          console.error('Response validation failed:', error)
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

export const waitForApiCalls = async (page, optionsArray, timeout = 30000) => {
  const results = []

  for (const options of optionsArray) {
    const result = await waitForApiCall(page, options, timeout)

    results.push(result)
  }

  return results
}
