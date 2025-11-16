const path = {
  // Auth endpoints
  SIGNUP: '/api/v1/auth/signup',
  LOGIN: '/api/v1/auth/login',
  VERIFY_EMAIL: '/api/v1/auth/verify-email',
  RESEND_VERIFICATION_EMAIL: '/api/v1/auth/resend-verification-email',
  REQUEST_PASSWORD_RESET: '/api/v1/auth/request-password-reset',
  RESET_PASSWORD: '/api/v1/auth/reset-password',
  REFRESH_TOKEN: '/api/v1/auth/refresh-token',
  LOGOUT: '/api/v1/auth/logout',

  // User endpoints
  ME: '/api/v1/protected/me'
}

export { path }
