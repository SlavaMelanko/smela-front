// List of known network error messages that indicate connection problems.
const NETWORK_ERROR_PATTERNS = [
  // chrome/chromium errors
  'ERR_CONNECTION_REFUSED',
  'ERR_CONNECTION_RESET',
  'ERR_CONNECTION_TIMED_OUT',
  'ERR_CONNECTION_CLOSED',
  'ERR_CONNECTION_FAILED',
  'ERR_NETWORK_CHANGED',
  'ERR_INTERNET_DISCONNECTED',
  'ERR_NAME_NOT_RESOLVED',
  'ERR_ADDRESS_UNREACHABLE',
  'ERR_NETWORK_ACCESS_DENIED',
  'ERR_PROXY_CONNECTION_FAILED',
  'ERR_TUNNEL_CONNECTION_FAILED',
  'ERR_SSL_PROTOCOL_ERROR',
  'ERR_CERT_COMMON_NAME_INVALID',
  'ERR_CERT_DATE_INVALID',
  'ERR_CERT_AUTHORITY_INVALID',

  // firefox errors
  'NS_ERROR_CONNECTION_REFUSED',
  'NS_ERROR_NET_TIMEOUT',
  'NS_ERROR_OFFLINE',
  'NS_ERROR_NET_RESET',
  'NS_ERROR_NET_INTERRUPT',
  'NS_ERROR_PROXY_CONNECTION_REFUSED',
  'NS_ERROR_UNKNOWN_HOST',

  // safari errors
  // cspell:disable-next-line
  'NSURLErrorDomain',
  // cspell:disable-next-line
  'NSURLErrorTimedOut',
  // cspell:disable-next-line
  'NSURLErrorCannotFindHost',
  // cspell:disable-next-line
  'NSURLErrorCannotConnectToHost',
  // cspell:disable-next-line
  'NSURLErrorNetworkConnectionLost',
  // cspell:disable-next-line
  'NSURLErrorNotConnectedToInternet',

  // generic network errors
  'NetworkError',
  'Network request failed',
  'Failed to fetch',
  'Load failed',
  'Request timeout',
  'Request aborted',
  'No internet connection',
  'Unable to connect',
  'Connection lost',
  'Connection failed',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'ENOTFOUND',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'ECONNRESET',
  'EPIPE'
]

// HTTP status codes that may indicate network issues.
const NETWORK_ERROR_STATUS_CODES = [
  0, // no response (often indicates network failure)
  502, // bad gateway
  503, // service unavailable
  504, // gateway timeout
  521, // web server is down
  522, // connection timed out
  523, // origin is unreachable
  524, // a timeout occurred
  525, // ssl handshake failed
  526, // invalid ssl certificate
  527 // cloudflare error
]

// Determines if an error is a network connection issue.
export function isNetworkError(error) {
  if (!error) {
    return false
  }

  // Check if browser is offline.
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return true
  }

  // Check error message.
  if (error.message) {
    const errorMessage = error.message.toLowerCase()
    const hasNetworkError = NETWORK_ERROR_PATTERNS.some(pattern =>
      errorMessage.includes(pattern.toLowerCase())
    )

    if (hasNetworkError) {
      return true
    }
  }

  // Check error code.
  if (error.code) {
    const errorCode = error.code.toString().toUpperCase()
    const hasNetworkCode = NETWORK_ERROR_PATTERNS.some(pattern =>
      errorCode.includes(pattern)
    )

    if (hasNetworkCode) {
      return true
    }
  }

  // Check error name.
  if (error.name) {
    const errorName = error.name.toLowerCase()

    if (errorName === 'networkerror' || errorName === 'typeerror') {
      return true
    }
  }

  // Check HTTP status code.
  if (error.status !== undefined) {
    if (NETWORK_ERROR_STATUS_CODES.includes(error.status)) {
      return true
    }
  }

  // Check response status for fetch API responses.
  if (error.response && error.response.status !== undefined) {
    if (NETWORK_ERROR_STATUS_CODES.includes(error.response.status)) {
      return true
    }
  }

  // Check for axios-specific network errors.
  if (error.isAxiosError && error.code) {
    const axiosNetworkCodes = [
      'ECONNABORTED',
      'ERR_NETWORK',
      'ERR_FR_TOO_MANY_REDIRECTS'
    ]

    if (axiosNetworkCodes.includes(error.code)) {
      return true
    }
  }

  // Check for fetch-specific TypeError that often indicates network issues.
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return true
  }

  return false
}

export const NetworkErrorType = {
  OFFLINE: 'offline',
  CONNECTION_REFUSED: 'connectionRefused',
  TIMEOUT: 'timeout',
  CONNECTION_INTERRUPTED: 'connectionInterrupted',
  NAME_NOT_RESOLVED: 'nameNotResolved',
  SSL_ERROR: 'sslError',
  SERVER_UNAVAILABLE: 'serverUnavailable',
  UNKNOWN: 'unknown'
}

