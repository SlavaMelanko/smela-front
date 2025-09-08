// @ts-check
import { defineConfig, devices } from '@playwright/test'
import { loadEnv } from 'vite'

// Read environment variables from .env.test file.
Object.assign(process.env, loadEnv('test', './', 'VITE_'))

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: false,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.VITE_APP_BASE_URL || 'http://localhost:5173',

    navigationTimeout: 30 * 1000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  expect: {
    timeout: 30 * 1000
  },
  timeout: 60000,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Default locale for this project - can be overridden by TEST_LOCALE env var
        locale: 'en-US'
      }
    }

    // Example: Ukrainian language tests
    // {
    //   name: 'chromium-uk',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     locale: 'uk-UA'
    //   }
    // }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // }

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }

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
    command: 'npm run dev',

    url: process.env.VITE_APP_BASE_URL || 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 100000
  }
})
