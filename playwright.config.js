// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // --- UI Testing Projects ---
    {
      name: 'UI - Chromium',
      testDir: 'tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://the-internet.herokuapp.com/',
      },
    },
    {
      name: 'UI - WebKit',
      testDir: 'tests/ui',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://the-internet.herokuapp.com/',
      },
    },

    // --- API Testing Project ---
    {
      name: 'API',
      testDir: 'tests/api',
      use: {
        baseURL: 'https://demoqa.com',
      },
    },
  ],
});

