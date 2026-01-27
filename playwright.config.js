import { defineConfig, devices } from '@playwright/test'

import { loadTestEnv } from './e2e/config/globalSetup'

loadTestEnv()

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/config/globalSetup.js',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.VITE_FE_BASE_URL || 'http://localhost:5173',
    navigationTimeout: 30000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },
  /* Maximum time for a single expect() assertion to pass */
  expect: {
    timeout: 30000
  },
  /* Maximum time for the entire test to complete */
  timeout: 60000,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'en-US'
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     locale: 'uk-UA'
    //   }
    // },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        locale: 'uk-UA'
      }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  webServer: {
    command: 'pnpm run dev',
    url: process.env.VITE_FE_BASE_URL || 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30000
  }
})