// Gets the network error type from an error object.
export function getNetworkErrorType(error) {
  if (!navigator.onLine) {
    return NetworkErrorType.OFFLINE
  }

  if (!error) {
    return NetworkErrorType.UNKNOWN
  }

  const errMsg = error.message || error.code || ''

  if (
    errMsg.includes('ERR_CONNECTION_REFUSED') ||
    errMsg.includes('ECONNREFUSED')
  ) {
    return NetworkErrorType.CONNECTION_REFUSED
  }

  if (
    errMsg.includes('ERR_CONNECTION_TIMED_OUT') ||
    errMsg.includes('ETIMEDOUT') ||
    errMsg.includes('timeout')
  ) {
    return NetworkErrorType.TIMEOUT
  }

  if (
    errMsg.includes('ERR_INTERNET_DISCONNECTED') ||
    errMsg.includes('ERR_NETWORK_CHANGED')
  ) {
    return NetworkErrorType.CONNECTION_INTERRUPTED
  }

  if (
    errMsg.includes('ERR_NAME_NOT_RESOLVED') ||
    errMsg.includes('ENOTFOUND')
  ) {
    return NetworkErrorType.NAME_NOT_RESOLVED
  }

  if (errMsg.includes('ERR_SSL') || errMsg.includes('ERR_CERT')) {
    return NetworkErrorType.SSL_ERROR
  }

  if (error.status === 502 || error.status === 503 || error.status === 504) {
    return NetworkErrorType.SERVER_UNAVAILABLE
  }

  return NetworkErrorType.UNKNOWN
}

// Gets a user-friendly message for network errors.
// Pass the translation function (t) to get localized messages.
export function getNetworkErrorMessage(error, t) {
  const errorType = getNetworkErrorType(error)

  // If translation function is provided, use localized messages.
  if (t) {
    return t(`error.network.message.${errorType}`)
  }

  // Fallback to English messages if no translation function provided.
  const messages = {
    [NetworkErrorType.OFFLINE]:
      'You are currently offline. Please check your internet connection.',
    [NetworkErrorType.CONNECTION_REFUSED]:
      'Unable to connect to the server. The server may be down or unreachable.',
    [NetworkErrorType.TIMEOUT]:
      'The connection timed out. Please check your internet connection and try again.',
    [NetworkErrorType.CONNECTION_INTERRUPTED]:
      'Your internet connection was interrupted. Please check your connection and try again.',
    [NetworkErrorType.NAME_NOT_RESOLVED]:
      'Unable to reach the server. Please check your internet connection.',
    [NetworkErrorType.SSL_ERROR]:
      'There was a security issue connecting to the server.',
    [NetworkErrorType.SERVER_UNAVAILABLE]:
      'The server is temporarily unavailable. Please try again later.',
    [NetworkErrorType.UNKNOWN]:
      'A network error occurred. Please check your connection and try again.'
  }

  return messages[errorType] || messages[NetworkErrorType.UNKNOWN]
}

// Retry configuration for network requests.
export const NETWORK_RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // one second
  maxDelay: 10000, // ten seconds
  backoffMultiplier: 2,
  // cspell:disable-next-line
  retryableErrors: NETWORK_ERROR_PATTERNS
}

// Calculates the delay for exponential backoff retry.
export function calculateRetryDelay(
  attemptNumber,
  initialDelay = NETWORK_RETRY_CONFIG.initialDelay,
  maxDelay = NETWORK_RETRY_CONFIG.maxDelay,
  multiplier = NETWORK_RETRY_CONFIG.backoffMultiplier
) {
  const delay = initialDelay * Math.pow(multiplier, attemptNumber)
  const jitter = Math.random() * 0.1 * delay // add 10% jitter

  return Math.min(delay + jitter, maxDelay)
}

// Wraps a promise with network error detection and retry logic.
export async function withNetworkRetry(promiseFn, options = {}) {
  const {
    maxRetries = NETWORK_RETRY_CONFIG.maxRetries,
    initialDelay = NETWORK_RETRY_CONFIG.initialDelay,
    maxDelay = NETWORK_RETRY_CONFIG.maxDelay,
    onRetry = () => {},
    shouldRetry = isNetworkError
  } = options

  let lastError

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await promiseFn()
    } catch (error) {
      lastError = error

      if (attempt < maxRetries && shouldRetry(error)) {
        const delay = calculateRetryDelay(attempt, initialDelay, maxDelay)

        onRetry(attempt + 1, delay, error)
        await new Promise(resolve => setTimeout(resolve, delay))
      } else {
        throw error
      }
    }
  }

  throw lastError
}

// Creates a network status monitor that tracks online/offline state.
export function createNetworkMonitor(onStatusChange) {
  const handleOnline = () => onStatusChange(true)
  const handleOffline = () => onStatusChange(false)

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // Return cleanup function.
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

// Checks if the browser is currently online.
export function isOnline() {
  return typeof navigator !== 'undefined' ? navigator.onLine : true
}

// Tests connectivity to a specific URL.
export async function testConnectivity(url = '/api/health', timeout = 5000) {
  if (!isOnline()) {
    return false
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-cache'
    })

    clearTimeout(timeoutId)

    return response.ok || response.status < 500
  } catch {
    return false
  }
}
