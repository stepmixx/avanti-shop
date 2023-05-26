import { defineConfig, devices } from "@playwright/test";

const baseURL = `http://localhost:${process.env.PORT || 3000}`;
export default defineConfig({
  testDir: "e2e",
  retries: 2,
  webServer: {
    command: "pnpm build && pnpm start",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: "retry-with-trace",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Desktop Safari",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      use: devices["iPhone 12"],
    },
  ],
});
