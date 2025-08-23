# Playwright E2E Tests

## ⚠️ Prerequisites

Before running the tests, make sure the `admin@example.com` account is
registered.

This account is used in tests that validate "email already in use" error on
signup.

## 📦 Setup

Install Playwright and browser dependencies:

```bash
npx playwright install
```

## 🚀 Running Tests

Run all tests in interactive UI mode:

```bash
npx playwright test --ui
```

Or run all tests headlessly:

```bash
npm run e2e
```
