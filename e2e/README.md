# Playwright E2E Tests

## ⚠️ Prerequisites

Before running the tests, make sure pre-registered accounts are seeded into the
database.

## 📦 Setup

Install Playwright and browser dependencies:

```bash
pnpm exec playwright install
```

## 🚀 Running Tests

Run all tests headlessly:

```bash
pnpm run e2e
```

Or run tests in interactive UI mode:

```bash
pnpm run e2e:ui
```
