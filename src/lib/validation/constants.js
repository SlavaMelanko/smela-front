export const NameConstraint = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 50
}

export const PasswordConstraint = {
  MIN_LENGTH: 6,
  // Requires at least one Latin letter (uppercase or lowercase)
  LATIN_LETTER_REGEX: /[a-zA-Z]/
}

export const EmailConstraint = {
  // Requires standard email format (e.g., user@domain.com)
  // Rejects local-only addresses like user@localhost
  STANDARD: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}
