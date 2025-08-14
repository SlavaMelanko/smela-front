export const NameConstraint = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 50
}

export const PasswordConstraint = {
  MIN_LENGTH: 6,
  // Requires at least one Latin letter (uppercase or lowercase)
  LATIN_LETTER_REGEX: /[a-zA-Z]/
}
