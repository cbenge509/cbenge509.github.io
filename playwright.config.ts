import {defineConfig, devices} from '@playwright/test';

/**
 * Playwright configuration for E2E tests
 *
 * Cross-browser testing configuration:
 * - Chromium: Covers Chrome and Edge (same engine - NFR7, NFR10)
 * - Firefox: Covers Firefox (NFR8)
 * - WebKit: Covers Safari (NFR9)
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    // Reduce motion in tests to avoid flakiness
    reducedMotion: 'reduce',
  },

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],

  // Serve the production build before tests.
  // Astro 7's `astro dev` auto-detaches into a background daemon in non-TTY
  // contexts, so its foreground process exits early and Playwright's webServer
  // manager rejects it. `astro preview` stays in the foreground and serves the
  // built output, which is also more representative of what ships.
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
