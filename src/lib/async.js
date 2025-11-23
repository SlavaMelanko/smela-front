/**
 * Wraps an async function with a timeout and abort capability.
 * @param {Function} asyncFn - Async function that receives AbortSignal
 * @param {number} [timeoutMs=10000] - Timeout in milliseconds
 */
export const withTimeout = async (asyncFn, timeoutMs = 10000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    // Race between the async function and abort signal
    // This ensures timeout works even if asyncFn doesn't handle the signal
    return await Promise.race([
      // Wrap in Promise.resolve().then() to catch synchronous throws
      Promise.resolve().then(() => asyncFn(controller.signal)),
      new Promise((_, reject) => {
        controller.signal.addEventListener('abort', () =>
          reject(new Error('Timeout.'))
        )
      })
    ])
  } finally {
    clearTimeout(timeoutId)
  }
}
