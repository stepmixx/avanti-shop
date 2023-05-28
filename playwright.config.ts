import { defineConfig } from "@playwright/test";

const baseURL = `http://localhost:3000`;
export default defineConfig({
  testDir: "e2e",
  timeout: 120 * 1000,
  retries: 2,
  webServer: {
    command: "pnpm build && pnpm start", // has to be pnpm build && pnpm start for production.
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
  },
  // projects: [
  //   {
  //     name: "Desktop Chrome",
  //     use: {
  //       ...devices["Desktop Chrome"],
  //     },
  //   },
  //   {
  //     name: "Desktop Safari",
  //     use: {
  //       ...devices["Desktop Safari"],
  //     },
  //   },
  //   {
  //     name: "Mobile Chrome",
  //     use: {
  //       ...devices["Pixel 5"],
  //     },
  //   },
  //   {
  //     name: "Mobile Safari",
  //     use: devices["iPhone 12"],
  //   },
  // ],
});
