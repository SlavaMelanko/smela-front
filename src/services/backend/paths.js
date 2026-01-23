// Auth endpoints
export const SIGNUP_PATH = '/api/v1/auth/signup'
export const LOGIN_PATH = '/api/v1/auth/login'
export const VERIFY_EMAIL_PATH = '/api/v1/auth/verify-email'
export const RESEND_VERIFICATION_EMAIL_PATH =
  '/api/v1/auth/resend-verification-email'
export const REQUEST_PASSWORD_RESET_PATH = '/api/v1/auth/request-password-reset'
export const RESET_PASSWORD_PATH = '/api/v1/auth/reset-password'
export const ACCEPT_INVITE_PATH = '/api/v1/auth/accept-invite'
export const REFRESH_TOKEN_PATH = '/api/v1/auth/refresh-token'
export const LOGOUT_PATH = '/api/v1/auth/logout'

// User endpoints
export const ME_PATH = '/api/v1/user/me'

// Admin endpoints
export const ADMIN_USERS_PATH = '/api/v1/admin/users'
export const ADMIN_COMPANIES_PATH = '/api/v1/admin/companies'
export const ADMIN_COMPANIES_INVITE_PATH = '/api/v1/admin/companies/:id/invite'

// Owner endpoints
export const OWNER_ADMINS_PATH = '/api/v1/owner/admins'
export const OWNER_ADMINS_INVITE_PATH = '/api/v1/owner/admins/invite'
