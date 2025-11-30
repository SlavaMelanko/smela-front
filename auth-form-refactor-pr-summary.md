# PR Summary: Auth Form Refactor

1. [Improvement]: Standardize auth form payload structure across all authentication flows with consistent `data`, `captcha`, and `preferences` properties
2. [Improvement]: Enhance ESLint configuration to catch unused imports by switching from `varsIgnorePattern` to `argsIgnorePattern` for unused variable detection
3. [Fix]: Add explicit captcha token validation in Login page to prevent submission without valid token
4. [Improvement]: Unify form submission handler naming convention from `handleSubmitForm` to `submitForm` across all auth forms
